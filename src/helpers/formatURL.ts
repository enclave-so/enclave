export default function (url: string) {
  //origin = origin.replace(/(https?:\/\/)(www\.)?/, '')
  //origin = origin.replace(/https?:\/\//, '')
  return url.replace(/(https?:\/\/)(www\.)?/, '')
}
