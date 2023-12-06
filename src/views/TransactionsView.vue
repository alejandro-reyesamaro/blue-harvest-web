<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { type ICostumer, type ITransaction, type IAccount } from "@/models";
import { TransactionService } from "@/services";

const transactionService = new TransactionService();
const options = ref<any[]>([]);
const costumerTransactions = ref<ITransaction[]>([]);

// Selected
const selected = ref(null);

const props = withDefaults(
    defineProps<{
        costumers: ICostumer[];
    }>(),
    {
        costumers: () => [],
    },
);


const columns = [
    {
        name: "costumerAccountName",
        required: true,
        label: "Costumer account",
        align: "left",
        field: (row: { costumerAccountName: string }): string => row.costumerAccountName,
        sortable: false,
    },
    {
        name: "targetAccountName",
        required: true,
        label: "Target account",
        align: "left",
        field: (row: { targetAccountName: string }): string => row.targetAccountName,
        sortable: false,
    },
    {
        name: "targetAccountCostumerName",
        required: true,
        label: "Target account owner",
        align: "left",
        field: (row: { 
            targetAccountCostumerName: string; 
            targetAccountCostumerSurname: string;
        }): string => `${row.targetAccountCostumerName} ${row.targetAccountCostumerSurname}`,
        sortable: false,
    },
    { 
        name: "amount", 
        align: "center", 
        label: "Amount", 
        field: (row: { amount: number }): number => row.amount, 
        sortable: false, 
    },
    { 
        name: "date", 
        align: "left", 
        label: "Date", 
        field: (row: { date: Date }): Date => row.date, 
        sortable: false, 
    },
    { 
        name: "action", 
        label: "",
        sortable: false, 
    },
];

onBeforeMount(async () => {
    options.value = props.costumers.map(c => {
        return {
            label: c.name,
            value: c.id,
        };
    });
});

async function onChange() : Promise<void> {
    await loadTransactions();
}


async function loadTransactions(): Promise<void> {
    const response = await transactionService.getCostumerTransactions(selected.value.value);
    costumerTransactions.value = response.transactions;
}

</script>

<template>
    <div class="q-pa-md" >
        <q-select 
            outlined 
            v-model="selected" 
            :options="options"
            label="Costumer" 
            @update:model-value="onChange" 
            style="min-width: 250px; max-width: 300px" />
    </div>
    <div v-if="selected == null || costumerTransactions?.length > 0" class="q-pa-md">
        <q-table
            title="Transactions"
            :rows="costumerTransactions"
            row-key="id"
            :columns="columns"
            flat 
            bordered
            selection="multiple"
            no-data-label="Select a costumer"
            :rows-per-page-options="[10, 15, 20]"
        >
            <template v-slot:top>
                <b>Transactions</b>
            </template>
            <template v-slot:header-selection="">
            </template>
            <template v-slot:body-selection="">                
            </template>
            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <div>
                        <q-btn color="red" flat icon="delete" @click="onDelete(props.row)" />
                    </div>
                </q-td>
            </template>
        </q-table>
    </div>
    <div v-else class="q-pa-md">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span>
            No transactions found for this costumer
        </span>
    </div>
</template>
