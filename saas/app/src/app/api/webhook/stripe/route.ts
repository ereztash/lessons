import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  // Raw body required before any parsing — Stripe signature covers the exact bytes sent
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Signature verification failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = createServiceClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.supabase_user_id
    if (!userId) return NextResponse.json({ received: true })

    const { error } = await supabase
      .from('profiles')
      .update({ plan: 'pro' })
      .eq('id', userId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const userId = subscription.metadata?.supabase_user_id
    if (!userId) return NextResponse.json({ received: true })

    const { error } = await supabase
      .from('profiles')
      .update({ plan: 'free' })
      .eq('id', userId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
