<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { IAddAccountForm, type ICostumer, type IAccount } from "@/models";
import { AccountService } from "@/services";
import { CostumerAccountsView } from "./../components";
import { log } from "console";

const accountService = new AccountService();
const addDialog = ref<boolean>(false);
const options = ref<any[]>([]);
const costumerAccounts = ref<IAccount[]>([]);

// Selected
const selected = ref(null);

// <new account>
const newAccountName = ref<string>("");
const newAccountCredit = ref<number>(0);

// Rules
const rulesName = [ val => !!val || "Name field is required" ];

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
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row: { name: string }): string => row.name,
        sortable: false,
    },
    { 
        name: "balance", 
        align: "center", 
        label: "Balance", 
        field: (row: { balance: number }): number => row.balance, 
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
    await loadAccounts();
}

async function onAdd(): Promise<void> {
    const newAccount: IAddAccountForm = {
        costumerId: selected.value.value,
        name: newAccountName.value,
        initialCredit: newAccountCredit.value,
    };
    await accountService.add(newAccount);
    this.addDialog = false;
    loadAccounts();
}

async function loadAccounts(): Promise<void> {
    const response = await accountService.getCostumerAccounts(selected.value.value);
    costumerAccounts.value = response.accounts;
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
    <div v-if="selected == null || costumerAccounts?.length > 0" class="q-pa-md">
        <q-table
            title="Accounts"
            :rows="costumerAccounts"
            row-key="id"
            :columns="columns"
            flat 
            bordered
            selection="multiple"
            no-data-label="Select a costumer"
            :rows-per-page-options="[10, 15, 20]"
        >
            <template v-slot:top>
                <b>Accounts</b>
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
            No account found for this costumer
        </span>
    </div>
    <div class="q-pa-md q-gutter-md">
        <q-btn icon="add" color="primary" :disable="selected?.value == null" label="Add account" @click="addDialog = true"/>
    </div>

    <q-dialog v-model="addDialog">
        <q-card style="width: 600px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">
                    <q-icon name="add" />
                    Add an account for {{selected.label}}
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
                <div class="q-gutter-md">
                    <q-input filled v-model="newAccountName" label="Name" :rules="rulesName" />
                    <q-input
                        v-model.number="newAccountCredit"
                        filled
                        prefix="$"
                        type="number"
                    />
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="decondary" v-close-popup />
                <q-btn flat label="Add" :disable="newAccountName.length <= 0" color="primary" @click="onAdd()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
