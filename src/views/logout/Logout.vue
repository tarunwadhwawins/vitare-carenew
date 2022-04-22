<template>
	<div>
	</div>
</template>

<script>
import {onMounted} from "vue"
import {useStore} from "vuex"
export default {
	name: "ViewLogout",
    setup(){
        const store = useStore()
        onMounted(()=>{
            store.dispatch("logoutUser") 
        })
        return{

        }
    }
	
};
</script>