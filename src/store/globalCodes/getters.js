import { computed } from "vue"
export const globalCodesList = (state)=>{
    return computed(()=>{
        return state.globalCodesList
    })
}
export const globalMeta = (state)=>{
    return computed(()=>{
        return state.globalMeta
    })
}
