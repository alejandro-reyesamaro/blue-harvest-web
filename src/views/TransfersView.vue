<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { type ICostumer, type IAccount, type IAddTransactionForm } from "@/models";
import { AccountService, TransactionService } from "@/services";

const step = ref<number>(1);
const accountService = new AccountService();
const transactionService = new TransactionService();

const sourceCostumerSelected = ref(null);
const sourceCostumerOptions = ref<any[]>([]);
const sourceAccounts = ref<IAccount[]>([]);
const sourceAccountSelected = ref(null);
const sourceAccountOptions = ref<any[]>([]);

const targetCostumerSelected = ref(null);
const targetCostumerOptions = ref<any[]>([]);
const targetAccounts = ref<IAccount[]>([]);
const targetAccountSelected = ref(null);
const targetAccountOptions = ref<any[]>([]);

const amount = ref<number>(0);

const props = withDefaults(
    defineProps<{
        costumers: ICostumer[];
    }>(),
    {
        costumers: () => [],
    },
);

onBeforeMount(async () => {
    sourceCostumerOptions.value = props.costumers.map(c => {
        return {
            label: c.name,
            value: c.id,
        };
    });
    targetCostumerOptions.value = props.costumers.map(c => {
        return {
            label: c.name,
            value: c.id,
        };
    });
});


async function onSourceCostumerChange(): Promise<void> {
    await loadSourceAccounts();
    sourceAccountOptions.value = sourceAccounts.value?.map(a => {
        return {
            label: a.name,
            value: a.id,
        };
    });
    sourceAccountSelected.value = null;
    clearTarget();
}

function onSourceAccountChange(): void {
    clearTarget();
}

function clearTarget(): void {
    targetCostumerSelected.value = null;
    targetAccounts.value = null;
    targetAccountSelected.value = null;
    targetAccountOptions.value = null;
}

function clearSource(): void {
    sourceCostumerSelected.value = null;
    sourceAccounts.value = null;
    sourceAccountSelected.value = null;
    sourceAccountOptions.value = null;
}

async function loadSourceAccounts(): Promise<void> {
    const response = await accountService.getCostumerAccounts(sourceCostumerSelected.value.value);
    sourceAccounts.value = response.accounts;
}

function getSourceAccountCredit(): number {
    return sourceAccounts.value?.find(a => a.id === sourceAccountSelected.value?.value).balance;
}

function getTargetAccountCredit(): number {
    return targetAccounts.value?.find(a => a.id === targetAccountSelected.value?.value).balance;
}

async function onTargetCostumerChange(): Promise<void> {
    await loadTargetAccounts();
    targetAccountOptions.value = targetAccounts.value?.filter((a: IAccount)  => a.id != sourceAccountSelected.value?.value)
    .map(a => {
        return {
            label: a.name,
            value: a.id,
        };
    });
    targetAccountSelected.value = null;
}

async function loadTargetAccounts(): Promise<void> {
    const response = await accountService.getCostumerAccounts(targetCostumerSelected.value.value);
    targetAccounts.value = response.accounts;
}

function continuerStep2Disabled(): boolean {
    return targetAccountSelected.value == null || notEnoughCredit();
}

function notEnoughCredit(): boolean {
    const sourceAccount = sourceAccounts.value.find(s => s.id === sourceAccountSelected?.value.value);
    const balance = sourceAccount.balance;
    return balance <= 0;
}

function wrongAmount(): boolean {
    return amount.value <= 0 || tooMuchAmount();
}

function tooMuchAmount(): boolean {
    const sourceAccount = sourceAccounts.value.find(s => s.id === sourceAccountSelected?.value.value);
    const balance = sourceAccount.balance;
    return balance < amount.value;
}

async function onFinish(): Promise<void> {
    const form: IAddTransactionForm = {
        costumerId: sourceCostumerSelected?.value.value,
        costumerAccountId: sourceAccountSelected?.value.value,
        targetAccountId: targetAccountSelected?.value.value,
        amount: amount.value,
    };
    await transactionService.add(form);
    step.value = 1;
    clearSource();
    clearTarget();
}

</script>

<style lang="sass">
.row-horizontal-alignment
  .row > div
    padding: 0px
  > div + div
    margin-top: 1rem
.card
  width: 100%
  max-width: 250px
