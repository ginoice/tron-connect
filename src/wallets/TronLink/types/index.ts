export interface ITronLink {
  connect: Promise<any> | any;
  disconnect: Promise<any> | any;
}

export interface ITronLinkParams {
  fnConnect: {
    success: (data: any) => void;
    failed: (data: any) => void;
    pending: (data: any) => void;
  };
  fnDisconnect: {
    success: () => void;
    failed: () => void;
    pending: () => void;
  };
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
