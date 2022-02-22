 
 <template>
  <div>
    <span>{{ errorMessageRef }}</span>
    {{itemsRef}}
    <!-- <ul>
      <li v-for="item in itemsRef" :key="item.id">{{ item }}</li>
      <div ref="intersectionTrigger"></div>
    </ul> -->
  </div>
  <a-table v-if="itemsRef" :columns="columns" :data-source="itemsRef" :scroll="{ x: 900 }" ></a-table>
</template>

<script>
import { ref, watch } from 'vue'
import { makeUseInfiniteScroll } from 'vue-use-infinite-scroll'

export default {
  setup() {
    const useInfiniteScroll = makeUseInfiniteScroll({})
    const intersectionTrigger = ref(null)
    const pageRef = useInfiniteScroll(intersectionTrigger)

    watch(
      pageRef,
      (page) => {
        console.log(page)
        fetchItems(page)
      },
      { immediate: true }
    )

    const itemsRef = ref([])
    const errorMessageRef = ref('')

    async function fetchItems(page) {
      
      fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`)
        .then((res) => res.json())
        .then((data) =>  itemsRef.value.push(...data))
        .catch((error) => (errorMessageRef.value = error.message))

    }
   // itemsRef.value = computed(() =>{return itemsRef.value})
    const columns = [
        {
          title: "General",
          dataIndex: "postId",

        },
        {
          title: "Device Type",
          dataIndex: "name",
         
        },
        {
          title: "email",
          dataIndex: "email",
        },
        {
          title: "id",
          dataIndex: "id",
        },
      ];
    return {
      columns,
			intersectionTrigger,
			itemsRef,
			errorMessageRef
		}
  },
}
</script>