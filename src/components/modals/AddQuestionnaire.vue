<template>
<a-modal width="100%" title="Add Questionnaire" centered>
    <template #footer>
        <a-button key="back" class="btn secondaryBtn" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" class="btn primaryBtn" @click="handleOk">Save</a-button>
    </template>
    <div class="questionnaireMain">
        <a-row :gutter="24">
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label>Question</label>
                    <a-input v-model:value="value" placeholder="Enter Question" style="width: 100%" size="large" />
                </div>
            </a-col>
            <a-col :sm="12" :xs="24">
                <div class="form-group">
                    <label>Type</label>
                    <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Select Type">
                        <a-select-option value="lucy">Single Choice</a-select-option>
                        <a-select-option value="Yiminghe">Multiple Choice</a-select-option>
                        <a-select-option value="Yiminghe1">Textbox</a-select-option>
                    </a-select>
                </div>
            </a-col>
            <a-col :span="24">
                <div class="form-group">
                    <label> Tags</label>
                    <a-select ref="select" v-model:value="value1" style="width: 100%" @focus="focus" @change="handleChange" mode="tags" size="large" placeholder="Select Tags">
                        <a-select-option value="Tag1">Tag 1</a-select-option>
                        <a-select-option value="Tag2">Tag 2</a-select-option>
                        <a-select-option value="Tag3">Tag 3</a-select-option>
                        <a-select-option value="Tag4">Tag 4</a-select-option>
                        <a-select-option value="Tag5">Tag 5</a-select-option>
                        <a-select-option value="Tag6">Tag 6</a-select-option>
                    </a-select>
                </div>
            </a-col>
            <a-col :sm="24" class="mt-25">
                <a-row :gutter="16">
                    <a-col :span="1">
                        <a-checkbox class="singleChoice" v-model:checked="checked21">
                        </a-checkbox>
                    </a-col>
                    <a-col :span="7">
                        <a-input v-model:value="value" placeholder="Label" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :sm="5" :xs="24">
                        <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Program  Type" mode="multiple">
                            <a-select-option value="lucy">RPM</a-select-option>
                            <a-select-option value="Yiminghse">TCM</a-select-option>
                            <a-select-option value="Yiminghe">BHI</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="RPM Score" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="TCM Score" style="width: 100%" size="large" />
                    </a-col>
                </a-row>
            </a-col>
            <a-col :sm="24" class="mt-25">
                <a-row :gutter="16">
                    <a-col :span="1">
                        <a-checkbox class="singleChoice" v-model:checked="checked22">
                        </a-checkbox>
                    </a-col>
                    <a-col :span="7">
                        <a-input v-model:value="value" placeholder="Label" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :sm="5" :xs="24">
                        <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Program  Type" mode="multiple">
                            <a-select-option value="lucy">RPM</a-select-option>
                            <a-select-option value="Yiminghse">TCM</a-select-option>
                            <a-select-option value="Yiminghe">BHI</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="RPM Score" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="TCM Score" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="BHI Score" style="width: 100%" size="large" />
                    </a-col>
                </a-row>
            </a-col>
            <a-col :sm="24" class="mt-25">
                <a-row :gutter="16">
                    <a-col :span="1">
                        <a-checkbox class="singleChoice" v-model:checked="checked23">
                        </a-checkbox>
                    </a-col>
                    <a-col :span="7">
                        <a-input v-model:value="value" placeholder="Label" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :sm="5" :xs="24">
                        <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange" placeholder="Program  Type" mode="multiple">
                            <a-select-option value="lucy">RPM</a-select-option>
                            <a-select-option value="Yiminghse">TCM</a-select-option>
                            <a-select-option value="Yiminghe">BHI</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="RPM Score" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="TCM Score" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :span="3">
                        <a-input v-model:value="value" placeholder="BHI Score" style="width: 100%" size="large" />
                    </a-col>
                    <a-col :span="2" class="text-right">
                        <a-button type="primary" size="large">
                            <template #icon>
                                <PlusOutlined />
                            </template>
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :sm="24" :xs="24" class="text-right mt-25">
                <a-button class="btn blueBtn">Save</a-button>
            </a-col>
        </a-row>
    </div>
</a-modal>
</template>

  
<script>
import {
    
    ref
} from "vue";
import {
    PlusOutlined
} from "@ant-design/icons-vue";
export default {
    components: {
        PlusOutlined,
    },
    setup() {
        const activeKey = ref(["1"]);
        const toggle = ref(true);
        return {
            value1: ref(),
            value2: ref(),
            size: ref("large"),
            checked1: ref(false),
            checked2: ref(false),
            checked3: ref(false),
            checked4: ref(false),
            checked5: ref(false),
            checked6: ref(false),
            checked7: ref(false),
            checked8: ref(true),
            checked9: ref(false),
            checked10: ref(false),
            checked21: ref(false),
            checked22: ref(false),
            checked23: ref(false),
            activeKey,
            toggle,
        };
    },
};
</script>
