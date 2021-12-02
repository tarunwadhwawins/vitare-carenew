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
                <a-form @submit.prevent="handleLogin">
                  <div class="field">
                    <input class="ant-input ant-input-lg" v-model="email" placeholder="Email" />
                  </div>
                  <div class="field">
                    <input class="ant-input ant-input-lg" v-model="password" placeholder="Password" />
                  </div>
                  <button class="btn primaryBtn">Submit</button>
                </a-form>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	data() {
		return {
			email: '',
			password: '',
			role: "Admin"
		}
	},
  methods: {
    handleLogin() {
			this.loading = true;
			const email = this.email;
			const password = this.password;
			const role = this.role;
			this.$store.dispatch("auth/login", { email, password, role })
				.then(() => {
					this.$router.push("/dashboard");
				},
				(error) => {
					this.loading = false;
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