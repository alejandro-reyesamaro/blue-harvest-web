<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { type ICostumer, type IAccount } from "@/models";

const step = ref<number>(1);

const props = withDefaults(
    defineProps<{
        costumers: ICostumer[];
    }>(),
    {
        costumers: () => [],
    },
);


</script>

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
                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="primary" label="Continue" />
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
