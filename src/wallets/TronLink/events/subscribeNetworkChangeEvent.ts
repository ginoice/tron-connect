import { Event } from './events';

// interface MessageEventNetowrkChangeData {

//   }

export function subscribeAccountChangeEvent(
  callback: (connectNode: any) => void
) {
  const handler = (e: MessageEvent) => {
    if (e.data.message && e.data.message.action == Event.networkChanged) {
      callback(e.data);
    }
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}
