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
                            <h2>{{$t('login.welcome')}}</h2>
                            <p>{{$t('login.message')}}</p>
                            <img class="rightImg" src="@/assets/images/circle.png" alt="image" />
                        </div>
                    </div>
                </a-col>
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
export default {
    name: "ViewLogin",
    components: {
        Login,
    },
};
</script>
