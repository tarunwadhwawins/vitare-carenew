<template>
<a-table rowKey="id" :data-source="meta.staffs" :scroll="{ y: tableYScrollerCounterPage ,x: 1020}" :pagination=false :columns="meta.columns">
    <template #name="{text,record}">
        <!-- <router-link :to="linkTo">{{ text.text }}</router-link> -->
        <router-link @click="staffSummery(record.uuid)" :to="{ name: 'CoordinatorSummary', params: { udid:record.uuid?record.uuid:'eyrer8758458958495'  }}">{{ text }}</router-link>
    </template>

    <template #createdDate="text">
        <span>{{ dateFormat(text.text) }}</span>
    </template>
    <template #action="">
        <!-- <router-link >{{ text.text }}</router-link> -->
    </template>
    <!-- <template #compliance>
        <a class="icons">
            <WarningOutlined /></a>
    </template> -->

    <template #lastReadingDate>
        <WarningOutlined />
    </template>
</a-table>
</template>

<script>
import {
    WarningOutlined
} from "@ant-design/icons-vue"
import {
    dateFormat,tableYScrollerCounterPage
} from "../../../commonMethods/commonMethod"
import {
    onMounted
} from "vue"
import {
    useStore
} from "vuex";
//import InfiniteLoader from "@/components/loader/InfiniteLoader";
export default {
    name: "DataTable",
    components: {
        WarningOutlined,
        //  InfiniteLoader
    },
    props: {

    },
    setup() {
       
        const store = useStore();
        //const fields = reactive(props.staffRecords.columns)

        const meta = store.getters.staffRecord.value
        let data = ''
        let scroller = ''
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                if (currentScroll >= maxScroll) {

                    let current_page = meta.staffMeta.current_page + 1

                    if (current_page <= meta.staffMeta.total_pages) {
                        scroller = maxScroll
                        meta.staffMeta = ""
                        data = meta.staffs
                        store.state.careCoordinator.staffs = ""
                        let url=store.getters.searchTable.value ? store.getters.searchTable.value :''
                        store.dispatch("staffs", "?search="+url+"&page=" + current_page).then(() => {
                            loadMoredata()
                        })

                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.staffs

            newData.forEach(element => {
                data.push(element)
            });
            meta.staffs = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 50)

        }

        function staffSummery(uuid) {
            console.log('value', uuid);
        }
        return {

            meta,
            staffSummery,
            dateFormat,
            tableYScrollerCounterPage
        }
    },
};
</script>
