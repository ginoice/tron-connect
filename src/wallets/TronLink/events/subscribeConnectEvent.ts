import { Event } from './events';

export function subscribeConnectEvent(callback: (address: string) => void) {
  const handler = (e: MessageEvent<any>) => {
    if (e.data.message && e.data.message.action == Event.connected) {
      callback(e.data);
    }

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };
}
