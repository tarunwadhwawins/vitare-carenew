<template>
<a-alert class="mb-24" message="Patients are highlighted" type="error" />

<a-table rowKey="id" :columns="communicationColumns" :data-source="meta.communicationsList" :scroll="{ x: 900, y: tableYScroller }" :pagination="false" :rowClassName="(record) => auth.user.id!=record.messageSender && record.isRead==0 ? 'bold':''" @change="handleTableChange">
    <template #from="{ record }" class="custom">
        <span v-if="record.is_sender_patient" class="customTd">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.fromId } }">
                {{record.from}}
            </router-link>
        </span>
        <span v-else>
            <router-link :to="{ name: 'CoordinatorSummary', params: { udid: record.fromId } }">
                {{record.from}}
            </router-link>
        </span>

    </template>
    <template #to="{ record }" class="custom">
        <span v-if="record.is_receiver_patient" class="customTd">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.toId } }">
                {{record.to}}
            </router-link>
        </span>
        <span v-else>
            <router-link :to="{ name: 'CoordinatorSummary', params: { udid: record.toId } }">
                {{record.to}}
            </router-link>
        </span>
    </template>
    <template #resend>
        <a-tooltip placement="bottom">
            <template #title>
                <span>{{ $t("communications.message") }}</span>
            </template>
            <a class="icons">
                <EyeOutlined /></a>
        </a-tooltip>
    </template>
    <!-- <template #patient="{ record }">
        <router-link :to="{ name: 'PatientSummary', params: { udid: record.id } }">
            {{ text.text }}
        </router-link>
    </template>
    <template #staff="{ record }">
        <router-link v-for="staff in record.staff.data" :key="staff.id" to="{ name: 'CoordinatorSummary', params: { udid:staff.uuid?record.staff:'eyrer8758458958495'  }}">
            {{ staff.staff }}
        </router-link>
    </template> -->

    <template #priority="{ record }">
        <a-tooltip placement="right">
            <template #title>{{ $t("common.urgent") }}</template>
            <span class="circleBox" style="background-color: #ff6061" v-if="record.priority == 'Urgent'"></span>
        </a-tooltip>
        <a-tooltip placement="right">
            <template #title>{{ $t("common.medium") }}</template>
            <span class="circleBox" style="background-color: #ffa800" v-if="record.priority == 'Medium'"></span>
        </a-tooltip>
        <a-tooltip placement="right">
            <template #title>{{ $t("common.normal") }}</template>
            <span class="circleBox" style="background-color: #008000" v-if="record.priority == 'Normal'"></span>
        </a-tooltip>
    </template>

    <template #type="{ record }">
        <a-tooltip placement="right">
            <template #title>
                <span>{{ $t("communications.communicationsModal.sms") }}</span>
            </template>
            <a class="icons" v-if="record.type == 'SMS'">
                <CommentOutlined />
            </a>
        </a-tooltip>
        <a-tooltip placement="right">
            <template #title>
                <span>{{ $t("communications.communicationsModal.call") }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Call'">
                <PhoneOutlined />
            </a>
        </a-tooltip>
        <a-tooltip placement="right">
            <template #title>
                <span>{{ $t("communications.communicationsModal.email") }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Email'">
                <MailOutlined />
            </a>
        </a-tooltip>
        <a-tooltip placement="right">
            <template #title>
                <span>{{ $t("communications.communicationsModal.reminder") }}</span>
            </template>
            <a class="icons" v-if="record.type == 'Reminder'">
                <AlertOutlined />
            </a>
        </a-tooltip>
    </template>

    <template #action="{record}">
        <!-- <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t("common.view") }}</span>
        </template>
        <a class="icons">
          <EyeOutlined />
        </a>
      </a-tooltip> -->
        <a-tooltip placement="bottom" v-if="record.type == 'SMS'">
            <template #title>
                <span>{{ $t("common.reply") }}</span>
            </template>
            <a class="icons" @click="showModal(record)">
                <MessageOutlined />
            </a>
        </a-tooltip>
    </template>
</a-table>

<Chat v-model:visible="visible" v-if="communicationId" @ok="handleOk" @is-visible="handleOk" :communication="communicationId" />
</template>

<script>
import {
    ref,

    onMounted
} from "vue";
import {
    useStore
} from "vuex";

import Chat from "@/components/modals/Chat";
import {
    tableYScroller
} from "@/commonMethods/commonMethod";
import {
    EyeOutlined,
    MessageOutlined,
    CommentOutlined,
    PhoneOutlined,
    MailOutlined,
    AlertOutlined,
} from "@ant-design/icons-vue";
export default {
    components: {
        EyeOutlined,
        MessageOutlined,
        CommentOutlined,
        PhoneOutlined,
        MailOutlined,
        AlertOutlined,

        Chat,
    },
    props: {

    },
    setup() {
        const communicationColumns = [{
                title: "From",
                dataIndex: "from",
                key: "from",
                sorter: true,
                slots: {
                    customRender: "from",
                },
            },
            {
                title: "To",
                dataIndex: "to",
                key: "to",
                sorter: true,
                slots: {
                    customRender: "to",
                },
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
                slots: {
                    customRender: "type",
                },
            },
            {
                title: "Priority",
                dataIndex: "priority",
                key: "priority",
                slots: {
                    customRender: "priority",
                },
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category",
                sorter: {
                    compare: (a, b) => a.category - b.category,
                    multiple: 2,
                },
            },
            {
                title: "Date Sent",
                dataIndex: "createdAt",
                key: "createdAt",
                sorter: {
                    compare: (a, b) => a.createdAt - b.createdAt,
                    multiple: 2,
                },
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action",
                slots: {
                    customRender: "action",
                },
            },
        ];
        const store = useStore();
        const communicationId = ref(null)
        const auth = JSON.parse(localStorage.getItem("auth"))
        const meta = store.getters.communicationRecord.value;

        let scroller = ''
        let data = []
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");

            tableContent.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;

                if (currentScroll >= maxScroll) {
                    let current_page = meta.communicationMeta.current_page + 1;

                    if (current_page <= meta.communicationMeta.total_pages) {

                        scroller = maxScroll
                        data = meta.communicationsList
                        meta.communicationMeta = "";
                        store.state.communications.communicationsList = "";

                        store.dispatch("communicationsList", "?page=" + current_page + store.getters.searchTable.value + store.getters.orderTable.value.data)
                            .then(() => {
                                //console.log('response',response)
                                loadMoredata();
                            });
                    }
                }
            });
        });

        function loadMoredata() {
            const newData = meta.communicationsList;

            newData.forEach((element) => {
                data.push(element);
            });
            meta.communicationsList = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 5000)

        }
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
                store.dispatch("communicationsList", "?page=" + store.getters.searchTable.value + orderParam)

            } else {
                store.dispatch('orderTable', {
                    data: '&orderField=&orderBy='
                })
                store.dispatch("communicationsList", "?page=" + store.getters.searchTable.value + store.getters.orderTable.value.data)
            }
        }
        const visible = ref(false);
        const showModal = (e) => {

            communicationId.value = e
            visible.value = true;
        };

        const handleOk = () => {
            visible.value = false;
        };

        return {
            communicationColumns,
            meta,

            visible,
            showModal,
            handleOk,
            communicationId,
            auth,
            tableYScroller,
            handleTableChange
        };
    },
};
</script>

<style>
.customTd {
    display: block;
    background-color: rgb(255 250 96);
    width: 100%;
    height: 100%;
    padding: 7px;
}

.highLight {
    color: red
}
</style>
