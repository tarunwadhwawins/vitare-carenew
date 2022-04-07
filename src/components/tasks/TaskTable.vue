<template>
<a-col :sm="24">
    <a-table rowKey="id" :columns="meta.tasksListColumns" :data-source="meta.tasksList" :scroll="{ x: 900 ,y:tableYScroller }" :pagination="false" @change="handleTableChange">
        <template #taskName="text">
            <router-link to="#" @click="showModal">{{ text.text }}</router-link>
        </template>
        <template #assignedBy="text">
            <router-link to="coordinator-summary">{{ text.text }}</router-link>
        </template>

        <template #category="{ record }">
            <span v-for="category,i in record.category" :key="category.id" to="coordinator-summary">
                {{i==0?' ':','}} {{ category }}
            </span>
        </template>
        <template #action="{ record }" >
            <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,115)">
                <template #title>
                    <span>{{ $t('global.edit') }}</span>
                </template>
                <a class="icons">
                    <EditOutlined @click="editTask(record.id)" /></a>
            </a-tooltip>
            <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,116)">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons">
                    <DeleteOutlined @click="deleteTask(record.id)" /></a>
            </a-tooltip>
            <a-tooltip placement="bottom">
                <template #title>
                    <span>{{$t('tasks.createAppointment')}}</span>
                </template>
                <router-link to="appointment-calendar" class="icons" v-if="arrayToObjact(screensPermissions,112)">
                    <CalendarOutlined @click="createAppointment(record.id)" />
                </router-link>
            </a-tooltip>
        </template>
    </a-table>
    <InfiniteLoader v-if="loader" />
</a-col>
</template>

<script>
import {
    ref,
    onMounted,
    computed
} from "vue";
import {
    useStore
} from "vuex";
import {
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
} from "@ant-design/icons-vue";
import {
    messages
} from "@/config/messages";
import {
    warningSwal,
    tableYScroller
} from "@/commonMethods/commonMethod";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
import {
    arrayToObjact
} from "@/commonMethods/commonMethod";
export default {
    name: "TaskTable",
    components: {
        DeleteOutlined,
        EditOutlined,
        CalendarOutlined,
        InfiniteLoader,
    },
    props: {

    },
    setup(props, {
        emit
    }) {
        const store = useStore();

        let data = []
        const meta = store.getters.taskRecords.value;
        const loader = ref(false);
        let scroller = ''
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");
            tableContent.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
                    let current_page = meta.taskMeta.current_page + 1;
                    if (current_page <= meta.taskMeta.total_pages) {
                        scroller = maxScroll
                        data = meta.tasksList
                        loader.value = true;
                        meta.taskMeta = "";
                        store.state.tasks.tasksList = ''

                        store.dispatch("tasksList", "?page=" + current_page + store.getters.searchTable.value + store.getters.orderTable.value.data).then(() => {

                            loadMoredata();
                        });
                    }
                }
            });
        });

        function loadMoredata() {
            const newData = meta.tasksList;

            newData.forEach((element) => {
                data.push(element);
            });

            meta.tasksList = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 50)
            loader.value = false;
        }
        const editTask = (id) => {
            emit("is-Edit", {
                check: true,
                id: id
            });
        };

        function deleteTask(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch("tasksDelete", id);
                    setTimeout(() => {
                        store.state.tasks.tasksList = null
                        store.dispatch("tasksList");
                    }, 2000);
                }
            });
        }
        const tasks = computed(() => {
            return store.state.tasks
        })
       
        const handleTableChange = (pag, filters, sorter) => {
            if (sorter.order) {
                let order = sorter.order == 'ascend' ? 'ASC' : 'DESC'
                let orderParam = '&orderField=' + sorter.field + '&orderBy=' + order
                store.dispatch('orderTable', {
                    data: orderParam,
                    orderBy: order,
                    page: pag,
                    filters: filters
                })
                store.dispatch("tasksList", "?page=" + store.getters.searchTable.value + orderParam)

            } else {
                store.dispatch('orderTable', {
                    data: '&orderField=&orderBy='
                })
                store.dispatch("tasksList", "?page=" + store.getters.searchTable.value + store.getters.orderTable.value.data)
            }
        }
        return {
            screensPermissions:store.getters.screensPermissions,
            tasks,
            arrayToObjact,
            editTask,
            deleteTask,
            loader,
            meta,
            tableYScroller,
            handleTableChange
        };
    },
};
</script>
