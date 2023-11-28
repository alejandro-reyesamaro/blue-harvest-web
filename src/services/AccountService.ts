import { type IAccount, type IAddAccountForm, type ICostumerAccountsResponse } from "@/models";
import { BaseClient } from "./BaseClient";

export class AccountService extends BaseClient {

    public constructor() {
        super("/account");
    }

    public async getCostumerAccounts(costumerId: number): Promise<ICostumerAccountsResponse> {
        try {
            const response = await this.apiClient.get<ICostumerAccountsResponse>(`/costumer/${costumerId}`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw response;
            }
        } catch (error) {
            this.notifyError("Error while getting accounts");
        }
        return [];
    }

    public async add(form: IAddAccountForm): Promise<void> {
        try {
            const response = await this.apiClient.post("", form);
            if (response.status === 201) {
                this.notifyOk(`Account ${form.name} added successfully`);
            }
            else {
                throw response;
            }
        } catch (error) {
            this.notifyError("Error while adding a account");
        }
    }
}
