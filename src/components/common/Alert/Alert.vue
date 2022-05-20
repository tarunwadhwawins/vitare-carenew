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
		patientUdid: {
			type: Number
		},
	},
	setup(props) {
		const store = useStore()
		const route = useRoute()
		const patientId = props.patientUdid ? props.patientUdid : route.params.udid
		
		const onCloseAlert = (value) => {

			const data = {
				patientUdid: patientId,
				criticalNoteUdid: value,
			}
			
			store.dispatch('readCriticalNote', data).then(() => {
				document.querySelectorAll('.critical-notes ul li')[0].remove();
			});
			store.state.patients.patientCriticalNotes=''
			store.dispatch('patientCriticalNotes', patientId)
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