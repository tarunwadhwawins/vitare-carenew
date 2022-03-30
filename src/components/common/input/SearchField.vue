<template>
<a-input-search v-model:value="value" placeholder="Search..." style="width: 100%" @search="onSearch" @input="handleChange" size="large" />
</template>

<script>
import {
    defineComponent,
    ref,
    reactive
} from 'vue';
import { useStore } from "vuex"
export default defineComponent({
    props: {
        endPoint: {
            type: String
        }
    },
    setup(props) {
      const store = useStore()
        let timeout = ''
        let endPoints= reactive(props.endPoint)
        const search = ref(null)
        const handleChange = value => {
            if (timeout && value.target.value != '') {
                clearTimeout(timeout);
                timeout = null;
            }
            search.value = value.target.value;

            function fake() {
                let ordring = store.getters.orderTable.value
                store.dispatch("searchTableData", {
                  data:search.value,
                  endPoint:endPoints,
                  field:ordring.data,
                  
                })
                store.dispatch("searchTable",'&search='+search.value)
            }
            timeout = setTimeout(fake, 600);
        };

        return {
            value: ref(undefined),
            handleChange,
        };
    },

});
</script>
