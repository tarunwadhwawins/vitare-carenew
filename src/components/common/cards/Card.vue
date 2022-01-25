<template>
  <a-col :xl="xl" :sm="sm" :xs="12">
    <router-link :to="link">
      <div class="topBox" :style="{'background-color': color}">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        <h5 :style="{'color': textColor}">{{ count }}</h5>
        <p :style="{'color': textColor}">{{$t(('dashboard')+'.'+text)}}</p>
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
      
      xl:{
        type:Number
      },
      sm:{
        type:Number
      },
      color:{
        type:String
      },
      textColor:{
      type:String
      }
    },
  }
</script>

