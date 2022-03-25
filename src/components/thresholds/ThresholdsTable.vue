<template>
<a-col :sm="24" :xs="24">

    <a-table  rowKey="id" :columns="columns" :data-source="meta.vitalList" :scroll="{ y: 420 }" :pagination=false>
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
 import {  onMounted } from "vue"
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
       

    },
    setup(props, {
        emit
    }) {
        const store = useStore();

        const renderContent = ({
            text
        }) => {
            const obj = {
                children: text,
                props: {
                    colSpan: null
                },
            };

            return obj;
        };

        function editParameter(getRecord) {
            store.dispatch('generalParameterEdit', getRecord.generalparameterId)
            emit('is-edit', {
                check: true,
                id: getRecord.generalparameterId
            })
        }

        function deleteParameter(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch('generalParameterDelete', id.id)
                    setTimeout(() => {
                        store.getters.vitalDataGetters.value.vitalList=''
                        store.dispatch("generalParameterList");
                    }, 2000);
                }
            });
        }
        const columns = [{
                title: "General Parameters Group",
                dataIndex: "meta.vitalList",
                sorter: {
                    compare: (a, b) => a.template - b.template,
                    multiple: 3,
                },
                customRender: ({
                    
                    index
                }) => {
                    //console.log(meta.vitalList[index])
                    const obj = {
                        children: meta.vitalList[index].generalParameterGroup,
                        props: {},
                    };

                    obj.props.rowSpan = meta.vitalList[index].data;
                    return obj;
                },
            },
            {
                title: "Device Type",
                dataIndex: "meta.vitalList",
                sorter: {
                    compare: (a, b) => a.template - b.template,
                    multiple: 3,
                },
                customRender: ({
                    
                    index
                }) => {
                    //console.log(text)
                    const obj = {
                        children: meta.vitalList[index].deviceType,
                        props: {},
                    };

                    obj.props.rowSpan = meta.vitalList[index].data;
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
        
        const meta = store.getters.vitalDataGetters.value
        let data = ''
        let scroller = ''
        onMounted(() => {
            var tableContent = document.querySelector('.ant-table-body')
            tableContent.addEventListener('scroll', (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight
                let currentScroll = event.target.scrollTop + 2
                if (currentScroll >= maxScroll) {
                    
                    let current_page = meta.generalParameterMeta.current_page + 1
                    
                    if (current_page <= meta.generalParameterMeta.total_pages) {
                        scroller = maxScroll
                        data = meta.vitalList
                        store.state.thresholds.generalParameterMeta = ""
                        store.state.thresholds.vitalList= ""
                        store.dispatch("generalParameterList", "?search="+store.getters.searchTable+"&page=" + current_page).then(()=>{
                            loadMoredata()
                        })
                        
                    }
                }
            })
        })

        function loadMoredata() {
            const newData = meta.vitalList
            newData.forEach(element => {
                data.push(element)
            });
            meta.vitalList = data
            var tableContent = document.querySelector('.ant-table-body')

            setTimeout(() => {
                tableContent.scrollTo(0, scroller)
            }, 500)
            
        }
        return {
            deleteParameter,
            editParameter,
            meta,
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
