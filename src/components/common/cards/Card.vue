<template>
  <a-col :xl="4" :sm="8" :xs="12">
    <div class="topBox" :class="customClass">
      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
      <h5>{{ count.count }}</h5>
      <p>{{ count.text }}</p>
    </div>
  </a-col>
</template>

<script>
export default {
  props: {
    count: {
      type: Object,
      required: true
    },
    customClass: {
      type: String,
      required: true
    },
  },
}
</script>
