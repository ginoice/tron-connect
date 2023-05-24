import type { Status } from 'utils/statutses';

interface IData {
  provider: any,
  walletAddress: string | null,
  status: Status
}

interface IDataMutation {
  loading(): void,
  succeeded(tronLink: any): void,
  failed(): void
}

export type {
  IData,
  IDataMutation
}