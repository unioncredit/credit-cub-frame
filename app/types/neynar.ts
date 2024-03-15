export enum AddressType {
  Ethereum = "ethereum",
  Solana = "solana",
  Custody = "custody",
}

export interface InteractorAddress {
  full: string;
  short: string;
  type: AddressType;
}