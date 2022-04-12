<template>
  <a-modal title="Crop Image" width="50%" @cancel="closeModal">
    <div class="cropperContainer" >
      <Cropper :src="imageUrl" @change="change" class="circle-stencil" :stencil-props="{ aspectRatio: 9/9 }" />
    </div>
    <a-button class="modal-button" type="primary" html-type="submit" @click="cropImage">{{$t('global.save')}}</a-button>
  </a-modal>
</template>

<script>
import { ref } from 'vue-demi'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
export default {
  components: {
    Cropper,
  },
  props: {
    imageUrl: {
      type: String
    },
  },
  setup(props, { emit }) {
    const imgCoordinates = ref()
    const imgCanvas = ref()

    const change = ({ coordinates, canvas }) => {
      imgCoordinates.value = coordinates
      imgCanvas.value = canvas
		}

    const cropImage = () => {
      const canvas = imgCanvas.value
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var newImg = document.createElement('img')
        newImg.onload = function() {
          URL.revokeObjectURL(url);
        };
        newImg.src = url;

        emit("crop", {
          image: newImg,
          dataURL: canvas.toDataURL()
        })
        emit('closeModal')
      });
    }

    return {
      cropImage,
      change
    }
  }
}
</script>

<style scoped>
.cropperContainer {
  margin: auto;
  background-color: #d9d9d9;
}

.cropperControls {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
.ant-modal-content .ant-modal-footer { display: none !important; }
</style>