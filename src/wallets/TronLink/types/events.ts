export enum Event {
  connected = 'connect',
  disconnected = 'disconnect',
  accountChanged = 'accountsChanged',
  networkChanged = 'setNode',
}

type TypeOnConnectCallback = (address: string) => void

export type {
  TypeOnConnectCallback
}
