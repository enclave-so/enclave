export default function (url: string) {
  //origin = origin.replace(/(https?:\/\/)(www\.)?/, '')
  //origin = origin.replace(/https?:\/\//, '')
  // return url.replace(/(https?:\/\/)(www\.)?/, '')
  // return url.replace(/(https?:\/\/)?(www\.)?|\/.*$/g, '')
  // return url.replace(/(https?:\/\/)?(www\.)?|\/.*/g, '')
  return url
    .replace(/^(https?:\/\/)?(www\.)?|\/.*$/g, '')
    .replace(/^\/|\/$/g, '')
}
