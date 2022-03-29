<template>
  <a-col :md="12">
    <div class="leftWrapper">
      <div>
        <div class="logo">
          <img src="@/assets/images/logo.svg" alt="image" />
        </div>
        <h3>{{$t('login.welcome')}}</h3>
        <p>{{$t('login.message')}}</p>
        <img class="rightImg" src="@/assets/images/circle.png" alt="image" />
      </div>
    </div>
  </a-col>
</template>