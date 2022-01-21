<template>
  <a-col :xl="6" :sm="8" :xs="12">
    <div :class="className">
      <h4>{{ heading }}</h4>
      <div class="filter">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <FilterOutlined /> {{$t('global.filter')}}
          </a>
          <template #overlay>
            <a-menu>
              <CompletedTasksFilter :filterCount="filterCount"/>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <h5>{{ count }}</h5>
      <p>{{$t('global.taskCount')}}</p>
    </div>
  </a-col>
</template>

<script>
import {
  FilterOutlined,
} from "@ant-design/icons-vue";
import CompletedTasksFilter from "@/components/tasks/cardsFilters/CompletedTasks";
export default {
  components: {
    FilterOutlined,
    CompletedTasksFilter,
  },
  props: {
    filterCount: {
      type: Array
    },
    count: {
      type: String
    },
    className: {
      type: String
    },
    heading: {
      type: String
    },
  },
  setup() {
    return {

    }
  }
}
</script>