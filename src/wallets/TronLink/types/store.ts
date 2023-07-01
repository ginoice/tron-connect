import type { Status } from 'utils/statutses';

interface IData {
  provider: any;
  walletAddress: string | null;
  status: Status;
  network: string | null;
}

interface IDataMutation {
  loading(): void;
  succeeded(tronLink: any): void;
  failed(): void;
}

export type { IData, IDataMutation };
