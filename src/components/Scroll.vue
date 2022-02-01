<template>
  <div class='scrolling-component' ref='scrollComponent'>
    <div class="post" v-for='communication in communicationsList' :KEY="communication.id">
      <h2>{{ communication.author }}</h2>
      <p>{{ communication.content }}</p>
    </div>
  </div>
</template>

<script>
const communicationsColumns = [
  {
    title: "From",
    dataIndex: "from",
    sorter: {
      compare: (a, b) => a.from - b.from,
      multiple: 2,
    },
  },
  {
    title: "To",
    dataIndex: "to",
    sorter: {
      compare: (a, b) => a.to - b.to,
      multiple: 2,
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    slots: {
      customRender: "type",
    },
  },
  {
    title: "Priority",
    dataIndex: "priority",
    slots: {
      customRender: "priority",
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: {
      compare: (a, b) => a.category - b.category,
      multiple: 2,
    },
  },
  {
    title: "Date Sent",
    dataIndex: "createdAt",
    sorter: {
      compare: (a, b) => a.createdAt - b.createdAt,
      multiple: 2,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];

import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex"
import getPosts from "../scripts/post-loader";

  export default {
    setup () {
      const communicationsList = ref(getPosts(10))
      const store = useStore()
      var page = 1;
      const scrollComponent = ref(null)
      
      const loadMorePosts = () => {
        let newPosts = store.dispatch('communicationsList', page)
        communicationsList.value.push(...newPosts)
        page++
      }
      
      onMounted(() => {
        window.addEventListener("scroll", handleScroll)
      })

      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll)
      })

      const handleScroll = () => {
        let element = scrollComponent.value;
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
          loadMorePosts();
        }
      }
      
      return {
        communicationsList,
        scrollComponent,
        communicationsColumns,
      }
    }
  }
</script>