<template>
	<a-modal width="800px" v-if="gmailData" :title="gmailData ? 'Subject: ' :'Subject: '+ gmailData.subject" centered  class="chatModal" :footer="false">
		<div :level="5">Message: <span>{{gmailData ?  gmailData.message : ''}}</span></div>
		<TableLoader />
	</a-modal>
</template>
    
<script>
import {
	useStore
} from "vuex"
import TableLoader from "@/components/loader/TableLoader";

export default {
	components: {
		TableLoader
	},
	setup() {
		const store = useStore()

		return {
			gmailData:store.getters.communicationsView
		};
	},
};
</script>
    