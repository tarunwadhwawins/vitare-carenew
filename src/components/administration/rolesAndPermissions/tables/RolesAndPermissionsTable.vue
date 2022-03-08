<template>
  <a-table  rowKey="id"

    :columns="rolesColumns"
    :data-source="rolesList.rolesList" >
    <template #actions="{record}" v-if="arrayToObjact(roleAndPermissions,2)">
        <a-tooltip placement="bottom" >
            <template #title>
                <span>Edit</span>
            </template>
            <a class="icons" @click="editRole(record.udid)">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" v-if="arrayToObjact(roleAndPermissions,3)">
            <template #title>
                <span>Delete</span>
            </template>
            <a class="icons" @click="deleteRole(record.udid)">
                <DeleteOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom">
            <template #title>
                <span>Copy</span>
            </template>
            <a class="icons" @click="copyRole(record.udid)">
                <CopyOutlined /></a>
        </a-tooltip>
    </template>
    <template #status="{record}" v-if="arrayToObjact(roleAndPermissions,4)">
        <a-switch v-model:checked="record.status" @change="UpdateRoleStatus(record.udid, $event)" />
    </template>
</a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {  watchEffect,computed } from 'vue';
import {warningSwal,arrayToObjact} from "@/commonMethods/commonMethod";
import { messages } from '../../../../config/messages';
export default {
    components: {
        DeleteOutlined,
        EditOutlined,
        CopyOutlined,
    },
    props:{},
    setup(props,{emit}) {
        const store = useStore()

        watchEffect(() => {
            store.dispatch('rolesList')
        })

        const rolesList = store.getters.rolesAndPermissionsRecord.value

        const editRole = (id) => {
            store.dispatch('roleDetails', id)
            store.dispatch('editPermissions',id)
            store.dispatch('editdWidget', id)
            emit("is-edit",{check:true,id:id})
        }

        const deleteRole = (id) => {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {
                    store.dispatch('deleteRole', id).then(() => {
                        store.dispatch('rolesList')
                    })
                }
            })
        }

        const copyRole = (id) => {
            store.dispatch('roleDetails', id)
emit("is-copy",{check:true,id:id})
        }

        const UpdateRoleStatus = (id, status) => {
            //console.log("id",id)
            const data = {
                "status": status
            };
            store.dispatch('UpdateRole', {
                id,
                data
            }).then(() => {
                //store.dispatch('rolesList')
            })
        }

        const rolesColumns = [{
                title: "Role Name",
                dataIndex: "name",
                sorter: {
                    compare: (a, b) => a.name - b.name,
                    multiple: 3,
                },
            },
            {
                title: "Type of Role ",
                dataIndex: "roleType",
                sorter: {
                    compare: (a, b) => a.roleType - b.roleType,
                    multiple: 3,
                },
            },
            {
                title: "Description",
                dataIndex: "description",
                sorter: {
                    compare: (a, b) => a.description - b.description,
                    multiple: 3,
                },
            },
            {
                title: "Active/Inactive",
                dataIndex: "status",
                slots: {
                    customRender: "status",
                },
            },
            {
                title: "Actions",
                dataIndex: "actions",
                slots: {
                    customRender: "actions",
                },
            },
        ];

        const roleAndPermissions = computed(()=>{
            return store.state.screenPermissions.roleAndPermissions
        })
        return {
            arrayToObjact,
            roleAndPermissions,
            rolesColumns,
            rolesList,
            editRole,
            deleteRole,
            copyRole,
            UpdateRoleStatus,
        }
    }
}
</script>
