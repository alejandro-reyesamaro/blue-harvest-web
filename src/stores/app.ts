import { ref } from "vue";
import { defineStore } from "pinia";
import { type ICostumer } from "@/models/ICostumer";
import { CostumerService } from "@/services";

const costumerService = new CostumerService();

export const useAppStore = defineStore("app", () => {
    
    const costumers = ref<ICostumer[]>([]);
    
    async function loadCostumers(): Promise<void> {
        const response = await costumerService.getAllCostumers();
        costumers.value = response?.costumers;
    }

    return { costumers, loadCostumers };
});
