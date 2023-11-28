<script lang="ts" setup>
import { type IAccount } from "@/models";

const props = withDefaults(
    defineProps<{
        accounts: IAccount[];
    }>(),
    {
        accounts: () => [],
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

</script>

<template>
    <div class="q-pa-md">
        <q-table
            title="Accounts"
            :rows="props.accounts"
            row-key="id"
            :columns="columns"
            flat 
            bordered
            selection="multiple"
            v-model:selected="selected"
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
    
</template>
