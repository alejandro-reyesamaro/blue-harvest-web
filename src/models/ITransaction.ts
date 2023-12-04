import { type IAccount } from "./IAccount";

export interface ITransaction {
    id: number;
    costumerId: number;
    costumerAccount: IAccount;
    targetAccount: IAccount;
    amount: number;
    date: Date;
}
