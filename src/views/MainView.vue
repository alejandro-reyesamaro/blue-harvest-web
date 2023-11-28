<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { IAddCostumerForm, type ICostumer, type IAllCostumersResponse } from "@/models";
import { CostumersView, AccountsView } from "./../views";
import { useAppStore } from "@/stores";

const appStore = useAppStore();
const tab = ref("CST");
const costumers = ref<ICostumer[]>([]);

onBeforeMount(async () => {
    await init();
});

async function init(): Promise<void> {
    await loadCostumers();
}

async function loadCostumers(): Promise<void> {
    await appStore.loadCostumers();
    costumers.value = appStore.costumers;
}

</script>

<style lang="scss" scoped>
.imagecontainer {
    text-align: center;
}
</style>

<template>
    <div class="q-pa-md felx justify-center centers" >
        <div class="imagecontainer">
            <q-img src="@/assets/banner.png" style="height: 110px; width: 530px" />
        </div>
    </div>

    <div class="q-pa-md felx justify-center centers">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab name="CST" label="Costumers" />
                    <q-tab name="ACC" label="Account" />
                    <q-tab name="TRF" label="Transfers" />
                </q-tabs>
            </q-card>
        </div>
    </div>
    <div v-if="tab === 'CST'">
        <costumers-view :costumers="costumers" @reload="loadCostumers()" />
    </div>
    <div v-if="tab === 'ACC'">
        <accounts-view :costumers="costumers" />
    </div>
    <div v-if="tab === 'TRF'">
        
    </div>
</template>
