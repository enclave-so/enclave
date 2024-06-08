import foods from 'constants/foods'

export default function (
  input: string,
  count: number = 1,
  items: string[] = foods
): string[] {
  if (count < 1) {
    throw new Error('Count must be greater than 0')
  }

  const sum = Array.from(input).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  )

  const result: string[] = []
  for (let j = 0; j < count; j++) {
    result.push(items[sum % (items.length - j)])
  }

  //   const index: number =
  //     Array.from(input).reduce((sum, char) => sum + char.charCodeAt(0), 0) %
  //     foods.length
  return result
}
