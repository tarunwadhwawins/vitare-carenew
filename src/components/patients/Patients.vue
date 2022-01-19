<template>
<a-row>
  <a-col :span="24">
    <ShowModalButton @isVisible="showModal($event)" :headingText="$t('patient.patients')" :buttonText="$t('patient.addNewPatients')"  />
  </a-col>
</a-row>
<a-row>
    <a-col :span="24">
        <a-row :gutter="24">
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox red" :count="5" :text="$t('patient.critical')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox orangeBg" :count="10" :text="$t('patient.trending')"  />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox greenBg" :count="15" :text="$t('patient.WNL')"  />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox yellowBg" :count="8" :text="$t('patient.watchList')"  />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox blue" :count="6" :text="$t('patient.messages')"  />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox whiteBg" :count="12" :text="$t('patient.escalations')"  />
            </a-col>
        </a-row>
    </a-col>
</a-row>
<a-row>
    <a-col :span="12">
        <a-select v-model:value="value2" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange">
        </a-select>
    </a-col>
    <a-col :span="12">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24">
        <DataTable :columns="columns" :data-source="data" :scroll="{ x: 1024 }" @change="onChange" />
    </a-col>
</a-row>

<!--modal-->
<PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
<!--end-->
</template>

<script>
import {
    ref
} from "vue";
import PatientsModal from "@/components/modals/PatientsModal";

import CounterCard from "./counter-card/CounterCard.vue"
import ShowModalButton from "./show-modal-button/ShowModalButton"
import DataTable from "./data-table/DataTable.vue"
const columns = [{
        title: "Flags",
        dataIndex: "flags",
        slots: {
            customRender: "flags",
        },
    },
    {
        title: "Name",
        dataIndex: "firstName",
        slots: {
            customRender: "firstName",
        },
        sorter: {
            compare: (a, b) => a.reading - b.reading,
            multiple: 1,
        },
    },
    // {
    //   title: "Last Name",
    //   dataIndex: "lastName",
    //   slots: {
    //     customRender: "lastName",
    //   },
    // },
    {
        title: "Last Reading Date",
        dataIndex: "reading",
        sorter: {
            compare: (a, b) => a.reading - b.reading,
            multiple: 1,
        },
    },
    // {
    //   title: "Last Name",
    //   dataIndex: "lastName",
    //   slots: {
    //     customRender: "lastName",
    //   },
    // },
    {
        title: "Last Reading Values",
        dataIndex: "readingvalues",
        sorter: {
            compare: (a, b) => a.readingvalues - b.readingvalues,
            multiple: 1,
        },
        slots: {
            customRender: "lastReadingValues",
        },
        children: [{
                title: "BP",
                dataIndex: "bp",
                key: "bp",
            },
            {
                title: "Sp02",
                dataIndex: "sp02",
                key: "sp02",
            },
            {
                title: "Glucose",
                dataIndex: "glucose",
                key: "glucose",
            },
            {
                title: "Weight",
                dataIndex: "weight",
                key: "weight",
            },
        ],
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    //   sorter: {
    //     compare: (a, b) => a.age - b.age,
    //     multiple: 3,
    //   },
    // },
    // {
    //   title: "Sex",
    //   dataIndex: "sex",
    //   sorter: {
    //     compare: (a, b) => a.sex - b.sex,
    //     multiple: 2,
    //   },
    // },

    {
        title: "Non Compliance",
        dataIndex: "compliance",
        sorter: {
            compare: (a, b) => a.reading - b.reading,
            multiple: 1,
        },
        filters: [{
                text: "Flag",
                value: "flag",
            },
            {
                text: "Name",
                value: "name",
            },
            {
                text: "Last Reading Date",
                value: "readdate",
            },
            {
                text: "Last Reading Value",
                value: "readvalue",
            },
            {
                text: "Non Compliance ",
                value: "noncompliance",
            },
            {
                text: "Last Message Seen",
                value: "messagseen",
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    //   sorter: {
    //     compare: (a, b) => a.age - b.age,
    //     multiple: 3,
    //   },
    // },
    // {
    //   title: "Sex",
    //   dataIndex: "sex",
    //   sorter: {
    //     compare: (a, b) => a.sex - b.sex,
    //     multiple: 2,
    //   },
    // },

    {
        title: "Non Compliance",
        dataIndex: "compliance",
        sorter: {
            compare: (a, b) => a.compliance - b.compliance,
            multiple: 1,
        },
        slots: {
            customRender: "compliance",
        },
    },
    {
        title: "Last Message Sent",
        dataIndex: "message",
        sorter: {
            compare: (a, b) => a.message - b.message,
            multiple: 1,
        },
        filters: [{
                text: "Flag",
                value: "flag",
            },
            {
                text: "Name",
                value: "name",
            },
            {
                text: "Last Reading Date",
                value: "readdate",
            },
            {
                text: "Last Reading Value",
                value: "readvalue",
            },
            {
                text: "Non Compliance ",
                value: "noncompliance",
            },
            {
                text: "Last Message Seen",
                value: "messagseen",
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
];
const data = [{
        key: "1",
        flags: "redBgColor",
        firstName: "Jane Doe",
        // lastName: "Doe",
        // age: "85",
        // sex: "male",
        reading: "5 months ago",
        compliance: "",
        message: "5 months ago",
        readingvalues: "",
        sp02: "	95%",
        bp: "115/81",
        weight: "189.2",
        glucose: "80",
    },
    {
        key: "2",
        flags: "purpleBgColor",
        firstName: "Steve Smith",
        // lastName: "Smith",
        // age: "78",
        // sex: "Female",
        reading: "15 days ago",
        compliance: "",
        message: "2 months ago",
        readingvalues: "",
        sp02: "-",
        bp: "105/81",
        weight: "-",
        glucose: "70",
    },
    {
        key: "3",
        flags: "blueBgColor yellowBgColor ",
        firstName: "Joseph Spouse",
        // lastName: "Spouse",
        // age: "72",
        // sex: "male",
        reading: "2 months ago",
        compliance: "",
        message: "4 months ago",
        readingvalues: "",
        sp02: "-",
        bp: "-",
        weight: "-",
        glucose: "75",
    },
    {
        key: "4",
        flags: "greenBgColor",
        firstName: "Robert Henry",
        // lastName: "Henry",
        // age: "79",
        // sex: "Female",
        reading: "4 months ago",
        compliance: "",
        message: "15 days ago",
        readingvalues: "",
        sp02: "92%",
        bp: "-",
        weight: "181.2",
        glucose: "-",
    },
];
export default {
    name: "Patients",
    components: {
        PatientsModal,
        // UserOutlined,
        // WarningOutlined,
        CounterCard,
        ShowModalButton,
        DataTable
    },

    setup() {
        const PatientsModal = ref(false);
        const showModal = (value) => {
            PatientsModal.value = value;
        };
        const handleOk = (e) => {
            console.log(e);
            PatientsModal.value = false;
        };
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const searchoptions = ref([{
                value: "Jane Doe",
                label: "Jane Doe",
            },
            {
                value: "Steve Smith",
                label: "Steve Smith",
            },
            {
                value: "Joseph Spouse",
                label: "Joseph Spouse",
            },
            {
                value: "Robert Henry",
                label: "Robert Henry",
            },
        ]);
        return {
            PatientsModal,
            showModal,
            handleOk,
            data,
            columns,
            handleChange,
            searchoptions,
            size: ref([]),
        };
    },
};
</script>
