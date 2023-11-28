<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

const tab = ref("CST");


onBeforeMount(async () => {
    await init();
});

async function init(): Promise<void> {
    
}

</script>

<template>
    <div class="q-pa-md felx justify-center centers" >
        <q-img src="@/assets/banner.png" style="height: 110px; width: 530px" />
    </div>

    <div class="q-pa-md felx justify-center centers">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab name="CST" label="Costumers" />
                    <q-tab name="ACC" label="Create account" />
                    <q-tab name="MKT" label="Make a transfer" />
                    <q-tab name="TRF" label="Transfers" />
                </q-tabs>
            </q-card>
        </div>
    </div>
    <div v-if="tab === 'CST'">
        
    </div>
    <div v-if="tab === 'ACC'">
        
    </div>
    <div v-if="tab === 'MKT'">
        
    </div>
    <div v-if="tab === 'TRF'">
        
    </div>
</template>
