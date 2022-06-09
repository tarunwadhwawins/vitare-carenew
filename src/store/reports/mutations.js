
import {dateOnlyFormat,globalDateFormat,} from "@/commonMethods/commonMethod";

export const cptCodes = (state, data) => {
    state.cptCodesMeta = data.meta ? data.meta.pagination : ''
    state.cptCodes = data.data.map(item =>{
        item.billingDate = dateOnlyFormat(item.billingDate,globalDateFormat)
        return item
    })
 }

 
 export const reportDetailList = (state, data) => {
    //  console.log(data)
    state.reportDetailList = data
    state.reportDetailList.device[0]['issueDate'] = dateOnlyFormat(data.device[0].issueDate,globalDateFormat)
    state.reportDetailList.device[0]['setupDate' ]= dateOnlyFormat(data.device[0].setupDate,globalDateFormat)
 }
 
 