<template>
<div class="filter" v-if="timeline && Buttons">
    <a-button v-for="item in timeline" :key="item.id" @click="showButton(item.id)" :class="Buttons.globalCodeId== item.id ? 'active' : ''"> {{item.name}}</a-button>
</div>
</template>

<script>
//import { useRouter } from 'vue-router'
//import { useStore } from 'vuex'
export default {
    props: {
        Buttons: {
            type: Object,
            required: true
        },
        timeline: {
            type: Array,
            required: true,
        },

    },
    setup(props, {
        emit
    }) {
        //const router = useRouter()
        //const store = useStore()
        function showButton(id) {
            emit("clickButtons", id)
        }

        return {
            showButton,
        }
    }
}
</script>
