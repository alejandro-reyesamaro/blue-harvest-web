import { type ICostumer, type IAddCostumerForm, type IAllCostumersResponse } from "@/models";
import { BaseClient } from "./BaseClient";

export class CostumerService extends BaseClient {

    public constructor() {
        super("/costumer");
    }

    public async getAllCostumers(): Promise<IAllCostumersResponse> {
        try {
            const response = await this.apiClient.get<IAllCostumersResponse>("");
            if (response.status === 200) {
                return response.data;
            } else {
                throw response;
            }
        } catch (error) {
            this.notifyError("Error while getting costumers");
        }
        return [];
    }

    public async add(form: IAddCostumerForm): Promise<void> {
        try {
            const response = await this.apiClient.post("", form);
            if (response.status === 201) {
                this.notifyOk(`Costumer ${form.name} added successfully`);
            }
            else {
                throw response;
            }
        } catch (error) {
            this.notifyError("Error while adding a costumer");
        }
    }
}
