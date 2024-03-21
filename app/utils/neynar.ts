import { NeynarUser } from "frog/middlewares";
import { AddressType, InteractorAddress } from "@/types/neynar";

export const getInteractor = (ctx: { var: { interactor: NeynarUser }}): NeynarUser | null => {
  if (ctx.var.interactor) {
    return ctx.var.interactor as NeynarUser;
  }

  return null;
}

export const getAddresses = (user: NeynarUser): InteractorAddress[] => {
  let addresses: InteractorAddress[] = [];

  user.verifiedAddresses.ethAddresses.forEach((address) => {
    addresses.push({
      full: address,
      short: address.slice(0, 6),
      type: AddressType.Ethereum,
    });
  });
  user.verifiedAddresses.solAddresses.forEach((address) => {
    addresses.push({
      full: address,
      short: address.slice(0, 6),
      type: AddressType.Solana,
    });
  });

  if (addresses.length === 0 && user.custodyAddress) {
    addresses.push({
      full: user.custodyAddress,
      short: user.custodyAddress.slice(0, 6),
      type: AddressType.Custody,
    });
  }

  return addresses.filter(a => a.full !== '0x');
}