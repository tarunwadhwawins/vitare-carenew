
export const roleAndPermissions = (state, auth) => {
  if (auth == 1) {
      state.roleAndPermissions = [{
          id: 1,
          name: "Add Role"
      },

      {
          id: 2,
          name: "Edit Role"
      },
      {
          id: 3,
          name: "Delete Role"
      },
      {
          id: 4,
          name: "Active/Inactive Role"
      },
      {
          id: 5,
          name: "Export Roles"
      },
      ]
  }else if(auth == 2){
    state.roleAndPermissions = [{
      id: 1,
      name: "Add Role"
  },
  {
      id: 5,
      name: "Export Roles"
  },
  ]
  }else if(auth == 3){
    state.roleAndPermissions = [{
      id: 1,
      name: "Add Role"
  },

  {
      id: 5,
      name: "Export Roles"
  },
  ]
  }else{
      state.roleAndPermissions =[]
  }

}


export const globalCodesPermissions = (state, auth) => {
  if (auth == 1) {
      state.globalCodesPermissions = [{
          id: 6,
          name: "Add Global Codes"
      },

      {
          id: 7,
          name: "Update Global Codes"
      },
      {
          id: 8,
          name: "Delete Global Codes"
      },
      {
        id: 265,
        name: "Global Code Export"
      },
      {
        id: 266,
        name: "Global Code Status "
    }]
  }else if(auth == 2){
    state.globalCodesPermissions = [{
      id: 6,
      name: "Add Global Codes"
  },

  {
      id: 7,
      name: "Update Global Codes"
  }]
  }else if(auth == 3){
    state.globalCodesPermissions = [{
      id: 6,
      name: "Add Global Codes"
  }]
  }else{
      state.globalCodesPermissions =[]
  }

}

export const cptCodePermissions = (state, auth) => {
  if (auth == 1) {
      state.cptCodePermissions = [{
          id: 9,
          name: "Add CPT Code"
      },

      {
          id: 10,
          name: "Edit CPT Code"
      },
      {
          id: 11,
          name: "Delete CPT Code"
      },
      {
          id: 12,
          name: "Active/Inactive CPT Code"
      },
      {
          id: 13,
          name: "Export CPT Code"
      },
      {
        id: 14,
        name: "Search CPT Codes"
    }]
  }else if(auth == 2){
    state.cptCodePermissions = [{
      id: 9,
      name: "Add CPT Code"
  },

  {
      id: 10,
      name: "Edit CPT Code"
  },
  {
      id: 13,
      name: "Export CPT Code"
  },
  {
    id: 14,
    name: "Search CPT Codes"
}]
  }else if(auth == 3){
    state.cptCodePermissions = [{
      id: 9,
      name: "Add CPT Code"
  },
  {
      id: 13,
      name: "Export CPT Code"
  },
  {
    id: 14,
    name: "Search CPT Codes"
}]
  }else{
      state.cptCodePermissions =[]
  }

}


export const programsPermissions = (state, auth) => {
  if (auth == 1) {
      state.programsPermissions = [{
          id: 15,
          name: "Add Program"
      },

      {
          id: 16,
          name: "Edit Program"
      },
      {
          id: 17,
          name: "Delete Program"
      },
      {
          id: 18,
          name: "Active/Inactive Program"
      },
      {
          id: 19,
          name: "Export Program"
      },
      {
        id: 20,
        name: "Search Program"
    }]
  }else if(auth == 2){
    state.programsPermissions = [{
      id: 15,
      name: "Add Program"
  },

  {
      id: 16,
      name: "Edit Program"
  },
  
  {
      id: 18,
      name: "Active/Inactive Program"
  },
  {
      id: 19,
      name: "Export Program"
  },
  {
    id: 20,
    name: "Search Program"
}]
  }else if(auth == 3){
    state.programsPermissions = [{
      id: 15,
      name: "Add Program"
  },

  {
      id: 16,
      name: "Edit Program"
  },
  {
      id: 19,
      name: "Export Program"
  },
  {
    id: 20,
    name: "Search Program"
}]
  }else{
      state.programsPermissions =[]
  }

}

export const providersPermissions = (state, auth) => {
  if (auth == 1) {
      state.providersPermissions = [{
          id: 21,
          name: "Search Providers"
      },
      {
        id: 22,
        name: "Add provider"
      },

      {
          id: 23,
          name: "Edit provider"
      },
      {
          id: 24,
          name: "Delete provider"
      },
      {
          id: 25,
          name: "Active/Inactive Program"
      },
      {
          id: 26,
          name: "Export Program"
      },
      {
        id: 27,
        name: "Provider Appointments List "
      },
      {
        id: 28,
        name: "Provider Patients List "
      },
      {
        id: 29,
        name: "Provider Permissions List "
      },
      {
        id: 30,
        name: "Provider Documents List"
      },
      {
        id: 31,
        name: "Provider Locations List"
      },
      {
        id: 32,
        name: "Add Provider Location"
      },
      {
        id: 33,
        name: "Edit Provider Location"
      },
      {
        id: 34,
        name: "Delete Provider Location"
      }]
  }else if(auth == 2){
    state.providersPermissions = [{
      id: 21,
      name: "Search Providers"
  },
  {
    id: 22,
    name: "Add provider"
  },

  {
      id: 23,
      name: "Edit provider"
  },
  {
      id: 24,
      name: "Delete provider"
  },
  {
      id: 25,
      name: "Active/Inactive Program"
  },
  {
      id: 26,
      name: "Export Program"
  },
  {
    id: 27,
    name: "Provider Appointments List "
  },
  {
    id: 28,
    name: "Provider Patients List "
  },
  {
    id: 29,
    name: "Provider Permissions List "
  },
  {
    id: 30,
    name: "Provider Documents List"
  },
  {
    id: 31,
    name: "Provider Locations List"
  },
  {
    id: 32,
    name: "Add Provider Location"
  },
  {
    id: 33,
    name: "Edit Provider Location"
  },
  {
    id: 34,
    name: "Delete Provider Location"
  }]
  }else if(auth == 3){
    state.providersPermissions = [{
      id: 21,
      name: "Search Providers"
  },
  {
    id: 22,
    name: "Add provider"
  },

  {
      id: 23,
      name: "Edit provider"
  },
  {
      id: 24,
      name: "Delete provider"
  },
  {
      id: 25,
      name: "Active/Inactive Program"
  },
  {
      id: 26,
      name: "Export Program"
  },
  {
    id: 27,
    name: "Provider Appointments List "
  },
  {
    id: 28,
    name: "Provider Patients List "
  },
  {
    id: 29,
    name: "Provider Permissions List "
  },
  {
    id: 30,
    name: "Provider Documents List"
  },
  {
    id: 31,
    name: "Provider Locations List"
  },
  {
    id: 32,
    name: "Add Provider Location"
  },
  {
    id: 33,
    name: "Edit Provider Location"
  },
  {
    id: 34,
    name: "Delete Provider Location"
  }]
  }else{
      state.providersPermissions =[]
  }

}