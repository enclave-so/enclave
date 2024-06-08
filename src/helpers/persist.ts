export default async function (): Promise<boolean> {
  //   console.log('Persisted storage: Step 1')
  if (!navigator.storage || !navigator.storage.persist) return false

  //   console.log('Persisted storage: Step 2')
  const isPersisted = await navigator.storage.persisted()
  if (isPersisted) return true

  const isGranted = await navigator.storage.persist()
  //   console.log(`Persisted storage granted: ${isGranted}`)
  return isGranted
}
