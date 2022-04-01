<template>
<a-modal max-width="900px" width="90%" :title="editRole ? 'Edit Role' : 'Create New Role'" centered :footer="null" :maskClosable="false" @cancel="closeModal()">
    <a-row :gutter="24">
        <a-col :span="24">

            <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-content" v-if="steps[current].title == 'Select Role' ">
                <a-row :gutter="24">
                    <a-col :sm="8" :xs="24">
                        <div class="roles">
                            <h4>Select a Role</h4>
                            <a-radio-group v-model="role" @change="onRoleChange">
                                <template v-for="role in rolesList" :key="role.id">

                                    <div class="radioInput" v-if="roleId">
                                        <a-radio v-if="roleId === role.udid" v-model:checked="role.udid">{{ role.name }}</a-radio>
                                        <a-radio :value="role.udid" v-else>{{ role.name }}</a-radio>
                                    </div>
                                    <div class="radioInput" v-else>

                                        <a-radio :value="role.udid">{{ role.name}}</a-radio>
                                    </div>
                                </template>
                            </a-radio-group>
                        </div>
                    </a-col>
                    <RolePermissionsList v-if="showList" :roleId="getId" />
                </a-row>
                <div class="steps-action">
                    <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
                    <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
                    <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                        Done
                    </a-button>
                </div>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Describe Role'">
                <a-form :model="addRoleForm" layout="vertical" @finish="submitForm">
                    <a-row :gutter="24">
                        <a-col :sm="24" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('roles.name')" name="name" :rules="[{ required: true, message: $t('roles.name')+' '+$t('global.validation')  }]">
                                    <a-input v-model:value="addRoleForm.name" size="large" />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="24" :xs="24">
                            <div class="form-group">
                                <a-form-item :label="$t('roles.description')" name="description" :rules="[{ required: true, message: $t('roles.description')+' '+$t('global.validation')  }]">
                                    <a-textarea v-model:value="addRoleForm.description" placeholder="Description" allow-clear />
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :sm="24" :xs="24">
                            <div class="steps-action">
                                <a-button v-if="!editRole || !roleId &&  current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
                                <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">Next</a-button>
                                <a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
                                    Done
                                </a-button>
                            </div>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Permissions'">
                <h4><strong>Select Permissions</strong></h4>

                <a-form ref="formRef" :model="addPermissionsForm" @finish="addPermissions" v-if="rolesAndPermissions.rolePermissions.modules">
                    <a-row>
                        <a-col :span="24" v-for="module in rolesAndPermissions.rolePermissions.modules" :key="module.id">
                            <div v-if="module.name=='mobile'">
                            </div>

                            <a-card v-else :title="module.name">
                                <div class="screens" v-for="screen in module.screens" :key="screen.moduleId">
                                    <a-checkbox v-model:checked="addPermissionsForm.screen[screen.moduleId]" @change="checkAll(screen.actions,screen.moduleId)"><strong>{{ screen.name }}</strong></a-checkbox>
                                    <a-divider class="transparent" />
                                    <a-checkbox class="actions" v-for="action in screen.actions" :key="action.id" v-model:checked="addPermissionsForm.action[action.id]" @change="checkStatus(action.id,screen.moduleId,screen.actions)">{{ action.name }}</a-checkbox>
                                    <a-divider class="transparent" />
                                </div>
                            </a-card>
                            <a-divider class="transparent" />

                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">Next</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" html-type="submit">Done</a-button>
                    </div>
                </a-form>
            </div>
            <div class="steps-content" v-if="steps[current].title == 'Dashboard Widgets'">
                <h4><strong>Select Widgets</strong></h4>

                <a-form ref="formRef2" :model="dashboardPermission" @finish="dashboardForm" v-if="rolesAndPermissions.dashboardWidget">
                    <a-row>
                        <a-col :span="24">

                            <div class="screens" v-for="widget in rolesAndPermissions.dashboardWidget" :key="widget.id">
                                <a-checkbox v-model:checked="dashboardPermission.widget[widget.id]"><strong>{{ widget.widgetName }}</strong></a-checkbox>

                            </div>

                            <a-divider class="transparent" />
                        </a-col>
                    </a-row>
                    <div class="steps-action">
                        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev">Previous</a-button>
                        <a-button v-if="current < steps.length - 1" type="primary" html-type="submit">Next</a-button>
                        <a-button v-if="current == steps.length - 1" type="primary" html-type="submit">Done</a-button>
                    </div>
                </a-form>
            </div>
        </a-col>
        <Loader />
    </a-row>
</a-modal>
</template>

