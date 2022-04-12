<template>
  <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="after-image" />
    <div>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
  <ImageCropper v-if="modalVisible" v-model:visible="modalVisible" :imageUrl="imageUrl" @closeModal="closeModal" @crop="onCrop" />
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  components: {
    ImageCropper: defineAsyncComponent(()=>import("@/components/common/ImageCropper")),
  },

  setup() {
    const imageUrl = ref('');
    const modalVisible = ref(false);

    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    const handleChange = info => {
      getBase64(info.file.originFileObj, base64Url => {
        imageUrl.value = base64Url;
      });
      modalVisible.value = true;
    };

    const onCrop = (image) => {
      console.log('image', image)
      imageUrl.value = image.src;
    }

    const closeModal = () => {
      modalVisible.value = false;
    }

    return {
      imageUrl,
      handleChange,
      modalVisible,
      onCrop,
      closeModal,
    };
  },

});
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>