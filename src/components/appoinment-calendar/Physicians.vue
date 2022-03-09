<template>
<div class="physicians">
    <a-row :gutter="16">
        <a-col :span="24">
            <div class="phyInner">
                <h2>Physicians</h2>
            </div>
        </a-col>

        <a-col :span="12" v-for="staff,index in staffList" :key="index">

            <div class="phyInner">

                <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-4.jpg" />
                <span class="checkIcon" @click="removeStaff(staff.id)">
                    <CloseOutlined />
                </span>
                <p>{{staff.fullName}}</p>
            </div>
        </a-col>
        <!-- <a-col :span="12">
                <div class="phyInner">
                    <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-4.jpg" />
                    <span class="checkIcon">
                        <CloseOutlined />
                    </span>
                    <p>Robert Henry</p>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="phyInner">
                    <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-1.jpg" />
                    <span class="checkIcon">
                        <CloseOutlined />
                    </span>
                    <p>Smith Joseph</p>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="phyInner">
                    <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-4.jpg" />
                    <span class="checkIcon">
                        <CloseOutlined />
                    </span>
                    <p>Jane Doe</p>
                </div>
            </a-col> -->
        <a-col :span="12">
            <div class="phyInner" @click="showModal2">
                <a-avatar :size="80" title="Add Physician">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                </a-avatar>
            </div>
        </a-col>
    </a-row>

</div>
<AddPhysician v-model:visible="physicianModal" @ok="handleOk2" @add-staff="addStaff($event)" />
</template>

<script>
import {
    ref
} from "vue";
import {
    CloseOutlined,
    PlusOutlined
} from "@ant-design/icons-vue";
import AddPhysician from "@/components/modals/AddPhysician";
import {
    useStore
} from "vuex"
import { arrayToObjact } from "@/commonMethods/commonMethod"
export default {
    components: {
        CloseOutlined,
        PlusOutlined,
        AddPhysician
    },
    props: {
        physiciansId: {
            type: Array
        },
    },
    setup(props, {
        emit
    }) {
        const store = useStore()
        const physicianModal = ref(false);
        const showModal2 = () => {

            physicianModal.value = true;
            //console.log(physicianModal.value)
        };
        const handleOk2 = () => {
            physicianModal.value = false;
        };
        const staffList = ref([])
       
            console.log(store.getters.appointmentRecords.value.getStaff)
            props.physiciansId.length==0 ? "" : store.getters.appointmentRecords.value.getStaff.map((item) => {
           
                 staffList.value.push(item)
    
        })

 
        //store.getters.appointmentRecords.value.getStaff.map((item, index) => {
        //     if (index <= 2) {
            
        //         staffList.value.push(item)
        //     }
       // })

        const addStaff = (event) => {
               let objact= arrayToObjact(staffList.value,event.data.id) 
               if(!objact){
                    console.log("objact",event.data)
            staffList.value.push(event.data)
            store.getters.appointmentRecords.value.getStaff = staffList.value
            staffAdd()
               }
               physicianModal.value = false;
        }

        function staffAdd() {
            let staffId = []
            staffList.value.map((item) => {  
                    staffId.push(item.id)
            })
            emit('staff-select', staffId)
        }

        function removeStaff(event) {

            staffList.value = staffList.value.filter(function (el) {
                return el.id != event;
            })
            store.getters.appointmentRecords.value.getStaff = staffList.value
            staffAdd()
        }
        return {

            removeStaff,
            staffList,
            showModal2,
            handleOk2,
            physicianModal,
            addStaff
        }
    }
}
</script>
