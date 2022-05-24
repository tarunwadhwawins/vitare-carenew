<template>
<a-input-search v-model:value="value" :placeholder="palcholder?palcholder:'Search...'" style="width: 100%"  @input="handleChange" size="large" />
</template>

<script>
import {
    defineComponent,
    ref,

} from 'vue';
import { useStore } from "vuex"
export default defineComponent({
    props: {
        endPoint: {
            required: true,
            type: String
        },
        palcholder:String,
        otherParam:String
    },
    setup(props) {
      const store = useStore()
        let timeout = ''
        let endPoints= ref(props.endPoint)
        const search = ref(null)
        let filter = store.getters.filter.value  ? store.getters.filter.value : ''
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
                  endPoint:endPoints.value,
                  field:props.otherParam?props.otherParam:''+ordring.data,
                  filter:filter
                  
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
