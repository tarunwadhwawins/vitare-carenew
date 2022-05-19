<template>

            <div class="common-bg">
                <a-row>
                    
                    <a-col :span="12">
                        <SearchField endPoint="cptCode" v-if="arrayToObjact(screensPermissions,14)" />
                    </a-col>
                    <a-col :span="12">
                        <div class="text-right mb-24">
                            <ExportToExcel @click="exportExcel('cptCode_report','?fromDate=&toDate='+search)" />
                        </div>
                    </a-col>
                    <a-col :span="24">
                        <ReferralTable />
                    </a-col>
                </a-row>
            </div>


</template>

<script>

import ReferralTable from "@/components/administration/referral/table/ReferralTable";
import { onUnmounted, onMounted} from "vue";
import SearchField from "@/components/common/input/SearchField";

import { arrayToObjact,exportExcel } from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import {
    useStore
} from "vuex"

export default {
    components: {
        
        ReferralTable,
        SearchField,
       
        ExportToExcel,
    },
    setup() {
       
        const store = useStore()
       
      
        onMounted(() => { 
             if (store.getters.filter.value) {
                 store.dispatch("referralList","?filter=" + store.getters.filter.value)
               
            } else {
                store.dispatch("referralList")
            }
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("referralColumns")
            store.dispatch("referralList")

        })
        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter", '')
        })
        return {
            exportExcel,
            screensPermissions: store.getters.screensPermissions,
            arrayToObjact,
       
            search: store.getters.searchTable,
        };
    },
};
</script>
