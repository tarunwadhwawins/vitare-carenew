<template>
  <div class="loginWrapper">
    <div class="logIn">
      <div class="loginInner">
        <a-row>
          <a-col :md="12">
            <div class="leftWrapper">
              <div>
                <div class="logo">
                  <img src="@/assets/images/logo.png" alt="image" />
                </div>
                <h2>Welcome to Ditstek Care</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </p>
                <img class="rightImg" src="@/assets/images/circle.png" alt="image" />
              </div>
            </div>
          </a-col>
          <a-col :md="12">
            <div class="rightWrapper">
              <img class="rightImg" src="@/assets/images/curve.png" alt="image" />
              <h2>Login</h2>
              <Login />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/login/Login";
export default {
  name: "ViewLogin",
  components: {
    Login,
  },
};
</script>
