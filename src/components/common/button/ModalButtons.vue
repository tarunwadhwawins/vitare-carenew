<template>
  <div class="steps-action">
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button v-if="!Id" class="modal-button" @click="handleClear()" html-type="reset">{{$t('global.clear')}}</a-button>
      <a-button v-if="Id" class="modal-button" type="primary" html-type="submit">{{$t('global.update')}}</a-button>
      <a-button v-else class="modal-button" type="primary" html-type="submit">{{$t('global.save')}}</a-button>
       <a-button v-show="name=='communication' && Id" class="modal-button" type="primary" html-type="submit">{{$t('global.send')}}</a-button>
    </a-form-item>
  </div>
</template>

<script>
  export default {
    props:{
      Id:String,
      name:String
    },
    setup(props, {emit}) {
      const handleClear = () => {
        emit("is_click")
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