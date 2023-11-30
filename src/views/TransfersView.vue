<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { type ICostumer, type IAccount } from "@/models";
import { AccountService } from "@/services";

const step = ref<number>(1);
const accountService = new AccountService();

const sourceCostumerSelected = ref(null);
const sourceCostumerOptions = ref<any[]>([]);
const sourceAccounts = ref<IAccount[]>([]);
const sourceAccountSelected = ref(null);
const sourceAccountOptions = ref<any[]>([]);

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
});

function onStepOneContinue(): void {
    step.value = 2;
}

async function onSourceCostumerChange(): Promise<void> {
    await loadSourceAccounts();
    sourceAccountOptions.value = sourceAccounts.value.map(a => {
        return {
            label: a.name,
            value: a.id,
        };
    });
}

function onSourceAccountChange(): void {

}

async function loadSourceAccounts(): Promise<void> {
    const response = await accountService.getCostumerAccounts(sourceCostumerSelected.value.value);
    sourceAccounts.value = response.accounts;
}

</script>

<style lang="sass">
.row-horizontal-alignment
  .row > div
    padding: 0px
  > div + div
    margin-top: 1rem
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
                <q-stepper-navigation>
                    <q-btn @click="onStepOneContinue()" :disable="sourceAccountSelected == null" color="primary" label="Continue" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="2"
                title="Select target account"
                icon="credit_card"
                :done="step > 2"
            >
                
                <q-stepper-navigation>
                    <q-btn @click="step = 3" color="primary" label="Continue" />
                    <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="3"
                title="Enter the amount"
                icon="monetization_on"
            >
                <q-stepper-navigation>
                    <q-btn @click="step = 4" color="primary" label="Continue" />
                    <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>.
            </q-step>

            <q-step
                :name="4"
                title="Confirmation"
                icon="savings"
            >
                <q-stepper-navigation>
                    <q-btn color="primary" label="Finish" />
                    <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
</template>
