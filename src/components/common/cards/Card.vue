<template>
  <a-col :xl="4" :sm="8" :xs="12">
    <div class="topBox" :class="customClass">
      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
      <h5>{{ count }}</h5>
      <p>{{ text }}</p>
    </div>
  </a-col>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    text: {
      type: Number,
      required: true
    },
    customClass: {
      type: String,
      required: true
    },
  },
}
</script>
