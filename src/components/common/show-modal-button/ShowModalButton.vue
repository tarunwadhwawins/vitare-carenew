<template>
<h2 class="pageTittle">
    {{headingText}}
    <div class="commonBtn">
        <a-button class="btn primaryBtn" @click="showModal" :isEdit="isEdit">{{buttonText}}</a-button>
    </div>
</h2>
</template>

<script>
export default {
    name: "ShowModalButton",
    props: {
        headingText: {
            type: String,
            required: true,
        },
        buttonText: {
            type: String,
            required: true,
        },
        isEdit: Boolean,
        
    },
    setup(props, {
        emit
    }) {
        const showModal = () => {
            emit("isVisible", true);
        };
        return {
            showModal,
        };
    },
};
</script>
