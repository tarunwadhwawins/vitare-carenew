<template>
  <a-modal width="80%" :title="$t('global.addCareTeam')" @cancel="onCloseModal()">
    <div class="wide">
      <AddCoordinatorsModal :staffType="staffType" />
    </div>
    <div class="wide">
      <CoordinatorsListingTable :staffType="staffType" />
    </div>
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

<style>
.wide {
  padding: 30px;
}
</style>