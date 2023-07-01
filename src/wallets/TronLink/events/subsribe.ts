import { Event } from '../types/events';

interface ISubscribesCallbacks
  extends Partial<Record<keyof typeof Event, (arg: any) => void>> {
  connected?: (account: string) => void;
  disconnected?: () => void;
  accountChanged?: (info: any) => void;
  networkChanged?: (info: any) => void;
}

export type {
  ISubscribesCallbacks
}

export function subscribe(callbacks: ISubscribesCallbacks) {
  for (const e in callbacks) {
    const eventCallbackName = e as keyof ISubscribesCallbacks;
    window.addEventListener('message', (e) => {
      if (
        e.data.message &&
        e.data.message.action === Event[eventCallbackName]
      ) {
        callbacks[eventCallbackName]?.(e as any);
      }
    });
  }
}
