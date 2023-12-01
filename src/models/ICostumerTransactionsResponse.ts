import { type ITransaction } from "./ITransaction";

export interface ICostumerTransactionsResponse {
    message: String;
    accounts: ITransaction[];
}
