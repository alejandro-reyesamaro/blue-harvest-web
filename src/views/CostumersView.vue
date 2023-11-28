<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { IAddCostumerForm, type ICostumer } from "@/models";
import { CostumerService } from "@/services";
import { log } from "console";

const costumerService = new CostumerService();
const selected = ref<ICostumer[]>([]);
const addDialog = ref<boolean>(false);

// <new costumer>
const newCostumerName = ref<string>("");
const newCostumerSurname = ref<string>("");

// Rules
const rulesName = [ val => !!val || "Name field is required" ];
const rulesSurname = [ val => !!val || "Surname field is required" ];

const props = withDefaults(
    defineProps<{
        costumers: ICostumer[];
    }>(),
    {
        costumers: () => [],
    },
);

const emit = defineEmits<{ 
    "reload": [];
}>();

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
        name: "surname", 
        align: "center", 
        label: "Surname", 
        field: (row: { surname: string }): string => row.surname, 
        sortable: false, 
    },
    { 
        name: "action", 
        label: "",
        sortable: false, 
    },
];

onBeforeMount(async () => {
    selected.value = props.costumers;
});

async function onAdd(): Promise<void> {
    const newCostumer: IAddCostumerForm = {
        name: newCostumerName.value,
        surname: newCostumerSurname.value,
    };
    await costumerService.add(newCostumer);
    this.addDialog = false;
    this.emit("reload");
}

</script>

<template>
    <div class="q-pa-md">
        <q-table
            title="Costumers"
            :rows="props.costumers"
            row-key="costumerId"
            :columns="columns"
            flat 
            bordered
            selection="multiple"
            v-model:selected="selected"
            :rows-per-page-options="[10, 15, 20]"
        >
            <template v-slot:top>
                <b>Costumers</b>
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
    <div class="q-pa-sm q-gutter-sm">
        <q-btn icon="add" color="primary" label="Add costumer" @click="addDialog = true"/>
    </div>

    <q-dialog v-model="addDialog">
        <q-card style="width: 600px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">
                    <q-icon name="add" />
                    Add a costumer
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
                <div class="q-gutter-md">
                    <q-input filled v-model="newCostumerName" label="Name" :rules="rulesName" />
                    <q-input filled v-model="newCostumerSurname" label="Surname" :rules="rulesSurname" />
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="decondary" v-close-popup />
                <q-btn flat label="Add" color="primary" @click="onAdd()" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
