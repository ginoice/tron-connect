/// <reference types="vite/client" />
import { InjectedTronLink } from '@tronlink';
declare global {
  interface Window {
    tronLink?: InjectedTronLink;
  }
}
