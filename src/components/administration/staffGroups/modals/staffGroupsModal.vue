<template>
  <a-modal width="80%" title="Staff Group" centered :footer="false"  :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
      <a-col :span="24" >
        <a-steps v-model:current="current" @change="scrollToTop($event)" >
          <a-step v-for="item in steps" :key="item.title" :title="item.title" ><span :id="item"></span></a-step>
        </a-steps>

        <!-- Group Form -->
        <div class="steps-content" v-if="steps[current].title == 'Group'">
          <CreateGroupModal />
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
            <a-button v-if="current < steps.length - 1" @click="scrollToTop(current)" type="primary">{{$t('global.next')}}</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
              {{$t('global.save')}}
            </a-button>
          </div>
        </div>

        <!-- Group Staff Form -->
        <div class="steps-content" v-if="steps[current].title == 'Staff'">
          <ManageGroupStaffModal />
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
            <a-button v-if="current < steps.length - 1" @click="scrollToTop(current)" type="primary">{{$t('global.next')}}</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
              {{$t('global.save')}}
            </a-button>
          </div>
        </div>

        <!-- Group Programs Form -->
        <div class="steps-content" v-if="steps[current].title == 'Programs'">
          <ManageGroupProgramsModal />
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
            <a-button v-if="current < steps.length - 1" @click="scrollToTop(current)" type="primary">{{$t('global.next')}}</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
              {{$t('global.save')}}
            </a-button>
          </div>
        </div>

        <!-- Group Providers Form -->
        <div class="steps-content" v-if="steps[current].title == 'Providers'">
          <ManageGroupProvidersModal />
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
            <a-button v-if="current < steps.length - 1" @click="scrollToTop(current)" type="primary">{{$t('global.next')}}</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
              {{$t('global.save')}}
            </a-button>
          </div>
        </div>

        <!-- Group Permissions Form -->
        <div class="steps-content" v-if="steps[current].title == 'Permissions'">
          <ManageGroupPermissionsModal />
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">{{$t('global.previous')}}</a-button>
            <a-button v-if="current < steps.length - 1" @click="scrollToTop(current)" type="primary">{{$t('global.next')}}</a-button>
            <a-button v-if="current == steps.length - 1" type="primary" @click="saveModal()">
              {{$t('global.save')}}
            </a-button>
          </div>
        </div>

      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  components: {
    CreateGroupModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/CreateGroupModal")),
    ManageGroupStaffModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupStaffModal")),
    ManageGroupProgramsModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupProgramsModal")),
    ManageGroupProvidersModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupProvidersModal")),
    ManageGroupPermissionsModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupPermissionsModal")),
  },
  setup() {
    const store = useStore()
    const current= computed({
      get: () =>
        store.state.patients.counter,
      set: (value) => {
        store.state.patients.counter = value;
      },
    })

		const steps = [
			{
				title: "Group",
				key: "group",
				content: "First-content",
			},
			{
				title: "Staff",
				key: "staff",
				content: "Second-content",
			},
			{
				title: "Programs",
				key: "programs",
				content: "Third-content",
			},
			{
				title: "Providers",
				key: "providers",
				content: "Fourth-content",
			},
			{
				title: "Permissions",
				key: "permissions",
				content: "Fifth-content",
			},
		]

    return {
      steps,
      current,
    }
  }
}
</script>