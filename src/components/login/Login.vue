<template>
  <Form @submit="handleLogin" :validation-schema="schema">
    <div class="field">
      <Field class="ant-input ant-input-lg" v-model="email" name="email" placeholder="Email"></Field>
      <ErrorMessage class="error" name="email" />
    </div>
    <div class="field">
      <Field class="ant-input ant-input-lg" v-model="password" name="password" type="password" placeholder="Password">
      </Field>
      <ErrorMessage class="error" name="password" />
    </div>
    <div class="buttons">
      <button class="btn primaryBtn">Login</button>
      <a class=""> Forgot Password ? </a>
    </div>
  </Form>
  <loading v-model:active="isLoading" loader="bars" :lock-scroll="true" :is-full-page="false" transition="fade"
    :can-cancel="false" />
</template>
<script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { configure } from "vee-validate";
  import { defineComponent } from "vue";
  import Loading from "vue-loading-overlay"

  // Default values
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  });
  export default defineComponent({
    name: "Login",
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
        email: "",
        password: "",
        role: "Admin",
      };
    },
    methods: {
      handleLogin() {
        this.isLoading = true;
        const email = this.email;
        const password = this.password;
        const role = this.role;
        this.$store
          .dispatch("auth/login", {
            email,
            password,
            role,
          })
          .then(
            () => {
              this.$router.push("dashboard");

            },
            (error) => {
              console.log(error);
              this.isLoading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
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