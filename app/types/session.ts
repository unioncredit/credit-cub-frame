export interface Session {
  fid: number;
  name: string;
  address?: string;
  claimed?: boolean;
  trustAmount: number;
  sybilScore: number;
}