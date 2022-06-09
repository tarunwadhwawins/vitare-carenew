
import {dateOnlyFormat,globalDateFormat,} from "@/commonMethods/commonMethod";

export const reportList = (state, data) => {
    state.reportList = data.map(item =>{
        item.billingDate = dateOnlyFormat(item.billingDate,globalDateFormat)
        return item
    })
 }

 
 export const reportDetailList = (state, data) => {
    state.reportDetailList = data
 }
 
 