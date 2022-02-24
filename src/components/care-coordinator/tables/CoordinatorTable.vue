<template>
 
    <a-table :data-source="data" :scroll="{ y: 300 ,x: 1020}" :pagination=false :columns="fields" >
    <template #name="{text,record}" >
        <!-- <router-link :to="linkTo">{{ text.text }}</router-link> -->
        <router-link @click="staffSummery(record.uuid)" :to="{ name: 'CoordinatorSummary', params: { udid:record.uuid?record.uuid:'eyrer8758458958495'  }}">{{ text }}</router-link>
    </template>

    <template #createdDate="text">
        <span>{{ dateFormat(text.text) }}</span>
    </template>
    <template #action="text">
        <router-link :to="linkTo">{{ text.text }}</router-link>
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
import { WarningOutlined } from "@ant-design/icons-vue"
import {dateFormat} from "../../../commonMethods/commonMethod"
import { ref, reactive,  onMounted } from "vue"
import { useStore } from "vuex";
export default {
  name: "DataTable",
  components: {
    WarningOutlined,
  },
  props: {
        
        staffRecords: {
            type: Array,
        },
    },
  setup(props) {
    console.log(props.staffRecords)
    const store = useStore();
        const fields = reactive(props.staffRecords.columns)
        const data = reactive(props.staffRecords.staffs)
        const meta = store.getters.staffRecord
        const loader = ref(false)
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                if (currentScroll >= maxScroll) {

                    let current_page = meta.value.staffMeta.current_page + 1

                    if (current_page <= meta.value.staffMeta.total_pages) {
                        loader.value = true
                        meta.value.staffMeta = ""
                        store.dispatch("staffs", "?page=" + current_page)
                        setTimeout(() => {
                            loadMoredata()
                        }, 1000)

                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.value.staffs
            
            newData.forEach(element => {
                data.push(element)
            });
            loader.value = false
        }

    function staffSummery(uuid){
      console.log('value',uuid);
    }
    return {
      fields,
      data,
      staffSummery,
      dateFormat
    }
  },
};
</script>
