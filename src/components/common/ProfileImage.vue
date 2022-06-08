<template>
  <div v-bind:class="patientSection">
    <div class="patientSectionInner">
      <div v-bind:class="patientImg">
        <div class="patientImgInner">
          <div class="image-section" v-if="hideEditIcon == false">
            <img
              v-if="isPicuteLoading"
              class="picture-loader"
              src="@/assets/images/loader.gif"
            />
            <img
              v-if="patientDetails.profilePhoto && !isPicuteLoading"
              class="ant-upload-text"
              :src="patientDetails.profilePhoto"
              alt="image"
            />
            <img
              v-else-if="imageUrl && !isPicuteLoading"
              :src="imageUrl"
              alt="avatar"
              class="ant-upload-text"
            />
            <img
              v-else-if="!isPicuteLoading"
              src="@/assets/images/userAvatar.png"
              alt="image"
            />
          </div>

          <div class="button-section" v-if="hideEditIcon == false">
            <a-upload :show-upload-list="false" @change="handleChange">
              <div class="button-details">
                <a class="edit-button">
                  <span class="edit-icon">
                    <EditOutlined />
                  </span>
                  <span class="edit-text"> Change Image </span>
                </a>
              </div>
            </a-upload>
          </div>
        </div>
        <div class="image-section" v-if="hideEditIcon == true">
          <img
            v-if="patientDetails.profilePhoto"
            class="ant-upload-text"
            :src="patientDetails.profilePhoto"
            alt="image"
          />
        </div>
      </div>

      <div v-bind:class="patientInfo">
        <div class="info">
          <span v-if="patientDetails.patientFullName">
            <p v-if="isLeft == true">
              Name: {{ patientDetails.patientFullName }}
            </p>
            <h2 v-else>{{ patientDetails.patientFullName }}</h2>
          </span>
          <p v-if="patientDetails.patientDob">
            DOB : {{ patientDetails.patientDob }}
          </p>
          <p v-if="patientDetails.medicalRecordNumber">
            MRN : {{ patientDetails.medicalRecordNumber }}
          </p>
          <p style="overflow-wrap: anywhere;" v-if="patientDetails.email">
            <a
              @click="actionTrack(paramsId, 321, 'patient')"
              v-if="arrayToObjact(screensPermissions, 321)"
              href="mailto:{{patientDetails.email}}"
              ><MailOutlined /> {{ patientDetails.email }}</a
            >
          </p>
          <p v-if="patientDetails.phoneNumber">
            <a
              @click="actionTrack(paramsId, 322, 'patient')"
              v-if="arrayToObjact(screensPermissions, 322)"
              href="tel:{{patientDetails.phoneNumber}}"
              ><PhoneOutlined :rotate="90" />
              {{ patientDetails.phoneNumber }}</a
            >
          </p>
          <p v-if="patientDetails.address">
            <HomeOutlined />
            <span class="address-text">{{ patientDetails.address }}</span>
          </p>
        </div>
      </div>

      <div v-bind:class="patientIcons">
        <a-tooltip placement="top">
          <template #title>
            <span>Reset Password</span>
          </template>
          <a class="resetPass">
            <KeyIcon
              alt="Reset Password"
              @click="resetPasseord(patientDetails.id)"
            />
          </a>
        </a-tooltip>
        <a-tooltip placement="top" class="editIcon">
          <template #title>
            <span>Edit</span>
          </template>
          <a>
            <EditOutlined
              @click="
                editPatient({ udid: patientDetails.id, id: patientDetails.id });
                actionTrack(paramsId, 301, 'patient');
              "
              v-if="
                isLeft == true &&
                (arrayToObjact(screensPermissions, 301) ||
                  arrayToObjact(screensPermissions, 63))
              "
            />
          </a>
        </a-tooltip>
      </div>
    </div>
    <div class="buttonGroup"
      v-if="programsPatient && programsPatient.length > 0"
      v-bind:class="patientPrograms"
    >
      <div class="patientPrograms">
        <span
          class="programText"
          v-for="program in programsPatient"
          :key="program.id"
        >
          {{ program }}
        </span>
      </div>
    </div>
  </div>

  <ImageCropper
    v-if="modalVisible"
    v-model:visible="modalVisible"
    :imageUrl="imageinCropper"
    @closeModal="closeImageModal"
    @crop="updateProfileImage"
  />
</template>

