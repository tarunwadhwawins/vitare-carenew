<template>
<a-modal width="45%" title="Message Details" centered :footer="false" :maskClosable="false" zIndex="1060">
    <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <div>
                {{smsDetails.message}}
            </div>

        </a-col>
    </a-row>
    <Loader />
</a-modal>
</template>

<script>
// import { ref } from "vue"
// import { useStore } from "vuex";
// import { dateAndTimeFormate } from "@/commonMethods/commonMethod";
import Loader from '@/components/loader/Loader.vue';
// import RejectAppointment from './RejectAppointment.vue';
import {
    defineComponent,
    computed
} from "vue-demi";
import store from '../../../store';
export default defineComponent({
    name: "AppintmentDetails",
    components: {
        Loader,
        // RejectAppointment:defineAsyncComponent(()=>import("@/components/modals/RejectAppointment.vue"))
    },
    setup() {

        const smsDetails = computed(() => {
            return store.state.communications.showSmsData
        })

        return {
            smsDetails
        };
    },
});
</script>

<style lang="scss" scoped>
.notificationModal {
    width: 100% !important;

    .itemWrapper {
        align-items: flex-start !important;

        .leftWrapper {
            padding: 0 10px 0 0;
            width: 35%;

        }

        .rightWrapper {
            padding: 0 0 0 10px;
            width: 65%;
            text-align: right;
        }
    }
}
</style>
