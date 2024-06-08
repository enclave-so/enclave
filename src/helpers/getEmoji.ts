import getEmojis from 'helpers/getEmojis'

export default function (input: string): string {
  return getEmojis(input, 1).join('')
}
