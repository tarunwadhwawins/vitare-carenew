<template>
  <div class="patientImg" >
    <div class="patientImgInner">
    <div class="image-section" v-if="hideEditIcon==false">
      <img v-if="isPicuteLoading" class="picture-loader" src="@/assets/images/loader.gif" />
      <img v-if="patientDetails.profilePhoto && !isPicuteLoading" class="ant-upload-text" :src="patientDetails.profilePhoto" alt="image"/>
      <img v-else-if="imageUrl && !isPicuteLoading" :src="imageUrl" alt="avatar" class="ant-upload-text" />
      <img v-else-if="!isPicuteLoading" src="@/assets/images/userAvatar.png" alt="image"/>
    </div>

    <div class="button-section" v-if="hideEditIcon==false">
      <a-upload :show-upload-list="false" @change="handleChange" >
        <div class="button-details">
          <a class="edit-button">
            <span class="edit-icon">
              <EditOutlined />
            </span>
            <span class="edit-text">
              Change Image
            </span>
            </a>
        </div>
      </a-upload>
    </div>
    </div>
    <div class="image-section" v-if="hideEditIcon==true">
      <img v-if="patientDetails.profilePhoto" class="ant-upload-text" :src="patientDetails.profilePhoto" alt="image"/>
    </div>

    <div class="info">
      <span v-if="patientDetails.patientFullName">
        <p v-if="isLeft == true">Name: {{ patientDetails.patientFullName }}</p>
        <h2 v-else>{{ patientDetails.patientFullName }}</h2>
      </span>
      <p v-if="patientDetails.patientDob">DOB : {{ patientDetails.patientDob }}</p>
      <p v-if="patientDetails.medicalRecordNumber">MRN : {{ patientDetails.medicalRecordNumber }}</p>
      <p v-if="patientDetails.email"><a @click="actionTrack(paramsId,321,'patient')" v-if="arrayToObjact(screensPermissions, 321)" href="mailto:{{patientDetails.email}}"><MailOutlined /> {{ patientDetails.email }}</a></p>
      <p v-if="patientDetails.phoneNumber"><a @click="actionTrack(paramsId,322,'patient')" v-if="arrayToObjact(screensPermissions, 322)" href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a></p>
      <p v-if="patientDetails.address"><HomeOutlined/> <span class="address-text">{{ patientDetails.address }}</span></p>
    </div>
    <a-tooltip placement="top">
        <template #title>
          <span>Reset Password</span>
        </template>
        <a class="resetPass">
          <KeyIcon height="16" width="16" alt="Reset Password" @click="resetPasseord(patientDetails.id)"/>
      <!-- <KeyOutlined @click="resetPasseord(patientDetails.id)" /> -->
       <!-- <img src="@/assets/images/key.svg" height="16" width="16" alt="Reset Password" @click="resetPasseord(record.id)"> -->
    </a>
    </a-tooltip>

    <a-tooltip placement="top" class="editIcon">
        <template #title>
          <span>Edit</span>
        </template>
        <a>
      <EditOutlined  @click="editPatient({udid: patientDetails.id, id: patientDetails.id});actionTrack(paramsId,301,'patient')" v-if="isLeft == true && (arrayToObjact(screensPermissions, 301) || arrayToObjact(screensPermissions, 63))"/>
    </a>
    </a-tooltip>
    
    
   <!-- <ResetPassword v-model:visible="resetPasswordVisible" @saveModal="saveModal($event)" endPoint="patient" :id="patientDetails.id"/> -->
  </div>
  <ImageCropper v-if="modalVisible" v-model:visible="modalVisible" :imageUrl="imageinCropper" @closeModal="closeImageModal" @crop="updateProfileImage" />
</template>

