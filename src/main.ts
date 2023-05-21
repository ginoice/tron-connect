import { tronLink } from './wallets/TronLink/index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { connect } = tronLink({
  fnConnect: {
    success: () => console.log('res'),
    failed: () => console.log('failed'),
    pending: () => console.log('loading'),
  },
  fnDisconnect: {
    success: () => console.log('res'),
    failed: () => console.log('failed'),
    pending: () => console.log('loading'),
  },
});
