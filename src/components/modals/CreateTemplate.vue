<template>
<a-modal width="100%" title="Physician Orders for Life-Sustaining Treatment (POLST)" centered :footer="null">

       <a-row :gutter="16">
                        <a-col :span="24">
                            <h2 class="pageTittle">Create Template</h2>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <div class="form-group">
                                <label> Template Name</label>
                                <a-input v-model="value" size="large" placeholder="Enter Template Name" />
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="form-group">
                                <label>Template Type</label>
                                <a-select ref="select" v-model:value="value1" style="width: 100%" @focus="focus" @change="handleChange" placeholder="Choose Type" size="large">
                                    <a-select-option value="Intake">Intake</a-select-option>
                                    <a-select-option value="Screening">Screening</a-select-option>
                                    <a-select-option value="Assessment">Assessment</a-select-option>
                                    <a-select-option value="Care Plan">Care Plan</a-select-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <div class="text-right mt-28">
                                <a-button class="btn primaryBtn" v-if="!update" @click="showModal">Save</a-button>
                                <a-button class="btn primaryBtn" v-else @click="showModal">Update</a-button>
                            </div>
                        </a-col>
                    </a-row>
    
</a-modal>

<!--modals-->

<!---->
</template>

  
<script>
import {
    
    defineComponent
} from "vue";

export default defineComponent({
   props:{
       update:Boolean
   },

    setup() {
       

    },
});
</script>
