<template>
  <a-modal v-model:visible="visible" width="1000px" title="View Referral" centered @ok="handleOk" @cancel="onCloseModal()">
   <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
            <div class="form-group">
                <div class="calendarDropdown notificationModal">
                    <div class="itemWrapper">
                        <div class="leftWrapper">Name</div>
                        <div class="rightWrapper"></div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Phone Number</div>
                        <div class="rightWrapper">
                            
                        </div>
                    </div>
                    <div class="itemWrapper">
                        <div class="leftWrapper">Designation</div>
                        <div class="rightWrapper">
                            
                        </div>
                    </div>
                    

                </div>

            </div>
        </a-col>
       
    </a-row>
    
    <Loader />
  </a-modal>
</template>
<script>
import { defineComponent} from "vue";
import Loader from '@/components/loader/Loader.vue';
export default defineComponent({
  components: {
   Loader
  },
  props: {
    
  },
  setup() {
   

    return {
      
    };
  },
});
</script>
