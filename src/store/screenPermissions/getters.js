import { computed } from "vue";
  export const permissionRecords = (state)=>{
      return computed(()=>{
          return state
      })
    }

  export  const screensPermissions=(state)=>{
    return computed(()=>{
        return state.screensPermissions
       })
  }