//mixpanel

import trackId from 'constants/trackId'

const url = 'https://api.mixpanel.com/track?ip=1' //TODO: change to proxy
const token = '3c704f6fc7f20e96c925f8106f2896aa'

export default async function (
  name: string,
  props: Record<string, unknown> = {}
) {
  try {
    await trackMixpanel(name, props)
  } catch (e) {
    console.error(e)
  }
}

async function trackMixpanel(
  name: string,
  props: Record<string, unknown> = {}
) {
  const properties = {
    ...props,
    distinct_id: trackId,
    time: new Date().toISOString(),
    token: token,
  }
  console.log('track', name, properties)
  await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      data: JSON.stringify([
        {
          event: name,
          properties: properties,
        },
      ]),
    }),
  })
}
