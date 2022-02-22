<template>

  <a-col :sm="24" :xs="24">

    <a-table ref="table" :columns="columns" :data-source="data" :scroll="{ y: 200 }" :pagination=false>
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
  import { ref,reactive } from "vue"
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
      const table=ref()
      //
      

    //   onMounted(()=>{
    //     let datarecord =[{ "id": "5b1e1b99-f37c-4135-8f2f-c398d121a8f9", "generalParameterGroup": "test", "vitalFieldName": "Systolic", "vitalFieldId": 1, "highLimit": 78, "lowLimit": 78, "generalparameterId": "2ea2f602-bb68-40e3-aa0d-1f70264b42b8", "deviceType": "Blood Pressure", "key": 0, "data": 3 }, 
    //     { "id": "edfb0085-d9ea-41b0-b667-05e51fb81b4e", "generalParameterGroup": "test", "vitalFieldName": "Diastolic", "vitalFieldId": 2, "highLimit": 98, "lowLimit": 56, "generalparameterId": "2ea2f602-bb68-40e3-aa0d-1f70264b42b8", "deviceType": "Blood Pressure", "key": 1, "data": 0 },
    //      { "id": "4d036f71-5ee9-43fa-96c8-76fdd4956a31", "generalParameterGroup": "test", "vitalFieldName": "BPM", "vitalFieldId": 3, "highLimit": 89, "lowLimit": 45, "generalparameterId": "2ea2f602-bb68-40e3-aa0d-1f70264b42b8", "deviceType": "Blood Pressure", "key": 2, "data": 0 }, 
    //     { "id": "6ac50fd7-f93b-4885-b57d-f8acb92a7bf9", "generalParameterGroup": "group seventyry", "vitalFieldName": "Fasting Blood Sugar", "vitalFieldId": 5, "highLimit": 89, "lowLimit": 56, "generalparameterId": "f6740aae-1890-45aa-ac24-7949f0f68606", "deviceType": "Glucose", "key": 0, "data": 2 },
    //      { "id": "e4f1f396-25aa-427f-8109-b02dc32ec37c", "generalParameterGroup": "group seventyry", "vitalFieldName": "Random Blood Sugar", "vitalFieldId": 6, "highLimit": 90, "lowLimit": 56, "generalparameterId": "f6740aae-1890-45aa-ac24-7949f0f68606", "deviceType": "Glucose", "key": 1, "data": 0 }, 
    //      { "id": "8cd61068-b255-4d1e-bf5e-0d08153ed023", "generalParameterGroup": "Group three", "vitalFieldName": "Systolic", "vitalFieldId": 1, "highLimit": 78, "lowLimit": 56, "generalparameterId": "2ae3379b-495b-46ca-9466-2b202b679bc8", "deviceType": "Blood Pressure", "key": 0, "data": 3 }, 
    //      { "id": "af7620de-257b-4f0f-b8ef-fe49351fb939", "generalParameterGroup": "Group three", "vitalFieldName": "Diastolic", "vitalFieldId": 2, "highLimit": 67, "lowLimit": 45, "generalparameterId": "2ae3379b-495b-46ca-9466-2b202b679bc8", "deviceType": "Blood Pressure", "key": 1, "data": 0 }, 
    //      { "id": "57de0e08-4540-4503-a4bf-bfaed2ea17c1", "generalParameterGroup": "Group three", "vitalFieldName": "BPM", "vitalFieldId": 3, "highLimit": 89, "lowLimit": 67, "generalparameterId": "2ae3379b-495b-46ca-9466-2b202b679bc8", "deviceType": "Blood Pressure", "key": 2, "data": 0 }, 
    //      { "id": "875148d7-2d30-4358-8847-eae61b258818", "generalParameterGroup": "GroupTwo", "vitalFieldName": "Fasting Blood Sugar", "vitalFieldId": 5, "highLimit": 80, "lowLimit": 34, "generalparameterId": "c7e99a6b-165d-47bd-950e-04e4c5a9d5f6", "deviceType": "Glucose", "key": 0, "data": 2 }, 
    //   ]
    //     var tableContent = document.querySelector('.ant-table-body')
    //       tableContent.addEventListener('scroll', (event) => {
    //   console.log('yes, I am listening')
    //   let maxScroll = event.target.scrollHeight - event.target.clientHeight
    //   let currentScroll = event.target.scrollTop+5
    //   console.log("tableContent",currentScroll)
    //   if (currentScroll >=maxScroll) {
    //     datarecord.forEach(element=>{ 
    //       data.push(element) 
    //      })
        
        
       
         
    //   }
    // })
     
        
    //   })
  


      return {
        table,
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