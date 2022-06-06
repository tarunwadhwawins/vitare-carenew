<template>
  <Card v-for="item in totalPatients" :key="item.count" :count="item.total" :text='item.text' link="Patients with filter" :xl="grid.xlGrid" :color="item.color" :sm="grid.smGrid" :textColor="item.textColor">
  </Card>
</template>

<script>
import { watchEffect } from 'vue-demi'
import { useStore } from 'vuex'
import Card from "@/components/common/cards/Card"
export default {
  components: {
    Card,
  },
  setup() {
    const store = useStore()
    let dateFormat = {
      fromDate: '',
      toDate: ''
    }
    watchEffect(() => {
      store.dispatch("counterCard", dateFormat)
    })

    return {
      totalPatients: store.getters.totalPatientcount,
      grid: store.getters.grid,
    }
  }
}
</script>