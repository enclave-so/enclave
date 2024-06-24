type Callback = (value: unknown) => void

interface Resolver {
  handle(id: string, value: unknown): void
  wait(id: string): Promise<unknown>
}

const generateId = (length = 8) =>
  Math.random()
    .toString(20)
    .substring(2, length + 2)

function createResolver(): Resolver {
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

export { createResolver, generateId }
