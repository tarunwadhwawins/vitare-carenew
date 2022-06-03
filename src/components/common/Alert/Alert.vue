<template>
	<a-alert @close="onCloseAlert(itemId)" v-if="closable" :message="text" :type="type" closable/>
	<a-alert @close="onCloseAlert(itemId)" v-else :message="text" :type="type"/>
</template>

<script>

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
		
		const onCloseAlert = () => {
			document.querySelectorAll('.critical-notes ul li')[0].remove();
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