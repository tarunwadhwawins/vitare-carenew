<template>
	
	<a-alert @close="onCloseAlert(itemId)" v-if="closable" :message="text" :type="type" closable/>
	<a-alert @close="onCloseAlert(itemId)" v-else :message="text" :type="type"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
export default {
	props: {
		text: {
			type: String
		},
		type: {
			type: String
		},
		closable: {
			type: Boolean
		},
		itemId: {
			type: Number
		},
	},
	setup() {
		const store = useStore()
		const route = useRoute()
		
		const onCloseAlert = (value) => {

			const data = {
				patientUdid: route.params.udid,
				criticalNoteUdid: value,
			}
			
			store.dispatch('readCriticalNote', data).then(() => {
				document.querySelectorAll('.critical-notes ul li')[0].remove();
				//;
			});
			store.state.patients.patientCriticalNotes=''
			store.dispatch('patientCriticalNotes', route.params.udid)
		}

		return {
			onCloseAlert
		}
	}
}
</script>

<style>
	.ant-alert { width: 100%; }
</style>