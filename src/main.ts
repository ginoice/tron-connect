import { tronLink } from './wallets/TronLink/index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { connect } = tronLink({
  fnConnect: {
    success: data => console.log(data),
    failed: () => console.log('failed'),
    pending: () => console.log('loading'),
  },
  fnDisconnect: {
    success: () => console.log('res'),
    failed: () => console.log('failed'),
    pending: () => console.log('loading'),
  },
});

const btnConnectWallet: HTMLButtonElement = document.querySelector('.btn-connect') as HTMLButtonElement

btnConnectWallet.addEventListener('click', () => {
  connect()
})