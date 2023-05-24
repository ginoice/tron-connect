import { Event } from './events';

export function subscribeDisconnectEvent(callback: (data: any) => void) {
  const handler = (e: MessageEvent<any>) => {
    if (e.data.message && e.data.message.action == Event.disconnected) {
      callback(e.data);
    }

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };
}
