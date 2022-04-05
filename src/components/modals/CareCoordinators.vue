<template>
  <a-modal width="80%" :title="$t('global.addCareTeam')" @cancel="onCloseModal()">
    <AddCoordinatorsModal :staffType="staffType" />
    <CoordinatorsListingTable :staffType="staffType" />
  </a-modal>
</template>

<script>
import CoordinatorsListingTable from "@/components/modals/CoordinatorsListingTable"
import AddCoordinatorsModal from "@/components/modals/AddCoordinatorsModal"

export default {
  props: {
    staffType: {
      type: Number
    },
  },
  components: {
    CoordinatorsListingTable,
    AddCoordinatorsModal,
  },
}
</script>