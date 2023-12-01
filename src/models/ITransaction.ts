export interface ITransaction {
    id: number;
    costumerId: number;
    costumerAccountId: number;
    targetAccountId: number;
    amount: number;
    date: Date;
}
