<template>
  <div class="chatBoxInner">
    <div class="innerChatBox" v-for="message, index in conversationList" :key="index">
      <div v-if="auth.user.id == 1">
        <div class="chatWrapper left" v-if="auth.user.id != message.senderId && message.senderId == conversationList[0].senderId">
          <div class="message">
            {{ message.message }}
          </div>
          <div class="time">{{ message.createdAt }}</div>
        </div>
        <div class="chatWrapper right" v-else-if="auth.user.id == message.senderId || message.senderId != conversationList[0].senderId">
          <div class="message">
            {{ message.message }}
          </div>
          <div class="time" >{{ message.createdAt }}</div>
        </div>
      </div>
      <div v-else>
        <div class="chatWrapper left" v-if="auth.user.id != message.senderId">
          <div class="message">
            {{ message.message }}
          </div>
          <div class="time">{{ message.createdAt }}</div>
        </div>
        <div class="chatWrapper right" v-else-if="auth.user.id == message.senderId">
          <div class="message">
            {{ message.message }}
          </div>
          <div class="time" >{{ message.createdAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue-demi'
import { useStore } from 'vuex'
export default {
  props: {
    conversationList: {
      type: Array
    },
    communication: {
      type: Object
    }
  },
  setup(props) {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const store = useStore()
    const tableContent = ref(null)

    watchEffect(() => {
      store.state.communications.conversationList = ""
      store.dispatch("conversation", props.communication.id)
      tableContent.value = document.getElementsByClassName('chatBoxInner')
      getScroll()
    })

    function getScroll() {
      setTimeout(() => {
        // if(tableContent.value[0].scrollTop < tableContent.value[0].scrollHeight+10) {
          tableContent.value[0].scrollTop = tableContent.value[0].scrollHeight+10
        // }
      }, 2000)
    }

    return {
      auth,
    }
  }
}
</script>