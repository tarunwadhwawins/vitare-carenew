<template>
<a-table :columns="fields" :data-source="data" :scroll="{ y: 420 ,x: 1020}" :pagination=false>
    <template #firstName="{text, record}">
        <router-link :to="{ name: 'PatientSummary', params: { udid:record.udid  }}">{{ text }}</router-link>
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
</template>

<script>
import { WarningOutlined } from "@ant-design/icons-vue";
import { ref, reactive,  onMounted } from "vue"
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
export default {
    name: "DataTable",
    components: {
        WarningOutlined,
        Loader
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
                        store.dispatch("patients", "?page=" + current_page)
                        setTimeout(() => {
                            loadMoredata()
                        }, 1000)

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

        return {
            fields,
            data,
            loader
        }
    },
};
</script>
