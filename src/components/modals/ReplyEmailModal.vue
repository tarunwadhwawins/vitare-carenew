<template>
	<a-modal width="50%" v-if="gmailData" :title="'Subject: '+ gmailData.subject" centered class="chatModal" :footer="false" @cancel="closeModal()" :maskClosable="false">
		<!-- <div :level="5">
			<div class="chatWrapper right">
				<div class="message">
					{{ gmailData ?  gmailData.message : '' }}
				</div>
				<div class="time" >{{ gmailData.message }}</div>
			</div>
		</div> -->
		<a-form ref="formRef" :model="replyForm" layout="vertical" @finish="submitForm">
			<a-row>
				<a-col :sm="3" >
					<div class="form-group">
						<label><b>Message : </b></label>
					</div>
				</a-col>
				<a-col :sm="20">
						<label>{{gmailData.message}}</label>
				</a-col>
				<a-col :span="24">
					<div class="form-group">
						<a-form-item :label="$t('communications.communicationsModal.reply')" name="message" :rules="[{ required: true, message: $t('communications.communicationsModal.message')+' '+$t('global.validation')  }]">
							<a-textarea v-model:value="replyForm.message" allow-clear @change="checkChangeInput()" />
						</a-form-item>
					</div>
				</a-col>
				<a-col :span="24">
					<div class="steps-action">
						<!-- <a-button class="modal-button" @click="handleClear()">{{$t('global.clear')}}</a-button> -->
						<a-button class="modal-button" @click="closeModal" >Cancel</a-button>
						<a-button class="modal-button" type="primary" html-type="submit">{{$t('global.send')}}</a-button>
					</div>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>
    
<script>
import { computed, reactive, ref } from 'vue-demi';
import {
	useStore
} from "vuex"
import { messages } from '@/config/messages';
import { warningSwal } from '@/commonMethods/commonMethod';

export default {
	props: {
		communication: {
			type: Object
		}
	},
	setup(props, { emit }) {
		const store = useStore()
		const formRef = ref()

		const replyForm = reactive({
			message: "",
		});

		const form = reactive({ ...replyForm });

		const submitForm = () => {
			store.dispatch("replyCommunication", {
				communicationId: props.communication.id,
				data: replyForm
			}).then(() => {
				store.dispatch("communicationsList");
				emit("is-visible", false);
				formRef.value.resetFields();
				Object.assign(replyForm, form);
				store.commit('checkChangeInput', false)
			});
		};

		const checkChangeInput = () => {
			store.commit('checkChangeInput', true)
		}
    const checkFieldsData = computed(() => {
      return store.state.common.checkChangeInput;
    });

		const handleClear = () => {
			formRef.value.resetFields();
			Object.assign(replyForm, form);
		}

		const closeModal = () => {
			emit("is-visible", true);
			if(checkFieldsData.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
						formRef.value.resetFields();
						Object.assign(replyForm, form);
						emit("is-visible", false);
						store.commit('checkChangeInput', false)
					}
					else {
						emit("is-visible", true);
					}
				})
			}
			else {
				emit("is-visible", false);
			}
		}

		return {
			formRef,
			replyForm,
			submitForm,
			handleClear,
			checkChangeInput,
			closeModal,
			gmailData: store.getters.communicationsView
		};
	},
};
</script>

<style lang="scss">
.chatWrapper {
	padding: 8px 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	&.right {
		align-items: flex-end;
	}
	&.left {
		.message {
			background-color: #1890ff;
			color: #fff;
		}
	}
	.message {
		max-width: 500px;
		font-size: 13px;
		background-color: #f9f9f9;
		border-radius: 5px;
		padding: 10px;
		color: #111;
	}
	.time {
		font-size: 12px;
		color: #999;
		padding: 3px 0 0 0px;
	}
}
</style>