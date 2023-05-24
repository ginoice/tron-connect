import { Event } from '../types/events';

interface MessageEventAccountsChangedData {
  isTronLink: boolean;
  message: {
    action: string;
    data: {
      address: string | boolean;
    };
  };
}

export function onAccountChange(
  callback: (address: string | boolean) => void
) {
  const handler = (e: MessageEvent<MessageEventAccountsChangedData>) => {
    if (e.data.message && e.data.message.action == Event.accountChanged) {
      callback(e.data.message.data.address);
    }

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };
}