<script>
import {
    reactive,
    ref,
    watchEffect
} from "vue";
import {
    useStore
} from "vuex"
import RolePermissionsList from "@/components/administration/rolesAndPermissions/RolePermissionsList"
// import rolePermissions from "@/data/permissions.json"
// import StepperButtons from "@/components/common/button/StepperButtons"
import Loader from "./../loader/Loader"
import {
    warningSwal
} from "./../../commonMethods/commonMethod"
import {
    messages
} from "./../../config/messages";
//import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
//import ModalButtons from "@/components/common/button/ModalButtons";
export default {
    components: {
        RolePermissionsList,
        // StepperButtons,
        Loader
    },
    props: {
        roleId: {
            type: String
        },
        editRole: {
            type: String
        }
    },
    setup(props, {
        emit
    }) {
        const store = useStore();
        const current = ref(0);
        const getId = ref(null);

        const showList = ref(false);
        const checkedValue = ref(true);

        const rolesAndPermissions = store.getters.rolesAndPermissionsRecord.value
        const formRef = ref()
        const formRef2 = ref()
        const addRoleForm = reactive({
            name: '',
            description: ''
        })

        const addPermissionsForm = reactive({
            action: [],
            screen: []
        })
        const dashboardPermission = reactive({
            widget: []
        })
        const rolesList = rolesAndPermissions.rolesList

        const onRoleChange = (event) => {
            getId.value = event.target.value;
            showList.value = true;
            store.dispatch('editPermissions', event.target.value).then(() => {
                copyPermission()

            })
        }
        getId.value = props.editRole ? reactive(props.editRole) : reactive(props.roleId)
        getId.value ? current.value++ : ''
        watchEffect(() => {
            store.dispatch('rolePermissions')
            store.dispatch('dashboardWidget')
            if (props.editRole) {

                Object.assign(addRoleForm, rolesAndPermissions.roleDetails ? rolesAndPermissions.roleDetails : '')
                if (rolesAndPermissions.editRolesAndPermissions) {
                    copyPermission()

                }

            } else if (props.roleId) {

                store.dispatch('editdWidget', props.roleId)
                store.dispatch('editPermissions', props.roleId).then(() => {
                    copyPermission()

                })

            }
        })
        ///role submit
        const submitForm = () => {

            let getRoleId = props.editRole ? reactive(props.editRole) : rolesAndPermissions.addRole ? rolesAndPermissions.addRole.udid : ""

            if (getRoleId) {

                store.dispatch('UpdateRole', {
                    data: {
                        ...addRoleForm
                    },
                    id: getRoleId,
                    show: false
                })
            } else {
                store.dispatch('addRole', addRoleForm)
            }
            store.state.rolesAndPermissions.rolesList = ""
            store.dispatch('rolesList')
            current.value++;
        }
        //permission submit
        const addPermissions = () => {
            let action = []
            let check = ''
            addPermissionsForm.action.forEach(function (Element, i) {
                if (Element) {
                    action.push(i);
                    check = Element
                }
            });
            if (props.editRole) {
                store.dispatch("addPermissions", {
                    data: {
                        actions: action
                    },
                    id: props.editRole,
                    check: check
                })
            } else {
                let udid = rolesAndPermissions.addRole.udid
                store.dispatch("addPermissions", {
                    data: {
                        actions: action
                    },
                    id: udid,
                    check: check
                })
            }
            current.value++;

        }
        //dasboard widgets
        const dashboardForm = () => {
            let widget = []
            let check = ''

            dashboardPermission.widget.forEach(function (Element, i) {
                if (Element) {
                    widget.push(i);
                    check = Element
                }
            });
            if (props.editRole) {
                store.dispatch("addDashboardWidget", {
                    data: {
                        widgets: widget
                    },
                    id: props.editRole,
                    check: check
                })
            } else {
                let udid = rolesAndPermissions.addRole.udid
                store.dispatch("addDashboardWidget", {
                    data: {
                        widgets: widget
                    },
                    id: udid,
                    check: check
                })
            }
            reset();
            rolesAndPermissions.addRole = ''
            emit('on-submit')
            emit("is-visible", false);
        }

        function copyPermission() {
            rolesAndPermissions.editRolesAndPermissions.forEach((Element) => {
                Element.screen.forEach((screenElement) => {
                    screenElement.forEach((getData) => {
                        getData.action ? getData.action.forEach((action) => {
                            action.forEach((getAction) => {
                                addPermissionsForm.action[getAction.id] = true
                            })
                        }) : ""
                    })
                })

            })
            rolesAndPermissions.editWidget ? rolesAndPermissions.editWidget.forEach((Element) => {
                dashboardPermission.widget[Element.id] = true
            }) : ''

        }

        function checkAll(actions, value) {
            actions.map((item) => {
                addPermissionsForm.screen[value] == true ? addPermissionsForm.action[item.id] = true : addPermissionsForm.action[item.id] = false
            })
        }

        function checkStatus(actions, value, check) {
            let checkBox = false
            check.forEach((item) => {
                addPermissionsForm.action[item.id] == true ? checkBox = true : checkBox = false
            })
            checkBox ? addPermissionsForm.screen[value] = true : addPermissionsForm.screen[value] = false
            //addPermissionsForm.action[actions] == true ? "" : addPermissionsForm.screen[value] = false
        }
        const form = reactive({
            ...addRoleForm,
        });
        const formSecond = reactive({
            ...addPermissionsForm,
        });
        const formThird = reactive({
            ...dashboardPermission,
        });

        function closeModal() {
            if (addRoleForm.name != "" || addRoleForm.description != "" || addPermissionsForm.action != "" || addPermissionsForm.screen != "") {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        reset()
                        emit("is-visible", false);
                    } else {
                        emit("is-visible", true);
                    }
                });
            }
        }

        function reset() {
            //formRef.value.resetFields();
            //formRef2.value.resetFields()
            Object.assign(addRoleForm, form)
            Object.assign(addPermissionsForm, formSecond)
            Object.assign(dashboardPermission, formThird)
            // props.editRole = null
            //props.roleId = null

        }
        const next = () => {
            current.value++;
        }

        const prev = () => {
            current.value--;
        }

        return {
            rolesAndPermissions,
            addRoleForm,
            addPermissionsForm,
            submitForm,
            addPermissions,
            getId,
            rolesList,
            showList,
            onRoleChange,
            next,
            prev,
            current,
            checkedValue,
            closeModal,
            formRef,
            formRef2,
            checkAll,
            checkStatus,
            dashboardForm,
            dashboardPermission,
            steps: [{
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
                {
                    title: "Dashboard Widgets",
                    content: "Third-content",
                }
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
</style><style scoped>
.actions {
    margin-left: 30px;
    display: block;
}

.transparent {
    margin: 5px 0 !important;
}
</style>
