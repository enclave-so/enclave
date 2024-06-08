type Callback = (value: unknown) => void

interface Resolver {
  handle(id: string, value: unknown): void
  wait(id: string): Promise<unknown>
}

//TODO: think about renaming
// eslint-disable-next-line import/prefer-default-export
export function createResolver(): Resolver {
  const callbacks: Record<string, Callback> = {}

  return {
    handle(id: string, value: unknown) {
      if (!callbacks[id]) return

      callbacks[id](value)
      delete callbacks[id]
    },
    wait(id: string) {
      return new Promise<unknown>((resolve) => {
        callbacks[id] = resolve
      })
    },
  }
}
