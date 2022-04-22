<template>
<a-form :model="loginForm" layout="vertical" @finish="loginUser">
    <div class="field">
        <a-form-item name="email" :rules="[{ required: true, message: $t('login.ePlaceholder')+' '+$t('global.validation')  }]">
            <a-input v-model:value="loginForm.email" :placeholder="$t('login.ePlaceholder')" size="large" />
        </a-form-item>
    </div>
    <div class="field">
        <a-form-item name="password" :rules="[{ required: true, message: $t('login.psdPlaceholder')+' '+$t('global.validation')  }]">
            <a-input-password v-model:value="loginForm.password" :placeholder="$t('login.psdPlaceholder')" size="large" />
        </a-form-item>
    </div>
    <div class="field">
        <span class="error">{{ errorMsg.errorMsg }}</span>
    </div>
    <div class="buttons">
        <a-button class="btn primaryBtn" html-type="submit" :loading="iconLoading">{{$t("login.login")}}</a-button>
        <!-- <router-link :to="{ name: 'ForgotPassword', params: { udid: '' }}"> -->
        <router-link to="/forgot-password">
            {{ $t("login.forgotPassword") }}
        </router-link>
    </div>
</a-form>
</template>

<script>
import {
    computed,
    reactive,
    ref,
    onUnmounted,
    watchEffect
} from "vue";
import {
    useRouter
} from "vue-router";
import {
    useStore
} from "vuex";
export default {
    setup() {
        const store = useStore()
        const router = useRouter();

        const loginForm = reactive({
            email: "",
            password: "",
        })
        const iconLoading = ref(false)
        const loginUser = () => {
            iconLoading.value = true
            store.dispatch('login', loginForm)
        }
        const error = computed(() => {
            return store.state.dashBoard.errorMsg
        })
        watchEffect(() => {
            if (error.value) {
                iconLoading.value = false
            }
        })
        onUnmounted(() => {
            iconLoading.value = false
            store.state.dashBoard.errorMsg=''

        })
        const loggedInUser = computed(() => {
            return store.state.authentication.loggedInUser
        })

        const errorMsg = computed(() => {
            return store.state.authentication
        })

        return {
            errorMsg,
            loginForm,
            loginUser,
            router,
            iconLoading,
            loggedInUser,
        };
    },
};
</script>

<style scoped>
span.error {
    color: #ff0000;
}
</style>
