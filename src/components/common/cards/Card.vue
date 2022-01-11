<template>
  <a-col :xl="4" :sm="8" :xs="12">
    <router-link :to="link">
      <div class="topBox " :class="customClass">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        <h5>{{ count }}</h5>
        <p>{{$t(('dashboard')+'.'+text)}}</p>
      </div>
    </router-link>
  </a-col>
</template>

<script>
  export default {
    props: {
      count: {
        type: Number,
        required: true
      },
      link: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true
      },
      customClass: {
        type: String,
        required: true
      },
    },
  }
</script>