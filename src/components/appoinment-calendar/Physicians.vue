<template>
    <div class="physicians">
        <a-row :gutter="16">
            <a-col :span="24">
                <div class="phyInner">
                    <h2>Physicians</h2>
                </div>
            </a-col>
            <a-col :span="12">
                <div class="phyInner">
                    <a-avatar :size="80" src="http://ditstekdemo.com/ditstek-care/img/profile-1.jpg" />
                    <span class="checkIcon">
                        <CloseOutlined />
                    </span>
                    <p>Steve Smith</p>
                </div>
            </a-col>
            <a-col :span="12">
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
            </a-col>
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
    <AddPhysician v-model:visible="physicianModal" @ok="handleOk2" />
</template>
<script>
    import { ref } from "vue";
    import { CloseOutlined, PlusOutlined } from "@ant-design/icons-vue";
    import AddPhysician from "@/components/modals/AddPhysician";
    export default {
        components: {
            CloseOutlined,
            PlusOutlined,
            AddPhysician
        },
        setup() {
            const physicianModal = ref(false);
            const showModal2 = () => {

                physicianModal.value = true;
                console.log(physicianModal.value)
            };
            const handleOk2 = () => {
                physicianModal.value = false;
            };
            return {
                showModal2,
                handleOk2,
                physicianModal
            }
        }
    }
</script>