<template>
<div class="filter" v-if="timeLineCustomButton && Buttons">
    <a-button v-for="item in timeLineCustomButton" :key="item.id" @click="showButton(item.id)" :class="Buttons.globalCodeId== item.id ? 'active' : ''"> {{item.name}}</a-button>
</div>
</template>

<script>
import { watchEffect, ref } from 'vue-demi'
import { useStore } from 'vuex'
export default {
    props: {
        Buttons: {
            type: Object,
            required: true
        },
        timeline:Array,
        buttonCommit:String,
        custom: Boolean,
        commit: String

    },
    setup(props, {
        emit
    }) {
        //const router = useRouter()
        //const store = useStore()
        const store = useStore()
        const timeLineCustomButton = ref([])
        watchEffect(() => {

            if (store.getters.timeline.value) {

                if (props.custom) {
                    timeLineCustomButton.value = store.getters.timeline.value
                    let findIndex = timeLineCustomButton.value.findIndex(a => a.id === 126)

                    if (findIndex == -1) {
                        timeLineCustomButton.value.push({
                            "id": 126,
                            "globalCodeCategoryId": 46,
                            "globalCodeCategory": "Timeline",
                            "name": "Custom",
                            "description": "Timeline",
                            "isActive": 1,
                            "predefined": 1,
                            "usedCount": 0
                        })
                    }
                } else {
                    timeLineCustomButton.value = store.getters.timeline.value
                    const findIndex = timeLineCustomButton.value.findIndex(a => a.id === 126)

                    findIndex !== -1 && timeLineCustomButton.value.splice(findIndex, 1)

                }
            }
        })

        function showButton(id) {
            if (id == 126) {

                store.commit(props.commit,{
                    "globalCodeId": "126",
                    "conditions": "-",
                    "number": "6",
                    "intervalType": "day",
                    "startDate": "2022-05-31",
                    "endDate": "2022-05-25"
                })
                emit("clickButtons", id)
            } else {

                store.dispatch("timeLine", {
                    id: id,
                    commit: props.commit
                }).then(() => {

                    emit("clickButtons", id)
                })
            }

        }

        return {
            showButton,
            timeLineCustomButton
        }
    }
}
</script>