<script>
import { ref, defineAsyncComponent, computed, defineComponent } from "vue-demi";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  // KeyOutlined
} from "@ant-design/icons-vue";
import { actionTrack, arrayToObjact } from "@/commonMethods/commonMethod";
// import ResetPassword from "@/components/reset-password/modal/ResetPassword";
import { messages } from "@/config/messages";
import { warningSwal } from "@/commonMethods/commonMethod";
import KeyIcon from "@/components/common/KeyIcon";
export default defineComponent({
  props: {
    isLeft: {
      type: Boolean,
    },
    hideEditIcon: Boolean,
    patientUdid: Number,
  },
  components: {
    // ResetPassword:defineAsyncComponent(()=>import("@/components/reset-password/modal/ResetPassword")),
    // KeyOutlined,
    KeyIcon,
    MailOutlined,
    EditOutlined,
    PhoneOutlined,
    HomeOutlined,
    ImageCropper: defineAsyncComponent(() =>
      import("@/components/common/ImageCropper")
    ),
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const modalVisible = ref(false);
    const resetPasswordVisible = ref(false);
    const patientId = props.patientUdid ? props.patientUdid : route.params.udid;

    const isPicuteLoading = computed(() => {
      return store.state.patients.isPicuteLoading;
    });

    const editPatient = ({ udid, id }) => {
      emit("onEditPatient", { udid, id });
    };

    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    });

    const programsPatient = computed(() => {
      return store.state.patients.programsPatient;
    });

    const imageinCropper = ref("");
    const imageUrl = ref("");
    const fileName = ref("");

    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    const handleChange = (info) => {
      store.commit("uploadFile", null);
      store.commit("errorMsg", null);
      fileName.value = info.file.name;
      getBase64(info.file.originFileObj, (base64Url) => {
        imageinCropper.value = base64Url;
      });
      modalVisible.value = true;
    };

    const updateProfileImage = (dataURL) => {
      var file = dataURLtoFile(dataURL, fileName.value);
      let formData = new FormData();
      formData.append("file", file);

      store
        .dispatch("updateProfileImage", {
          formData: formData,
          patientUdid: patientId,
        })
        .then(() => {
          store.dispatch("patientDetails", patientId).then(() => {
            imageUrl.value = patientDetails.value.profilePhoto;
            console.log("profilePhoto 2", patientDetails.value.profilePhoto);
            store.commit("uploadFile", null);
            store.commit("errorMsg", null);
            store.commit("loadingStatus", false);
          });
          setTimeout(() => {
            store.commit("isPicuteLoading", false);
          }, 2500);
        });
    };

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    const closeImageModal = () => {
      modalVisible.value = false;
    };

    const resetPasseord = (id) => {
      warningSwal(messages.resetPassword).then((response) => {
        if (response == true) {
          store.dispatch("passwordReset", { endPoint: "patient", id: id });
        } else {
          // emit("saveModal", true);
        }
      });
    };

    const saveModal = (value) => {
      resetPasswordVisible.value = value;
    };

    return {
      saveModal,
      resetPasseord,
      resetPasswordVisible,
      screensPermissions: store.getters.screensPermissions,
      paramsId: patientId,
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
      programsPatient,
      patientImg: props.isLeft ? 'patientImg' : '',
      patientSection: props.isLeft ? 'patientSection' : 'sectionPatient',
      patientInfo: props.isLeft ? 'patientInfo' : '',
      patientIcons: props.isLeft ? 'patientIcons' : 'iconsPatient',
      patientPrograms: props.isLeft ? 'patientPrograms' : '',
    }
  }
});
</script>

<style>

.resetPass img {
  width: 15px !important;
  height: auto !important;;
}
span.anticon.anticon-plus {
  position: relative;
  top: -2px;
}
.button-details {
  position: relative !important;
  top: 0;
  text-align: center;
}
.patientSectionInner{
  display: flex;
}
span.edit-icon {
  position: relative;
  top: -1px;
  font-size: 12px;
}
.patientImg {
  border-bottom: none !important;
}
.patientInfo {
  padding: 20px 15px 0 0 !important;
}
.patientSection {
  border-bottom: 1px solid #e3e3e3;
  margin: 0 !important;
  padding: 0 0 30px 0 !important;
  
}
.patientIcons, .iconsPatient {
    position: absolute;
    right: 10px;
    top: 5px;
    display: flex;
    gap: 10px;
    align-items: center;
}
.patientSection .patientSectionInner {
  display: flex;
}
.patientPrograms {
  padding: 10px 10px 0 0;
  text-align: right;
  display: contents;
}
.programText {
  border: 1px solid #c8c8c8;
  border-radius: 50px;
  padding: 7px 17px;
  margin-top: 5px;
  margin-left: 2px;
}

.image-section  img {
      min-width: 80px;
      min-height: 80px;
      max-width: 80px;
      max-height: 80px;
  }
 .patientInfo .sectionPatient {
    display: flex;
    flex-direction: column;
}
  .patientInfo .buttonGroup{
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-end;
  }
</style>