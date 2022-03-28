<template>
	<div class="loginWrapper">
    <div class="logIn">
			<div class="loginInner">
				<a-row>
          <WelcomeScreen />
					<a-col :md="12">
						<div class="rightWrapper">
							<img class="rightImg" src="@/assets/images/curve.png" alt="image" />
							<h2>{{$t('login.login')}}</h2>
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
import WelcomeScreen from "@/components/common/Welcome";
export default {
	name: "ViewLogin",
	components: {
		Login,
		WelcomeScreen
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.leftWrapper {
    h3 {
        font-size: 18px;
        text-align: justify !important;
        position: relative;
        margin: 0 0 30px;
        &::before {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 0;
            height: 2px;
            background-color: $primary-color;
            width: 50px;
        }
    }
}
</style>