export function FeatureChecks({ value }: { value: boolean }) {
  return (
    <span className={value ? 'text-green-600' : 'text-gray-300'}>
      {value ? '✓' : '✗'}
    </span>
  )
}
