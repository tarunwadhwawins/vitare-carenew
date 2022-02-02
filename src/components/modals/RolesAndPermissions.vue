<template>
  <a-modal max-width="900px" width="80%" title="Create New Role" :footer="null">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
        </a-steps>
        <div class="steps-content" v-if="steps[current].title == 'Select Role'">
          <a-row :gutter="24">
            <a-col :sm="8" :xs="24">
              <div class="roles">
                <h4>Select a Role</h4>
                <div class="radioInput">
                  <a-radio v-model:checked="checked30">Admin</a-radio>
                </div>
                <div class="radioInput">
                  <a-radio v-model:checked="checked1">Manager</a-radio>
                </div>
                <div class="radioInput">
                  <a-radio v-model:checked="checked2">User Admin</a-radio>
                </div>
                <div class="radioInput">
                  <a-radio v-model:checked="checked3">Billing Admin</a-radio>
                </div>
                <div class="radioInput">
                  <a-radio v-model:checked="checked4">Phone System Admin</a-radio>
                </div>
                <div class="radioInput">
                  <a-radio v-model:checked="checked5">Super Admin</a-radio>
                </div>
                <div class="radioInput">
                  <a-radio v-model:checked="checked6">Standard</a-radio>
                </div>
              </div>
            </a-col>
            <a-col :sm="16" :xs="24">
              <div class="description">
                <h4>Description</h4>
                <p>Full system access</p>
                <a-divider />
              </div>
              <div class="description">
                <h4>Permission</h4>
                <p>General</p>
                <p>Overview, Invertory, Billing, Order</p>
                <a-divider />
              </div>
              <div class="description">
                <h4>Apps Access</h4>
                <p>Desktop App</p>
                <p>Mobile App</p>
                <p>Third Party App</p>
                <a-divider />
              </div>
              <div class="description">
                <h4>User Settings</h4>
                <p>Call Handing & Forwarding</p>
                <p>Messages</p>
                <p>Notification</p>
                <p>Outbound Caller ID</p>
                <p>User Info</p>
                <p>Phones & Numbers</p>
                <a-divider />
              </div>
              <div class="description">
                <h4>Features</h4>
                <p>Audit Trail</p>
                <p>Business SMS</p>
                <p>Configure Delegates</p>
                <p>Configure Intercom</p>
                <p>Configure Presence</p>
                <p>Internal SMS</p>
                <a-divider />
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Describe Role'" >
          <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
              <div class="form-group">
                <label>Name</label>
                <a-input v-model="value" size="large" />
              </div>
            </a-col>
            <a-col :sm="24" :xs="24">
              <div class="form-group">
                <label>Description</label>
                <a-textarea v-model:value="value2" placeholder="Descriptiom" allow-clear/>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Permissions'" >
          <a-row :gutter="24">
            <a-col :sm="24" :xs="24">
              <div class="roles">
                <h4><strong>Select Permissions</strong></h4>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked7"><strong>General</strong></a-checkbox>
                  <a-divider />
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked8">Overview</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked9">Invertory</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked10">Order</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked11">Billing</a-checkbox>
                </div>
                <a-divider class="transparent" />
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked12"><strong>App Access</strong></a-checkbox>
                  <a-divider />
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked13">Desktop App</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked14">Mobile App</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked15">Third Party App</a-checkbox>
                </div>
                <a-divider class="transparent" />
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked16"><strong>User Settings</strong></a-checkbox>
                  <a-divider />
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked17">Call Handing & Forwarding</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked18">Messages</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked19">Notification</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked20">Outbound Caller</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked21">User Info</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked22">Phones & Numbers</a-checkbox>
                </div>
                <a-divider class="transparent" />
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked23"><strong>Features</strong></a-checkbox>
                  <a-divider />
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked24">Audit Trail</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked25">Business SMS</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked26">Configure Delegates</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked27">Configure Intercom</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked28">Configure Presence</a-checkbox>
                </div>
                <div class="radioInput">
                  <a-checkbox v-model:checked="checked29">Internal SMS</a-checkbox>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="steps-action">
          <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
          <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
          <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
            Done
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import {  ref } from "vue";
export default {
  setup() {
    const current = ref(0);
    const checked = ref([false]);
    const checked30 = ref(false);
    const checked1 = ref(false);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const checked5 = ref(false);
    const checked6 = ref(false);
    const checked7 = ref(false);
    const checked8 = ref(false);
    const checked9 = ref(false);
    const checked10 = ref(false);
    const checked11 = ref(false);
    const checked12 = ref(false);
    const checked13 = ref(false);
    const checked14 = ref(false);
    const checked15 = ref(false);
    const checked16 = ref(false);
    const checked17 = ref(false);
    const checked18 = ref(false);
    const checked19 = ref(false);
    const checked20 = ref(false);
    const checked21 = ref(false);
    const checked22 = ref(false);
    const checked23 = ref(false);
    const checked24 = ref(false);
    const checked25 = ref(false);
    const checked26 = ref(false);
    const checked27 = ref(false);
    const checked28 = ref(false);
    const checked29 = ref(false);

    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };
    return {
      next,
      prev,
      current,
      checked,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
      checked8,
      checked9,
      checked10,
      checked11,
      checked12,
      checked13,
      checked14,
      checked15,
      checked16,
      checked17,
      checked18,
      checked19,
      checked20,
      checked21,
      checked22,
      checked23,
      checked24,
      checked25,
      checked26,
      checked27,
      checked28,
      checked29,
      checked30,
      steps: [
        {
          title: "Select Role",
          content: "First-content",
        },
        {
          title: "Describe Role",
          content: "Second-content",
        },
        {
          title: "Permissions",
          content: "Second-content",
        },
      ],
    }
  }
}
</script>

<style scoped>
  .steps-content {
    margin-top: 16px;
    border-radius: 6px;
    min-height: 200px;
    text-align: left;
    padding: 12px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .steps-action {
    text-align: right;
  }
</style>