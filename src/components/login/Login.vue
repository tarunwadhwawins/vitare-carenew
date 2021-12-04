<template>
  <div>
    <div class="loginWrapper">
      <div class="logIn">
        <div class="loginInner">
          <a-row>
            <a-col :md="12">
              <div class="leftWrapper">
                <div>
                  <div class="logo">
                    <img src="@/assets/images/logo.png" alt="image">
                  </div>
                  <h2>Welcome to Virtare Care</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <img class="rightImg" src="@/assets/images/circle.png" alt="image">
                </div>
              </div>
            </a-col>
            <a-col :md="12">
              <div class="rightWrapper">
                <img class="rightImg" src="@/assets/images/curve.png" alt="image"/>
                <h2>Login</h2>
                <Form @submit="handleLogin" :validation-schema="schema">
                  <div class="field">
                    <Field class="ant-input ant-input-lg" v-model="email" name="email" placeholder="Email"></Field>
                    <ErrorMessage class="error" name="email" />
                  </div>
                  <div class="field">
                    <Field class="ant-input ant-input-lg" v-model="password" name="password" type="password" placeholder="Password"></Field>
                    <ErrorMessage class="error" name="password" />
                  </div>
                  <button class="btn primaryBtn">Submit</button>
                </Form>
              </div>
            </a-col>
            <loading
              v-model:active="isLoading" 
              loader="bars"
              lock-scroll="true"
              is-full-page="false"
              transition="fade"
              :can-cancel="false"/>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate';
import { defineComponent } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Default values
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

export default defineComponent({
  components: {
    Loading,
    Form,
    Field,
    ErrorMessage,
  },
	data() {
    const schema = yup.object({
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().label("Password"),
    });
		return {
      isLoading: false,
      schema,
			email: '',
			password: '',
			role: "Admin"
		}
	},
  methods: {
    handleLogin() {
      this.isLoading = true;
			const email = this.email;
			const password = this.password;
			const role = this.role;
			this.$store.dispatch("auth/login", { email, password, role })
				.then(() => {
					this.$router.push("/dashboard");
				},
				(error) => {
          console.log(error)
					this.isLoading = false;
					this.message = (
						error.response &&
						error.response.data &&
						error.response.data.message
					) ||
					error.message ||
					error.toString();
				}
			);
    },
	},
});
</script>

<style>
</style>
