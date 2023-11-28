import { ref } from "vue";
import { defineStore } from "pinia";
import { type ICostumer } from "@/models/ICostumer";
import { type IAccount } from "@/models/IAccount";
import { CostumerService, AccountService } from "@/services";

const costumerService = new CostumerService();
const accountService = new AccountService();

export const useAppStore = defineStore("app", () => {
    
    const costumers = ref<ICostumer[]>([]);
    const accounts = ref<IAccount[]>([]);
    
    async function loadCostumers(): Promise<void> {
        const response = await costumerService.getAllCostumers();
        costumers.value = response?.costumers;
    }
    async function loadCostumerAccounts(costumerId: number): Promise<void> {
        const response = await accountService.getCostumerAccounts(costumerId);
        accounts.value = response?.accounts;
    }

    return { costumers, accounts, loadCostumers, loadCostumerAccounts };
});
