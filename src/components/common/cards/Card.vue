<template>
  <a-col :xl="xl" :sm="sm" :xs="12">
    <div @click="handler(link, text)">
      <div class="topBox" :style="{'background-color': color}">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        <h5 :style="{'color': textColor}">{{ count }}</h5>
        <p :style="{'color': textColor}">{{ $t(('dashboard')+'.'+text) }}</p>
      </div>
    </div>
  </a-col>
</template>

<script>
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import moment from "moment"
import {
  startimeAdd,
  endTimeAdd,
  timeStamp,
} from '@/commonMethods/commonMethod'
  export default {
    props: {
      count: {
        type: Number,
        required: true
      },
      link: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true
      },
      xl: {
        type:Number
      },
      sm: {
        type:Number
      },
      color: {
        type:String
      },
      textColor: {
				type:String
      }
    },
    setup() {
			const router = useRouter()
			const store = useStore()
			let from = moment()
			let to = moment()
			let dateFormat = {
				fromDate: from ? timeStamp(startimeAdd(from)) : '',
				toDate: to ? timeStamp(endTimeAdd(to)) : ''
			}
			const fromDate = store.getters.dateFilter.value ? store.getters.dateFilter.value.fromDate : dateFormat.fromDate
			const toDate = store.getters.dateFilter.value ? store.getters.dateFilter.value.toDate : dateFormat.toDate

			function handler(event, text) {
				if(text == "activePatients" || text == "inactivePatients" || text == "totalPatients") {
					router.push({
						name: event,
						query: {
							filter: text
						}
					})
				}
				else {
					router.push({
						name: event,
						query:{
							fromDate: fromDate ? fromDate : '',
							toDate: toDate ? toDate : '',
							filter: text
						}
					})
				}
			}

      return {
				handler,
      }
    }
  }
</script>

