<template>
<div>
    <!---->
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <Sidebar />
            <a-layout-content>
                <div class="common-bg">
                    <a-row>
                        <a-col :span="24">
                            <h2 class="pageTittle">
                                Programs
                                <div class="commonBtn">
                                    <a-button class="btn primaryBtn" @click="showModal(true)">Add New Program</a-button>
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12">
                            <a-select v-model:value="value2" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange2">
                            </a-select>
                        </a-col>
                        <a-col :span="12">
                            <div class="text-right mb-24">
                                <a-button class="primaryBtn">Export to Excel</a-button>
                            </div>
                        </a-col>
                        <ProgramTable v-if="programsList.programList" :programData="programsList" @is-edit="showEdit($event)"></ProgramTable>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!--modals-->
    <AdminPrograms v-if="programId" v-model:visible="visible" @ok="handleOk" @is-visible="showModal($event)" :idProgram="programId" />
    <AdminPrograms v-else v-model:visible="visible" @ok="handleOk" @is-visible="showModal($event)" />
    <!---->
</div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminPrograms from "@/components/modals/AdminPrograms";
import { ref,watchEffect } from "vue";
import ProgramTable from "./ProgramTable"
import { useStore } from "vuex";
// const data = [
//   {
//     key: "1",
//     name: "RPM - Remote Patient Monitor",
//     description: "Lorem Ipsum",
//     active: "",
//     action: "",
//   },
//   {
//     key: "2",
//     name: "BHI - Behaviour Health Integration",
//     description: "Lorem Ipsum",
//     active: "",
//     action: "",
//   },
//   {
//     key: "3",
//     name: "CCM - Chronic Care Management",
//     description: "Lorem Ipsum",
//     active: "",
//     action: "",
//   },
// ];
export default {
    components: {
        Header,
        Sidebar,

        AdminPrograms,
        ProgramTable,
    },

    setup() {

        const store = useStore()
        const visible = ref(false);
        const showModal = (e) => {
            visible.value = e;
        };
        const programId = ref(null)
        const handleOk = (e) => {
            console.log(e);
            visible.value = false;
        };
        const handleChange2 = (value) => {
            console.log(`selected ${value}`);
        };
        watchEffect(() => {
            store.dispatch('programList')
        })
        const searchoptions = ref([{
                value: "RPM - Remote Patient Monitor",
                label: "RPM - Remote Patient Monitor",
            },
            {
                value: "BHI - Behaviour Health Integration",
                label: "BHI - Behaviour Health Integration",
            },
            {
                value: "CCM - Chronic Care Management",
                label: "CCM - Chronic Care Management",
            },

        ]);
        const programsList = store.getters.programsRecord.value
        const showEdit = (e) => {
            programId.value = e.id
            visible.value = e.check;
            //console.log("check",programId.value)
        }
        return {
            programId,
            showEdit,
            handleChange2,
            searchoptions,
            size: ref([]),
            visible,
            showModal,
            handleOk,
            programsList
        };
    },
};
</script>