.flat-card
  width: 100%
  min-width: 250px
  max-width: 300px
  padding: 10px
</style>

<template>
    <div class="q-pa-md">
        <q-stepper
            v-model="step"
            vertical
            color="primary"
            animated
        >
            <q-step
                :name="1"
                title="Select source account"
                icon="credit_card"
                :done="step > 1"
            >
                <div class="q-pa-sm" >                    
                    <q-select 
                        outlined 
                        v-model="sourceCostumerSelected" 
                        :options="sourceCostumerOptions"
                        label="Costumer" 
                        @update:model-value="onSourceCostumerChange()" 
                        style="min-width: 250px; max-width: 300px" 
                    />
                </div>
                <div v-if="sourceCostumerSelected != null" class="q-pa-sm" >                    
                    <q-select 
                        outlined 
                        v-model="sourceAccountSelected" 
                        :options="sourceAccountOptions"
                        label="Account"
                        @update:model-value="onSourceAccountChange()" 
                        style="min-width: 250px; max-width: 300px" 
                    />
                </div>
                <div v-if="sourceAccountSelected != null" class="q-pa-sm" >
                    <q-card flat bordered class="flat-card">
                        Credit: ${{getSourceAccountCredit()}}
                    </q-card>
                </div>
                <q-stepper-navigation>
                    <q-btn @click="step = 2" :disable="sourceAccountSelected == null" color="primary" label="Continue" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="2"
                title="Select target account"
                icon="credit_card"
                :done="step > 2"
            >
                <div class="q-pa-sm" >                    
                    <q-select 
                        outlined 
                        v-model="targetCostumerSelected" 
                        :options="targetCostumerOptions"
                        label="Costumer" 
                        @update:model-value="onTargetCostumerChange()" 
                        style="min-width: 250px; max-width: 300px" 
                    />
                </div>
                <div v-if="targetCostumerSelected != null" class="q-pa-sm" >                    
                    <q-select 
                        outlined 
                        v-model="targetAccountSelected" 
                        :options="targetAccountOptions"
                        label="Account"  
                        style="min-width: 250px; max-width: 300px" 
                    />
                </div>
                <div v-if="targetAccountSelected != null" class="q-pa-sm" >
                    <q-card flat bordered class="flat-card">
                        Credit: ${{getTargetAccountCredit()}}
                    </q-card>
                </div>
                <q-stepper-navigation>
                    <q-btn @click="step = 3" :disable="continuerStep2Disabled()" color="primary" label="Continue">
                        <q-tooltip v-if="continuerStep2Disabled()">
                            Enabled only if both accounts are selected and there is enough credit in the source account
                        </q-tooltip>
                    </q-btn>
                    <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="3"
                title="Enter the amount"
                icon="monetization_on"
                :done="step > 3"
            >
                <q-input
                    v-model.number="amount"
                    filled
                    prefix="$"
                    type="number"
                />
                    
                <q-stepper-navigation>
                    <q-btn @click="step = 4" :disable="wrongAmount()" color="primary" label="Continue">
                        <q-tooltip v-if="wrongAmount()">
                            Enabled only if the source account has enough credit
                        </q-tooltip>
                    </q-btn>
                    <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="4"
                title="Confirmation"
                icon="savings"
            >
                <div class="q-pa-md row items-start q-gutter-md">
                    <q-card class="card">
                        <q-card-section>
                            <div class="text-h7">Source: <b>{{sourceAccountSelected?.label}}</b> (${{getSourceAccountCredit()}})</div>
                            <div class="text-subtitle3">by {{sourceCostumerSelected?.label}}</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="q-pa-md row items-start q-gutter-md">
                    <q-card class="card">
                        <q-card-section>
                            <div class="text-h7">Target: <b>{{targetAccountSelected?.label}}</b> (${{getTargetAccountCredit()}})</div>
                            <div class="text-subtitle3">by {{targetCostumerSelected?.label}}</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="q-pa-md row items-start q-gutter-md">
                    <q-card class="card">
                        <q-card-section>
                            <div class="text-h7">Amount: $<b>{{amount}}</b></div>
                        </q-card-section>
                    </q-card>
                </div>
                <q-stepper-navigation>
                    <q-btn color="primary" label="Finish" @click="onFinish()"/>
                    <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
</template>
