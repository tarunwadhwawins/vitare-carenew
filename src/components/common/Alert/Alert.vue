<template>
	<a-alert @close="onCloseAlert(itemId)" v-if="closable" :message="text" :type="type" closable/>
	<a-alert @close="onCloseAlert(itemId)" v-else :message="text" :type="type"/>
</template>

<script>

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
	setup() {
		const store = useStore()
		
		const onCloseAlert = (value) => {
			console.log(value)
			document.querySelectorAll('.critical-notes ul li')[0].remove();
			store.state.patients.patientCriticalNotes=''
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