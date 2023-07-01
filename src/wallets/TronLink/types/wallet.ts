import { IData } from './store';

export interface IWallet {
  connect: Promise<any> | any;
  disconnect: Promise<any> | any;
  onNetworkChanged: Promise<any> | any;
}

export interface IWalletParams {
  fnConnect: {
    success: (data: IData) => void;
    failed: (data: IData) => void;
    pending: (data: IData) => void;
  };
  fnDisconnect: {
    success: (data: IData) => void;
    failed: (data: IData) => void;
    pending: (data: IData) => void;
  };

  fnOnNetworkChanged: (data: IData) => void;
}

export interface InjectedTronLink {
  ready: boolean;
  request: <R>(arg: IrequestArgsTronLink) => Promise<R>;
  sunWeb: boolean;
  tronWeb: boolean;
}

interface IrequestArgsTronLink {
  method: string;
}

export interface IrequestAccountsResponseTronLink {
  code: ErequestAccountsResponseCodeTronLink; // 200：ok 4000：in queue, no need to repeat commit， 4001：user rejected
  message: string;
}

export enum ErequestAccountsResponseCodeTronLink {
  OK = 200,
  IN_QUEUE = 4000,
  USER_REJECTED = 4001,
}
