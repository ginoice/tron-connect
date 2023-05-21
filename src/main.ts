import { tronLink } from './wallets/TronLink'

const { connect: connectTronLink } = tronLink()

const {
  connect,
  disconnect,
} = connectTronLink()

connect()
disconnect()