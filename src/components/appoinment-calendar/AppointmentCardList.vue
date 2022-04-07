<template>
<a-dropdown v-if="count <= 3" :trigger="['click']" overlayClassName="valueItem">
    <a class="ant-dropdown-link one" @click.prevent>
        <div class="dropdown">
            <p>
                <strong><span>{{cardRecords.appointmentType}}</span></strong>
                <span>{{cardRecords.patient}} </span>
                <!-- <span>{{ moment(dateFormat(cardRecords.date)).format('hh:mm A') +' '+ moment(dateFormat(cardRecords.date)).add(2,'hours').format('hh:mm A')}}</span>  -->

            </p>
            <img src="../../assets/images/profile-1.jpg" alt="image" />
        </div>
    </a>
    <template #overlay>
        <a-menu>
            <a-menu-item key="1">
                <div class="calendarDropdown">
                    <div class="itemWrapper">
                        <div class="leftWrapper">Appointment Type</div>
                        <div class="rightWrapper">{{cardRecords.appointmentType}}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Date Time</div>
                        <div class="rightWrapper">
                            {{ dateAndTimeFormate(cardRecords.date,'MMM DD, yyyy hh:mm A')}}

                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Coordinator</div>
                        <div class="rightWrapper">
                            <router-link :to="'/coordinator-summary/'+cardRecords.staff_id">{{cardRecords.staff}}</router-link>
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Patient</div>
                        <div class="rightWrapper">
                            <router-link :to="'/patients-summary/'+cardRecords.patient_id">{{cardRecords.patient}}</router-link>
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Start Time</div>
                        <div class="rightWrapper">{{ dateAndTimeFormate(cardRecords.date,'hh:mm A') }}</div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Duration</div>
                        <div class="rightWrapper">{{ cardRecords.duration }}</div>
                    </div>
                    <div class="notesWrapper">
                        <span>Notes</span>
                        <p>
                            {{cardRecords.notes}}
                        </p>
                    </div>
                    <div class="createTask">
                        <a-tooltip placement="left">
                            <template #title>
                                <span>Add Task</span>
                            </template>
                            <router-link to="tasks">
                                <FileAddOutlined />
                            </router-link>
                        </a-tooltip>
                    </div>
                </div>
            </a-menu-item>
        </a-menu>
    </template>
</a-dropdown>
<div v-else-if="count==4">

    <a-button class="loadMore" type="primary" @click="showModal(allRecord)">{{length-4}}+</a-button>
</div>
<div v-else></div>
<a-modal width="1100px" centered v-model:visible="visible" title="Appointment" @ok="handleOk" maskClosable="true" @cancel="closeModal()">

    <a-table rowKey="id" :columns="columns" :data-source="getMoreAppointment">

    </a-table>
</a-modal>
</template>

<script>
import {
    ref,
    reactive,
    computed
} from "vue"
import {
    FileAddOutlined
} from "@ant-design/icons-vue";
import {

    dateAndTimeFormate
} from "../../commonMethods/commonMethod"

import {
    useStore
} from "vuex"
const columns = [{
        title: 'Appointment Type',
        dataIndex: 'appointmentType',
        key: 'appointmentType',
    }, {
        title: 'Care Coodinator',
        dataIndex: 'staff',
        key: 'staff',

    }, {
        title: 'Patient',
        dataIndex: 'patient',
        key: 'patient',

    }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        customRender: ({
            record
        }) => {
            return dateAndTimeFormate(record.date, 'MMM DD, yyyy');
        },
    }, {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',

    },
    {
        title: 'Start Time',
        dataIndex: 'date',
        customRender: ({
            record
        }) => {

            return dateAndTimeFormate(record.date, 'hh:mm A');
        },
    }, {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        ellipsis: true,
    },
];
export default {

    components: {
        FileAddOutlined
    },
    props: {
        cardData: {
            type: Object
        },
        count: {
            type: Number
        },
        length: {
            type: Number
        },
        tabName: {
            type: String,
        },
        data: {
            type: Array,
        }
    },
    setup(props) {
        const visible = ref(false);
        const store = useStore()
        const allRecord = reactive(props.data)
        const cardRecords = reactive(props.cardData)
        const tab = reactive(props.tabName)

        function showModal(appointmentRecord) {
            //appointment show after 4 records
            store.dispatch('showMoreRecords', {
                data: appointmentRecord,
                to: 4
            })
            visible.value = true;
        }
        const getMoreAppointment = computed(() => {
            return store.state.appointment.showMoreRecords
        })

        function closeModal() {
            store.state.appointment.showMoreRecords = ''
        }
        return {
            visible,
            getMoreAppointment,
            allRecord,
            tab,
            showModal,
            cardRecords,

            columns,
            closeModal,
            dateAndTimeFormate

        }
    }
}
</script>
