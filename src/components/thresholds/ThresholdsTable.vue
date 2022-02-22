<template>

  <a-col :sm="24" :xs="24">
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 900 }" @change="onChange">
      <template #actions="text">
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{$t('global.edit')}}</span>
          </template>
          <a class="icons" @click="editParameter(text.record)">
            <EditOutlined />
          </a>
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{$t('global.delete')}}</span>
          </template>
          <a class="icons" @click="deleteParameter(text.record)">
            <DeleteOutlined />
          </a>
        </a-tooltip>
      </template>
      <template #active="key">
        <a-switch v-model:checked="checked[key.record.key]" />
      </template>
    </a-table>
   
  </a-col>
</template>

<script>
  import { reactive } from "vue"
  import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
  import { warningSwal } from "@/commonMethods/commonMethod";
  import { messages } from "@/config/messages";
 
  import { useStore } from "vuex";
  export default {
    components: {
      DeleteOutlined,
      EditOutlined,
    
    },
    props: {
      thresholdsData: {
        type: Array,
      },

    },
    setup(props,{emit}) {
      const store = useStore();
      const renderContent = ({ text }) => {
        const obj = {
          children: text,
          props: { colSpan: null },
        };

        return obj;
      };
      function editParameter(getRecord) {
        store.dispatch('generalParameterEdit',getRecord.generalparameterId)
        emit('is-edit',{check:true,id:getRecord.generalparameterId})
      }
      function deleteParameter(id) {
        warningSwal(messages.deleteWarning).then((response) => {
          if (response == true) {
            store.dispatch('generalParameterDelete', id.id)
            setTimeout(() => {
              store.state.thresholds.vitalList = ''
              store.dispatch("generalParameterList");
            }, 2000);
          }
        });

      }
      const columns = [
        {
          title: "General Parameters Group",
          dataIndex: "data",
          sorter: {
            compare: (a, b) => a.template - b.template,
            multiple: 3,
          },
          customRender: ({ text, index }) => {
            const obj = {
              children: data[index].generalParameterGroup,
              props: {},
            };

            obj.props.rowSpan = text;
            return obj;
          },
        },
        {
          title: "Device Type",
          dataIndex: "data",
          sorter: {
            compare: (a, b) => a.template - b.template,
            multiple: 3,
          },
          customRender: ({ text, index }) => {
            const obj = {
              children: data[index].deviceType,
              props: {},
            };

            obj.props.rowSpan = text;
            return obj;
          },
        },
        {
          title: "Type",
          dataIndex: "vitalFieldName",
          sorter: {
            compare: (a, b) => a.template - b.template,
            multiple: 3,
          },
          customRender: renderContent,
        },
        {
          title: "High Limit ",
          dataIndex: "highLimit",
          sorter: {
            compare: (a, b) => a.template - b.template,
            multiple: 3,
          },
          customRender: renderContent,
        },
        {
          title: "Low Limit ",
          dataIndex: "lowLimit",
          sorter: {
            compare: (a, b) => a.template - b.template,
            multiple: 3,
          },
          customRender: renderContent,
        },

        {
          title: "Actions",
          dataIndex: "actions",
          slots: {
            customRender: "actions",
          },
        },
      ];
      const data = reactive(props.thresholdsData)




      return {
        deleteParameter,
        editParameter,
        data,
        columns,

      }
    }
  }
</script>
<style>
  .common-card {
    min-height: 335px !important;
  }
</style>