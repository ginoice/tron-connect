import { Event } from './events';

interface ISubscribesCallbacks
  extends Partial<Record<keyof typeof Event, (arg: any) => void>> {
  connected?: (account: string) => void;
  disconnected?: () => void;
  accountChanged?: (info: any) => void;
  networkChanged?: (info: any) => void;
}

export function subscribe(callbacks: ISubscribesCallbacks) {
  for (const eventCallbackName in callbacks) {
    window.addEventListener('message', (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (
        e.data.message &&
        e.data.message.action === Event[eventCallbackName]
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callbacks[eventCallbackName]();
      }
    });
  }
}