<script>
import {
  ref,
  defineAsyncComponent,
  computed,
  defineComponent
} from 'vue-demi';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  // KeyOutlined
} from "@ant-design/icons-vue";
import {
  actionTrack,
  arrayToObjact
} from '@/commonMethods/commonMethod';
// import ResetPassword from "@/components/reset-password/modal/ResetPassword";
import { messages } from "@/config/messages";
import { warningSwal } from "@/commonMethods/commonMethod";
import KeyIcon from "@/components/common/KeyIcon";
export default defineComponent({
  props: {
    isLeft: {
      type: Boolean
    },
    hideEditIcon:Boolean,
    patientUdid:Number
  },
  components: {
    // ResetPassword:defineAsyncComponent(()=>import("@/components/reset-password/modal/ResetPassword")),
    // KeyOutlined,
    KeyIcon,
    MailOutlined,
    EditOutlined,
    PhoneOutlined,
    HomeOutlined,
    ImageCropper: defineAsyncComponent(()=>import("@/components/common/ImageCropper")),
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const modalVisible = ref(false);
    const resetPasswordVisible = ref(false);
    const patientId = props.patientUdid ? props.patientUdid : route.params.udid

    const isPicuteLoading = computed(() => {
      return store.state.patients.isPicuteLoading
    })

    const editPatient = ({udid, id}) => {
      emit('onEditPatient', {udid, id})
    };
    
    const patientDetails = computed(() => {
      return store.state.patients.patientDetails
    })

    const imageinCropper = ref('');
    const imageUrl = ref('');
    const fileName = ref('');

    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    const handleChange = info => {
      store.commit('uploadFile', null)
      store.commit('errorMsg', null)
      fileName.value = info.file.name
      getBase64(info.file.originFileObj, base64Url => {
        imageinCropper.value = base64Url;
      });
      modalVisible.value = true;
    };

    const updateProfileImage = (dataURL) => {
      var file = dataURLtoFile(dataURL, fileName.value);
      let formData = new FormData();
      formData.append("file", file);

      store.dispatch("updateProfileImage", {
        formData: formData,
        patientUdid: patientId,
      }).then(() => {
        store.dispatch("patientDetails", patientId).then(() => {
          imageUrl.value = patientDetails.value.profilePhoto
          console.log('profilePhoto 2', patientDetails.value.profilePhoto)
          store.commit('uploadFile', null)
          store.commit('errorMsg', null)
          store.commit('loadingStatus', false)
        })
        setTimeout(() => {
          store.commit('isPicuteLoading', false)
        }, 2500);
      })
    }

     function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
          
      while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }

    const closeImageModal = () => {
      modalVisible.value = false;
    }

    const resetPasseord = (id) => {
    warningSwal(messages.resetPassword).then((response) => {
          if (response == true) {
            store.dispatch("passwordReset", {endPoint:'patient',id:id})
          } else {
            // emit("saveModal", true);
          }
        });
    
};


    const saveModal = (value) =>{
      resetPasswordVisible.value = value
    }

    return {
      saveModal,
      resetPasseord,
      resetPasswordVisible,
      screensPermissions:store.getters.screensPermissions,
      paramsId:patientId,
      imageinCropper,
      imageUrl,
      handleChange,
      modalVisible,
      updateProfileImage,
      closeImageModal,
      arrayToObjact,
      actionTrack,
      editPatient,
      patientDetails,
      isPicuteLoading,
    }
  }
});
</script>

<style scoped>
.resetPass{
  
    position: absolute;
    right: 45px;
    top: 16px;
}
.resetPass img {
    width: 18px!important;
    height: auto!important;
    margin: 0!important;
    border-radius: 0!important;
}

/* .info {
  margin-left: 40px;
} */
/* .patientInfo .patientImg {
  padding: 30px !important
} */
span.anticon.anticon-plus {
  position: relative;
  top: -2px;
}

/* .image-section {
  position: absolute;
  top: 25px;
} */

/* .button-section {
  position: relative;
  top: 70px;
} */

.button-details {
  position: relative !important;
  top: 0;
}

span.edit-icon {
  position: relative;
  top: -1px;
  font-size: 12px;
}

/* .header .button-details { */
  /* position: relative !important; */
  /* top: 70px !important; */
  /* left: -91px !important; */
/* } */

/* .header .button-section {
  position: relative !important;
  top: 50px !important;
  left: -91px !important;
} */
/* .header .image-section {
  left: 20px !important;
  position: relative !important;
  top: -10px !important;
} */
/* .callRightWrapper .header .patientInfo .patientImg .info {
  margin-left: -50px !important;
} */
/* .callRightWrapper .header .patientInfo .patientImg {
  padding: 30px !important;
} */

/* .container {
  padding: 1em 0;
  float: left;
  width: 50%;
}
.container .title {
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 10px;
} */

/* .content {
  margin: 0 auto;
  position: relative;
} */

/* .content {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  margin: 0 15px 0 0;
}

.content .content-overlay {
  background: rgba(0,0,0,0.7);
  position: absolute;
  left: 15px;
  top: 21px;
  bottom: 0;
  right: 0;
  opacity: 0;
  -webkit-transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;

  width: 130px;
  height: 130px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  margin: 0 15px 0 0;
}

.content:hover .content-overlay {
  opacity: 1;
}

.content:hover {
  cursor: pointer;
}

.content-details {
  position: relative;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.content:hover .content-details {
  top: 50%;
  left: 50%;
  opacity: 1;
}

.content-details h3 {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.15em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
  font-size: 12px;
}

.content-details p {
  color: #fff;
  font-size: 0.8em;
}

.fadeIn-bottom {
  top: -62px !important;
  position: relative;
  width: 200px;
  left: 66px !important;
} */
</style>