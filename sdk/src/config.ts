export interface Config {
  url: string
  announce: boolean
  withBadge: boolean
  info: {
    //TODO: remake cause Partial replace all
    icon: `data:image/${string}`
    name: string
    rdns: string
    uuid: string
  }
}
