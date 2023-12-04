import { type ICostumer } from "./ICostumer";

export interface IAccount {
    id: number;
    costumer: ICostumer;
    name: string;
    balance: number;
}
