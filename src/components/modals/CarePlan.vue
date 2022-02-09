<template>
  <a-modal width="1000px" title="Add Goal" centered>
    <a-row :gutter="24">
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Goal</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
            placeholder="Choose Goal"
          >
            <a-select-option value="lucy">Blood Pressure</a-select-option>
            <a-select-option value="Yimidnghe">SPO2</a-select-option>
            <a-select-option value="Yimdsinghe">Walk</a-select-option>
            <a-select-option value="Yimdindghe">Weight</a-select-option>
            <a-select-option value="Yimdinsghe">Medication</a-select-option>
            <a-select-option value="Yimxdinghe">Check up</a-select-option>
          </a-select>
        </div>
      </a-col>
       <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Start Date</label>
          <a-date-picker v-model:value="date1" size="large" style="width: 100%"/>
        </div>
      </a-col>
       <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>End Date</label>
          <a-date-picker v-model:value="date2" size="large" style="width: 100%"/>
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Frequency</label>
          <a-input-number
            size="large"
            :min="1"
            :max="100000"
            v-model:value="value1"
            style="width: 100%"
          />
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group mt-25">
          <a-select
            ref="select"
            v-model:value="value10"
            label-in-value
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Daily </a-select-option>
            <a-select-option value="Yimsidnghe">Week</a-select-option>
            <a-select-option value="Yimddinghe">Fortnight</a-select-option>
            <a-select-option value="Yimfdinghe">Month</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>Duration</label>
          <a-select
            ref="select"
            v-model:value="value11"
            label-in-value
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Any Time </a-select-option>
            <a-select-option value="Yimsidnghe">Specific Time</a-select-option>
            <a-select-option value="Yimddinghe">Time Range</a-select-option>
          </a-select>
        </div>
      </a-col>

      <a-col :sm="8" :xs="24">
        <div class="form-group mt-25">
          <a-select
            ref="select"
            v-model:value="value12"
            label-in-value
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="1">1:00 </a-select-option>
            <a-select-option value="2">2:00 </a-select-option>
            <a-select-option value="3">3:00 </a-select-option>
            <a-select-option value="4">5:00 </a-select-option>
            <a-select-option value="6">6:00 </a-select-option>
            <a-select-option value="7">7:00 </a-select-option>
            <a-select-option value="8">8:00 </a-select-option>
            <a-select-option value="9">9:00 </a-select-option>
            <a-select-option value="10">10:00 </a-select-option>
            <a-select-option value="11">11:00 </a-select-option>
            <a-select-option value="12">12:00 </a-select-option>
            <a-select-option value="13">13:00 </a-select-option>
            <a-select-option value="14">14:00 </a-select-option>
            <a-select-option value="15">15:00 </a-select-option>
            <a-select-option value="16">16:00 </a-select-option>
            <a-select-option value="17">17:00 </a-select-option>
            <a-select-option value="18">18:00 </a-select-option>
            <a-select-option value="19">19:00 </a-select-option>
            <a-select-option value="20">20:00 </a-select-option>
            <a-select-option value="21">21:00 </a-select-option>
            <a-select-option value="22">22:00 </a-select-option>
            <a-select-option value="23">23:00 </a-select-option>
          </a-select>
        </div>
      </a-col>

     
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>From</label>
          <a-select
            ref="select"
            v-model:value="value13"
            label-in-value
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="1">1:00 </a-select-option>
            <a-select-option value="2">2:00 </a-select-option>
            <a-select-option value="3">3:00 </a-select-option>
            <a-select-option value="4">5:00 </a-select-option>
            <a-select-option value="6">6:00 </a-select-option>
            <a-select-option value="7">7:00 </a-select-option>
            <a-select-option value="8">8:00 </a-select-option>
            <a-select-option value="9">9:00 </a-select-option>
            <a-select-option value="10">10:00 </a-select-option>
            <a-select-option value="11">11:00 </a-select-option>
            <a-select-option value="12">12:00 </a-select-option>
            <a-select-option value="13">13:00 </a-select-option>
            <a-select-option value="14">14:00 </a-select-option>
            <a-select-option value="15">15:00 </a-select-option>
            <a-select-option value="16">16:00 </a-select-option>
            <a-select-option value="17">17:00 </a-select-option>
            <a-select-option value="18">18:00 </a-select-option>
            <a-select-option value="19">19:00 </a-select-option>
            <a-select-option value="20">20:00 </a-select-option>
            <a-select-option value="21">21:00 </a-select-option>
            <a-select-option value="22">22:00 </a-select-option>
            <a-select-option value="23">23:00 </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="8" :xs="24">
        <div class="form-group">
          <label>To</label>
          <a-select
            ref="select"
            v-model:value="value14"
            label-in-value
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="1">1:00 </a-select-option>
            <a-select-option value="2">2:00 </a-select-option>
            <a-select-option value="3">3:00 </a-select-option>
            <a-select-option value="4">5:00 </a-select-option>
            <a-select-option value="6">6:00 </a-select-option>
            <a-select-option value="7">7:00 </a-select-option>
            <a-select-option value="8">8:00 </a-select-option>
            <a-select-option value="9">9:00 </a-select-option>
            <a-select-option value="10">10:00 </a-select-option>
            <a-select-option value="11">11:00 </a-select-option>
            <a-select-option value="12">12:00 </a-select-option>
            <a-select-option value="13">13:00 </a-select-option>
            <a-select-option value="14">14:00 </a-select-option>
            <a-select-option value="15">15:00 </a-select-option>
            <a-select-option value="16">16:00 </a-select-option>
            <a-select-option value="17">17:00 </a-select-option>
            <a-select-option value="18">18:00 </a-select-option>
            <a-select-option value="19">19:00 </a-select-option>
            <a-select-option value="20">20:00 </a-select-option>
            <a-select-option value="21">21:00 </a-select-option>
            <a-select-option value="22">22:00 </a-select-option>
            <a-select-option value="23">23:00 </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="24" :xs="24">
        <div class="form-group">
          <label>Note</label>
          <a-textarea
            v-model:value="value2"
            placeholder="Notes"
            :auto-size="{ minRows: 7 }"
          />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {
      size: ref("large"),
      value1: ref(),
      date1: ref(),
      date2: ref(),
      // value10: ref('lucy'),
      value10: ref({
        value: "lucy",
      }),
      value11: ref({
        value: "lucy",
      }),
      value12: ref({
        value: "1",
      }),
      value13: ref({
        value: "1",
      }),
      value14: ref({
        value: "1",
      }),
    };
  },
});
</script>