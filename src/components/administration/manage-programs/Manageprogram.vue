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
                                <div class="commonBtn" v-if="arrayToObjact(programsPermissions,15)">
                                    <a-button class="btn primaryBtn" @click="showModal(true)">Add New Program</a-button>
                                </div>
                            </h2>
                        </a-col>
                        <a-col :span="12" v-if="arrayToObjact(programsPermissions,20)">
                            <a-select v-model:value="value2" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange2">
                            </a-select>
                        </a-col>
                        <a-col :span="12" v-if="arrayToObjact(programsPermissions,19)">
                            <div class="text-right mb-24">
                                <a-button class="primaryBtn">Export to Excel</a-button>
                            </div>
                        </a-col>

                        <ProgramTable @is-edit="showEdit($event)"> </ProgramTable>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!--modals-->
    <AdminPrograms v-if="programId" v-model:visible="visible" @ok="handleOk" @is-visible="showEdit($event)" :idProgram="programId" />
    <AdminPrograms v-else v-model:visible="visible" @ok="handleOk" @is-visible="showModal($event)" />
    <!---->
</div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminPrograms from "@/components/modals/AdminPrograms";
import {
    ref,
  
    computed
} from "vue";
import ProgramTable from "./ProgramTable"
import {
    useStore
} from "vuex";
import {
    arrayToObjact
} from "@/commonMethods/commonMethod";

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
            programId.value = null
        };
        const programId = ref(null)
        const handleOk = (e) => {
            console.log(e);
            visible.value = false;
        };
        const handleChange2 = (value) => {
            console.log(`selected ${value}`);
        };
        
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

        const showEdit = (e) => {
            if(e.check){
                programId.value = e.id
                visible.value = e.check;
            }else{
                visible.value = e
            }
            
            
            //console.log("check",programId.value)
        }
        const programsPermissions = computed(() => {
            return store.state.screenPermissions.programsPermissions
        })
        return {
            arrayToObjact,
            programsPermissions,
            programId,
            showEdit,
            handleChange2,
            searchoptions,
            size: ref([]),
            visible,
            showModal,
            handleOk,

        };
    },
};
</script>
