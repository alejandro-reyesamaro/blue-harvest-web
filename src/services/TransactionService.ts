import { type ICostumerTransactionsResponse, type IAddTransactionForm } from "@/models";
import { BaseClient } from "./BaseClient";

export class TransactionService extends BaseClient {

    public constructor() {
        super("/transaction");
    }

    public async getCostumerTransactions(costumerId: number): Promise<ICostumerTransactionsResponse> {
        try {
            const response = await this.apiClient.get<ICostumerTransactionsResponse>(`/costumer/${costumerId}`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw response;
            }
        } catch (error) {
            this.notifyError("Error while getting transactions");
        }
        return [];
    }

    public async add(form: IAddTransactionForm): Promise<void> {
        try {
            const response = await this.apiClient.post("", form);
            if (response.status === 201) {
                this.notifyOk("Transaction added successfully");
            }
            else {
                throw response;
            }
        } catch (error) {
            this.notifyError("Error while adding a transaction");
        }
    }
}
