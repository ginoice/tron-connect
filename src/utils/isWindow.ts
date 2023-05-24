type executedBody = () => any

export const isWindow = (fn:executedBody) => {
  if (typeof window !== 'undefined') {
    return fn()
  }
}