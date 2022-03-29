  <template>
    <div class="loginWrapper setupPassword">
      <div class="logIn">
        <div class="loginInner">
          <a-row>
            <a-col :md="24">
              <div class="rightWrapper">
                <div class="logo">
                  <img src="@/assets/images/logo.svg" alt="image" />
                </div>
                <img
                  class="rightImg"
                  src="@/assets/images/curve.png"
                  alt="image"
                />
                <h2>Setup Password</h2>
                <a-form layout="vertical">
                  <div class="field">
                    <a-form-item>
                      <a-input
                        v-model:value="value1"
                        placeholder="Enter New Password"
                        size="large"
                      />
                    </a-form-item>
                  </div>
                  <div class="field">
                    <a-form-item>
                      <a-input
                        v-model:value="value2"
                        placeholder="Confirm Password"
                        size="large"
                      />
                    </a-form-item>
                  </div>

                  <div class="buttons">
                    <a-button class="btn primaryBtn">Submit</a-button>
                  </div>
                </a-form>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    setup() {
      const value1 = ref("");
      const value2 = ref("");
      return {
        value1,
        value2,
      };
    },
  });
  </script>

  <style lang="scss" scoped>
  @import "@/assets/scss/variable.scss";
  .setupPassword {
    .logIn {
      max-width: 500px;
      .loginInner {
        .rightWrapper {
          .logo {
            max-width: 100px;
            margin: 0 0 20px;
          }
        }
      }
    }
  }
  </style>