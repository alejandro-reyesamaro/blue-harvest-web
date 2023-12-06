import { type ITransaction } from "./ITransaction";
import { type ICostumer } from "./ICostumer";

export interface ICostumerTransactionsResponse {
    message: String;
    transactions: ITransaction[];
    costumer: ICostumer;
}
