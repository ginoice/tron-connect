import { Event } from '../types/events';

type TypeCallback = (address: string) => void;

export function onConnect(callback: TypeCallback) {
  const handler = (e: MessageEvent<any>) => {
    if (e.data.message && e.data.message.action == Event.connected) {
      callback(e.data);
    }

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  };
}
