 
 <template>
  <div>
    <span>{{ errorMessageRef }}</span>
    <ul>
      <li v-for="item in itemsRef" :key="item.id">{{ item }}</li>
      <div ref="intersectionTrigger"></div>
    </ul>
  </div>
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
        fetchItems(page)
      },
      { immediate: true }
    )

    const itemsRef = ref([])
    const errorMessageRef = ref('')

    async function fetchItems(page) {
      fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`)
        .then((res) => res.json())
        .then((data) => itemsRef.value.push(...data))
        .catch((error) => (errorMessageRef.value = error.message))
    }

    return {
			intersectionTrigger,
			itemsRef,
			errorMessageRef
		}
  },
}
</script>