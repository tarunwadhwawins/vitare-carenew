<template>
  <div class="filter">
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        <FilterOutlined /> {{$t('global.filter')}}
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <div class="checkbox">
              <a-checkbox v-model:checked="checked1">Urgent</a-checkbox>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="checkbox">
              <a-checkbox v-model:checked="checked2">High</a-checkbox>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="checkbox">
              <a-checkbox v-model:checked="checked3">Normal</a-checkbox>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>