<template>
  <a-modal width="50%" :title="$t('global.addCareTeam')" @cancel="onCloseModal()">
    <div class="wide">
      <AddCoordinatorsModal :staffType="staffType" @closeModal="handleOk" />
    </div>
  </a-modal>
</template>

<script>
import AddCoordinatorsModal from "@/components/modals/AddCoordinatorsModal"

export default {
  props: {
    staffType: {
      type: Number
    },
  },
  components: {
    AddCoordinatorsModal,
  },
  setup(props, { emit }) {
    const handleOk = ({modal, value}) => {
      emit("closeModal", {
        modal: modal,
        value: value
      });
    }

    return {
      handleOk
    }
  }
}
</script>

<style>
.wide {
  padding: 30px;
}
</style>