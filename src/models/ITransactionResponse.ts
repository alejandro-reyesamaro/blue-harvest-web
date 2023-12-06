export interface ITransactionResponse {
    id: number;
    costumerAccountId: number;
    costumerAccountName: string;
    targetAccountId: number;
    targetAccountName: string;
    targetAccountCostumerName: string;
    targetAccountCostumerSurname: string;
    amount: number;
    date: Date;
}
