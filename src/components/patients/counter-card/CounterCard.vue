<template>
<div :class="colorBox">
    <UserOutlined />
    <h3>{{ count }}</h3>
    <p>{{ text }}</p>
</div>
</template>

<script>
import {UserOutlined} from "@ant-design/icons-vue";
export default {
    name: 'CounterCard',
    components: {
        UserOutlined
    },
    props: {
        count: {
            type: Number,
            required: true
        },
        text: {
            type: Number,
            required: true
        },
        colorBox: {
            type: String,
            required: true
        },
    },
}
</script>
