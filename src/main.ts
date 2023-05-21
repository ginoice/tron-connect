import { tronLink } from './wallets/TronLink'

const { connect: connectTronLink } = tronLink()

const {
  connect,
  disconnect,
} = connectTronLink({
  fnConnect: {
    success: () => console.log('res'),
    failed: () => console.log('failed'),
    pending: () => console.log('loading')
  },
  fnDisconnect: {
    success: () => console.log('res'),
    failed: () => console.log('failed'),
    pending: () => console.log('loading')
  }
})

connect()
disconnect()