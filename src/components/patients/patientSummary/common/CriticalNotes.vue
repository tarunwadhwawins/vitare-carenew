<template>
	
	<a-list class="critical-notes" style="width:100%" size="small" :data-source="patientCriticalNotes">
		
		<template #renderItem="{item}">
			
			<a-list-item class="critcal-note">
				<Alert v-if="item.criticalNote" :itemId="item.id" :text="item.criticalNote" type="error" :closable="true" />
			</a-list-item>
		</template>
	</a-list>
</template>

<script>
import Alert from "@/components/common/Alert/Alert";
import { computed ,watchEffect} from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
	components: {
    Alert,
	},
	setup() {
		const store = useStore()
		const route = useRoute();
    const patientCriticalNotes = computed(() => {
      return store.state.patients.patientCriticalNotes
    })
	watchEffect(()=>{
	
		store.dispatch('patientCriticalNotes', route.params.udid)
	})

		return {
			patientCriticalNotes,
		}
	}
}
</script>