<template>
<a-table  rowKey="id" :columns="fields" :data-source="data" :scroll="{ y: 300 ,x: 1200}" :pagination=false>
    <template #firstName="{text, record}" v-if="arrayToObjact(patientsPermissions,65)">
        <router-link :to="{ name: 'PatientSummary', params: { udid:record.id  }}">{{ text }}</router-link>
    </template>
     <template #firstName="{text}" v-else>
        <span>{{ text }}</span>
    </template>
    <template #flags="text">
        <span class="box" :style="{'background-color':text.text}"></span>
        <!-- <span class="box" :class="(text = text.match(/yellowBgColor/g))" v-if="text.match(/yellowBgColor/g)"></span> -->
    </template>
    <!-- <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template> -->
    <template #patientVitals>
        <WarningOutlined />
    </template>

    <template #lastReadingDate>
        <WarningOutlined />
    </template>
</a-table>
<Loader />
<InfiniteLoader v-if="loader" />
</template>

<script>
import { WarningOutlined } from "@ant-design/icons-vue";
import { ref, reactive,  onMounted,computed } from "vue"
import { useStore } from "vuex";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
import Loader from "@/components/loader/Loader";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default {
    name: "DataTable",
    components: {
        WarningOutlined,
        Loader,
        InfiniteLoader
    },
    props: {
        columns: {
            type: Array,
        },
        patientRecords: {
            type: Array,
        },
    },
    setup(props) {
       
        const store = useStore();
        const fields = reactive(props.columns)
        const data = reactive(props.patientRecords)
        const meta = store.getters.patientsRecord
        const loader = ref(false)
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                if (currentScroll >= maxScroll) {

                    let current_page = meta.value.patientMeta.current_page + 1

                    if (current_page <= meta.value.patientMeta.total_pages) {
                        loader.value = true
                        meta.value.patientMeta = ""
                        store.state.patients.patientList=""
                        store.dispatch("patients", "?page=" + current_page).then(()=>{
                            //console.log('response',response)
                            loadMoredata()
                        })
                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.value.patientList
            
            newData.forEach(element => {
                data.push(element)
            });
            loader.value = false
        }
        const patientsPermissions=computed(()=>{
            return store.state.screenPermissions.patientsPermissions
        })
        return {
            patientsPermissions,
            arrayToObjact,
            fields,
            data,
            loader
        }
    },
};
</script>
