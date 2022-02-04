<template>
  <div class="steps-action">
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button class="modal-button" @click="handleClear($event)" html-type="reset">{{$t('global.clear')}}</a-button>
      <a-button class="modal-button" type="primary" html-type="submit">{{$t('global.save')}}</a-button>
    </a-form-item>
  </div>
</template>

<script>
  export default {
    setup() {
      const handleClear = (event) => {
        event.target.reset()
      }

      return {
        handleClear
      }
    }
  }
</script>

<style scoped>
  .modal-button {
    margin: 5px;
    padding: 7px 15px 5px 15px;
    height: auto;
    width: 80px;
  }
</style>