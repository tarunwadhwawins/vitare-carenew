
import {dateOnlyFormat,globalDateFormat,} from "@/commonMethods/commonMethod";

export const cptCodes = (state, data) => {
    state.cptCodesMeta = data.meta ? data.meta.pagination : ''
    state.cptCodes = data.data.map(item =>{
        item.billingDate = dateOnlyFormat(item.billingDate,globalDateFormat)
        return item
    })
 }

 
 export const reportDetailList = (state, data) => {
    state.reportDetailList = data
 }
 
 