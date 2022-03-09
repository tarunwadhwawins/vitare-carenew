export const dashboardPermissions = (state, permission) => {
  state.dashboardPermissions = permission.widgetId
}
export const roleAndPermissions = (state, auth) => {
  state.roleAndPermissions = auth.actionId
  // if (auth == 1) {
  //   state.roleAndPermissions = [{
  //     id: 1,
  //     name: "Add Role"
  //   },

  //   {
  //     id: 2,
  //     name: "Edit Role"
  //   },
  //   {
  //     id: 3,
  //     name: "Delete Role"
  //   },
  //   {
  //     id: 4,
  //     name: "Active/Inactive Role"
  //   },
  //   {
  //     id: 5,
  //     name: "Export Roles"
  //   },
  //   ]
  // } else if (auth == 2) {
  //   state.roleAndPermissions = [{
  //     id: 1,
  //     name: "Add Role"
  //   },
  //   {
  //     id: 5,
  //     name: "Export Roles"
  //   },
  //   ]
  // } else if (auth == 3) {
  //   state.roleAndPermissions = [{
  //     id: 1,
  //     name: "Add Role"
  //   },

  //   {
  //     id: 5,
  //     name: "Export Roles"
  //   },
  //   ]
  // } else {
  //   state.roleAndPermissions = []
  // }

}

export const globalCodesPermissions = (state, auth) => {
  state.globalCodesPermissions = auth.actionId
  // if (auth == 1) {
  //   state.globalCodesPermissions = [{
  //     id: 6,
  //     name: "Add Global Codes"
  //   },

  //   {
  //     id: 7,
  //     name: "Update Global Codes"
  //   },
  //   {
  //     id: 8,
  //     name: "Delete Global Codes"
  //   },
  //   {
  //     id: 265,
  //     name: "Global Code Export"
  //   },
  //   {
  //     id: 266,
  //     name: "Global Code Status "
  //   }]
  // } else if (auth == 2) {
  //   state.globalCodesPermissions = [{
  //     id: 6,
  //     name: "Add Global Codes"
  //   },

  //   {
  //     id: 7,
  //     name: "Update Global Codes"
  //   }]
  // } else if (auth == 3) {
  //   state.globalCodesPermissions = [{
  //     id: 6,
  //     name: "Add Global Codes"
  //   }]
  // } else {
  //   state.globalCodesPermissions = []
  // }

}

export const cptCodePermissions = (state, auth) => {
  state.cptCodePermissions = auth.actionId
  // if (auth == 1) {
  //   state.cptCodePermissions = [{
  //     id: 9,
  //     name: "Add CPT Code"
  //   },

  //   {
  //     id: 10,
  //     name: "Edit CPT Code"
  //   },
  //   {
  //     id: 11,
  //     name: "Delete CPT Code"
  //   },
  //   {
  //     id: 12,
  //     name: "Active/Inactive CPT Code"
  //   },
  //   {
  //     id: 13,
  //     name: "Export CPT Code"
  //   },
  //   {
  //     id: 14,
  //     name: "Search CPT Codes"
  //   }]
  // } else if (auth == 2) {
  //   state.cptCodePermissions = [{
  //     id: 9,
  //     name: "Add CPT Code"
  //   },

  //   {
  //     id: 10,
  //     name: "Edit CPT Code"
  //   },
  //   {
  //     id: 13,
  //     name: "Export CPT Code"
  //   },
  //   {
  //     id: 14,
  //     name: "Search CPT Codes"
  //   }]
  // } else if (auth == 3) {
  //   state.cptCodePermissions = [{
  //     id: 9,
  //     name: "Add CPT Code"
  //   },
  //   {
  //     id: 13,
  //     name: "Export CPT Code"
  //   },
  //   {
  //     id: 14,
  //     name: "Search CPT Codes"
  //   }]
  // } else {
  //   state.cptCodePermissions = []
  // }

}

export const programsPermissions = (state, auth) => {
  state.programsPermissions = auth.actionId
  // if (auth == 1) {
  //   state.programsPermissions = [{
  //     id: 15,
  //     name: "Add Program"
  //   },

  //   {
  //     id: 16,
  //     name: "Edit Program"
  //   },
  //   {
  //     id: 17,
  //     name: "Delete Program"
  //   },
  //   {
  //     id: 18,
  //     name: "Active/Inactive Program"
  //   },
  //   {
  //     id: 19,
  //     name: "Export Program"
  //   },
  //   {
  //     id: 20,
  //     name: "Search Program"
  //   }]
  // } else if (auth == 2) {
  //   state.programsPermissions = [{
  //     id: 15,
  //     name: "Add Program"
  //   },

  //   {
  //     id: 16,
  //     name: "Edit Program"
  //   },

  //   {
  //     id: 18,
  //     name: "Active/Inactive Program"
  //   },
  //   {
  //     id: 19,
  //     name: "Export Program"
  //   },
  //   {
  //     id: 20,
  //     name: "Search Program"
  //   }]
  // } else if (auth == 3) {
  //   state.programsPermissions = [{
  //     id: 15,
  //     name: "Add Program"
  //   },

  //   {
  //     id: 16,
  //     name: "Edit Program"
  //   },
  //   {
  //     id: 19,
  //     name: "Export Program"
  //   },
  //   {
  //     id: 20,
  //     name: "Search Program"
  //   }]
  // } else {
  //   state.programsPermissions = []
  // }

}

export const providersPermissions = (state, auth) => {
  state.providersPermissions = auth.actionId
  // if (auth == 1) {
  //   state.providersPermissions = [{
  //     id: 21,
  //     name: "Search Providers"
  //   },
  //   {
  //     id: 22,
  //     name: "Add provider"
  //   },

  //   {
  //     id: 23,
  //     name: "Edit provider"
  //   },
  //   {
  //     id: 24,
  //     name: "Delete provider"
  //   },
  //   {
  //     id: 25,
  //     name: "Active/Inactive Provider"
  //   },
  //   {
  //     id: 26,
  //     name: "Export Provider"
  //   },
  //   {
  //     id: 27,
  //     name: "Provider Appointments List "
  //   },
  //   {
  //     id: 28,
  //     name: "Provider Patients List "
  //   },
  //   {
  //     id: 29,
  //     name: "Provider Permissions List "
  //   },
  //   {
  //     id: 30,
  //     name: "Provider Documents List"
  //   },
  //   {
  //     id: 31,
  //     name: "Provider Locations List"
  //   },
  //   {
  //     id: 32,
  //     name: "Add Provider Location"
  //   },
  //   {
  //     id: 33,
  //     name: "Edit Provider Location"
  //   },
  //   {
  //     id: 34,
  //     name: "Delete Provider Location"
  //   }]
  // } else if (auth == 2) {
  //   state.providersPermissions = [{
  //     id: 21,
  //     name: "Search Providers"
  //   },
  //   {
  //     id: 22,
  //     name: "Add provider"
  //   },

  //   {
  //     id: 25,
  //     name: "Active/Inactive Provider"
  //   },
  //   {
  //     id: 26,
  //     name: "Export Provider"
  //   },
  //   {
  //     id: 27,
  //     name: "Provider Appointments List "
  //   },
  //   {
  //     id: 28,
  //     name: "Provider Patients List "
  //   },
  //   {
  //     id: 29,
  //     name: "Provider Permissions List "
  //   },
  //   {
  //     id: 30,
  //     name: "Provider Documents List"
  //   },
  //   {
  //     id: 31,
  //     name: "Provider Locations List"
  //   },
  //   {
  //     id: 32,
  //     name: "Add Provider Location"
  //   },
  //   {
  //     id: 33,
  //     name: "Edit Provider Location"
  //   },
  //   {
  //     id: 34,
  //     name: "Delete Provider Location"
  //   }]
  // } else if (auth == 3) {
  //   state.providersPermissions = [{
  //     id: 21,
  //     name: "Search Providers"
  //   },


  //   {
  //     id: 26,
  //     name: "Export Provider"
  //   },
  //   {
  //     id: 27,
  //     name: "Provider Appointments List "
  //   },
  //   {
  //     id: 28,
  //     name: "Provider Patients List "
  //   },
  //   {
  //     id: 29,
  //     name: "Provider Permissions List "
  //   },
  //   {
  //     id: 30,
  //     name: "Provider Documents List"
  //   },
  //   {
  //     id: 31,
  //     name: "Provider Locations List"
  //   },
  //   {
  //     id: 32,
  //     name: "Add Provider Location"
  //   },
  //   {
  //     id: 33,
  //     name: "Edit Provider Location"
  //   }]
  // } else {
  //   state.providersPermissions = []
  // }

}

export const staffPermissions = (state, auth) => {
  state.staffPermissions = auth.actionId
  // if (auth == 1) {
  //   state.staffPermissions = [{
  //     id: 37,
  //     name: "Add Care Coordinator "
  //   },
  //   {
  //     id: 38,
  //     name: "Edit Care Coordinator"
  //   },
  //   {
  //     id: 39,
  //     name: "Delete Care Coordinator "
  //   },
  //   {
  //     id: 40,
  //     name: "View Care Coordinator"
  //   },
  //   {
  //     id: 41,
  //     name: "Export Care Coordinators "
  //   },
  //   {
  //     id: 42,
  //     name: "Care Coordinator Appointments List"
  //   },
  //   {
  //     id: 43,
  //     name: "Care Coordinator Patients List"
  //   },
  //   {
  //     id: 44,
  //     name: "Care Coordinator Permissions List"
  //   },
  //   {
  //     id: 45,
  //     name: "Care Coordinator Documents List"
  //   },
  //   {
  //     id: 46,
  //     name: "Care Coordinator Contacts List"
  //   },
  //   {
  //     id: 47,
  //     name: "Add Care Coordinator Contact"
  //   },
  //   {
  //     id: 48,
  //     name: "Edit Care Coordinator Contact "
  //   },
  //   {
  //     id: 49,
  //     name: "Delete Care Coordinator Contact"
  //   },
  //   {
  //     id: 50,
  //     name: "Care Coordinator Availability List "
  //   },
  //   {
  //     id: 51,
  //     name: "Add Care Coordinator Availability"
  //   },
  //   {
  //     id: 52,
  //     name: "Edit Care Coordinator Availability"
  //   },
  //   {
  //     id: 53,
  //     name: "Delete Care Coordinator Availability"
  //   },
  //   {
  //     id: 54,
  //     name: "Care Coordinator Roles List"
  //   },
  //   {
  //     id: 55,
  //     name: "Add Care Coordinator Role"
  //   },
  //   {
  //     id: 56,
  //     name: "Edit Care Coordinator Role"
  //   },
  //   {
  //     id: 57,
  //     name: "Delete Care Coordinator Role "
  //   },
  //   {
  //     id: 58,
  //     name: "Care Coordinator Documents List "
  //   },
  //   {
  //     id: 59,
  //     name: "Add Care Coordinator Document "
  //   },
  //   {
  //     id: 60,
  //     name: "Edit Care Coordinator Document"
  //   },
  //   {
  //     id: 61,
  //     name: "Delete Care Coordinator Document "
  //   }
  //   ]
  // } else if (auth == 2) {
  //   state.staffPermissions = [
  //   {
  //     id: 40,
  //     name: "View Care Coordinator"
  //   },
  //   {
  //     id: 41,
  //     name: "Export Care Coordinators "
  //   },
  //   {
  //     id: 42,
  //     name: "Care Coordinator Appointments List"
  //   },
  //   {
  //     id: 43,
  //     name: "Care Coordinator Patients List"
  //   },
  //   {
  //     id: 44,
  //     name: "Care Coordinator Permissions List"
  //   },
  //   {
  //     id: 45,
  //     name: "Care Coordinator Documents List"
  //   },
  //   {
  //     id: 46,
  //     name: "Care Coordinator Contacts List"
  //   },
    
  //   {
  //     id: 50,
  //     name: "Care Coordinator Availability List "
  //   },
    
   
  //   {
  //     id: 54,
  //     name: "Care Coordinator Roles List"
  //   },
    
  //   {
  //     id: 58,
  //     name: "Care Coordinator Documents List "
  //   },
    
  //   ]
  // } else {
  //   state.staffPermissions = []
  // }
}

export const patientsPermissions = (state, permission) => {
  state.patientsPermissions = permission.actionId
//   if (auth == 1) {
//     state.patientsPermissions = [{
//       id: 62,
//       name: "Add Patient "
//     },
//     {
//       id: 63,
//       name: "Edit Patient"
//     },
//     {
//       id: 64,
//       name: "Delete Patient "
//     },
//     {
//       id: 65,
//       name: "View Patient"
//     },
//     {
//       id: 66,
//       name: "Export Patient"
//     },
//     {
//       id: 67,
//       name: "Add Patient Demographics"
//     },
//     {
//       id: 68,
//       name: "Add Patient Conditions"
//     },
//     {
//       id: 69,
//       name: "Add Patient Programs "
//     },
//     {
//       id: 70,
//       name: "Edit Patient Program"
//     },
//     {
//       id: 71,
//       name: "Add Patient Device"
//     },
//     {
//       id: 72,
//       name: "Active/Inactive Patient Device"
//     },
//     {
//       id: 73,
//       name: "Delete Patient Device"
//     },
//     {
//       id: 74,
//       name: "Add Patient Parameters"
//     },
//     {
//       id: 75,
//       name: "Add Patient Medical History"
//     },
//     {
//       id: 76,
//       name: "Edit Patient Medical History"
//     },
//     {
//       id: 77,
//       name: "Delete Patient Medical History"
//     },
//     {
//       id: 78,
//       name: "Add Patient Medication"
//     },
//     {
//       id: 79,
//       name: "Edit Patient Medication"
//     },
//     {
//       id: 80,
//       name: "Delete Patient Medication"
//     },
//     {
//       id: 81,
//       name: "Add Patient Insurance"
//     },
//     {
//       id: 82,
//       name: "Add Patient Document "
//     },
//     {
//       id: 83,
//       name: "Edit Patient Document"
//     },
//     {
//       id: 84,
//       name: "Delete Patient Document"
//     },
//     {
//       id: 85,
//       name: "Patient Notifications List"
//     },
//     {
//       id: 86,
//       name: "Patient Visits List"
//     },
//     {
//       id: 87,
//       name: "Patient Notes List"
//     },
//     {
//       id: 88,
//       name: "Patient Appointments List"
//     },
//     {
//       id: 89,
//       name: "Patient Documents List"
//     },
//     {
//       id: 90,
//       name: "Add Patient Time Tracked"
//     },
//     {
//       id: 91,
//       name: "Add Appointment"
//     },
//     {
//       id: 92,
//       name: "Add Vital Summary"
//     },
//     {
//       id: 93,
//       name: "Add Vitals"
//     },
//     {
//       id: 94,
//       name: "View Vitals"
//     },
//     {
//       id: 95,
//       name: "Add Notes"
//     },
//     {
//       id: 96,
//       name: "Patient Notes Detail "
//     },
//     {
//       id: 97,
//       name: "Patient Document Detail"
//     },
//     {
//       id: 98,
//       name: "Patient Time Logs Detail "
//     },
//     {
//       id: 99,
//       name: "Edit Patient Time Logs"
//     },
//     {
//       id: 100,
//       name: "Delete Patient Time Logs"
//     },
//     {
//       id: 101,
//       name: "Patient Device Detail "
//     },
//     {
//       id: 102,
//       name: "Edit Patient Device"
//     },
//     {
//       id: 103,
//       name: "Add Documents"
//     },
//     {
//       id: 104,
//       name: "Add Care Team"
//     },
//     {
//       id: 105,
//       name: "Add TimeLogs "
//     },
//     {
//       id: 106,
//       name: "Add Devices"
//     }]
//   } else if (auth == 2) {
//     state.patientsPermissions = [
//     {
//       id: 63,
//       name: "Edit Patient"
//     },
//     {
//       id: 64,
//       name: "Delete Patient "
//     },
    
    
//     {
//       id: 67,
//       name: "Add Patient Demographics"
//     },
//     {
//       id: 68,
//       name: "Add Patient Conditions"
//     },
//     {
//       id: 69,
//       name: "Add Patient Programs "
//     },
//     {
//       id: 70,
//       name: "Edit Patient Program"
//     },
//     {
//       id: 71,
//       name: "Add Patient Device"
//     },
//     {
//       id: 72,
//       name: "Active/Inactive Patient Device"
//     },
//     {
//       id: 73,
//       name: "Delete Patient Device"
//     },
//     {
//       id: 74,
//       name: "Add Patient Parameters"
//     },
//     {
//       id: 75,
//       name: "Add Patient Medical History"
//     },
//     {
//       id: 76,
//       name: "Edit Patient Medical History"
//     },
//     {
//       id: 77,
//       name: "Delete Patient Medical History"
//     },
//     {
//       id: 78,
//       name: "Add Patient Medication"
//     },
//     {
//       id: 79,
//       name: "Edit Patient Medication"
//     },
//     {
//       id: 80,
//       name: "Delete Patient Medication"
//     },
//     {
//       id: 81,
//       name: "Add Patient Insurance"
//     },
//     {
//       id: 82,
//       name: "Add Patient Document "
//     },
//     {
//       id: 83,
//       name: "Edit Patient Document"
//     },
//     {
//       id: 84,
//       name: "Delete Patient Document"
//     },
//     {
//       id: 85,
//       name: "Patient Notifications List"
//     },
//     {
//       id: 86,
//       name: "Patient Visits List"
//     },
//     {
//       id: 87,
//       name: "Patient Notes List"
//     },
//     {
//       id: 88,
//       name: "Patient Appointments List"
//     },
//     {
//       id: 89,
//       name: "Patient Documents List"
//     },
//     {
//       id: 90,
//       name: "Add Patient Time Tracked"
//     },
//     {
//       id: 91,
//       name: "Add Appointment"
//     },
//     {
//       id: 92,
//       name: "Add Vital Summary"
//     },
//     {
//       id: 93,
//       name: "Add Vitals"
//     },
//     {
//       id: 94,
//       name: "View Vitals"
//     },
//     {
//       id: 95,
//       name: "Add Notes"
//     },
//     {
//       id: 96,
//       name: "Patient Notes Detail "
//     },
//     {
//       id: 97,
//       name: "Patient Document Detail"
//     },
//     {
//       id: 98,
//       name: "Patient Time Logs Detail "
//     },
//     {
//       id: 99,
//       name: "Edit Patient Time Logs"
//     },
//     {
//       id: 100,
//       name: "Delete Patient Time Logs"
//     },
//     {
//       id: 101,
//       name: "Patient Device Detail "
//     },
//     {
//       id: 102,
//       name: "Edit Patient Device"
//     },
//     {
//       id: 103,
//       name: "Add Documents"
//     },
//     {
//       id: 104,
//       name: "Add Care Team"
//     },
//     {
//       id: 105,
//       name: "Add TimeLogs "
//     },
//     {
//       id: 106,
//       name: "Add Devices"
//     }]
//   } else {
//     state.patientsPermissions = []
//   }

 }

export const communicationPermissions = (state, auth) => {
  state.communicationPermissions= auth.actionId
}
//   if (auth == 1) {
//     state.communicationPermissions = [{
//       id: 107,
//       name: "Start Call"
//     },
//     {
//       id: 108,
//       name: "End Call"
//     },
//     {
//       id: 109,
//       name: "Send Message"
//     },
//     {
//       id: 110,
//       name: "Export Communications"
//     },
//     {
//       id: 111,
//       name: "Add Notes"
//     }]
//   } else if (auth == 2) {
//     state.communicationPermissions = [{
//       id: 107,
//       name: "Start Call"
//     },
//     {
//       id: 108,
//       name: "End Call"
//     },
//     {
//       id: 109,
//       name: "Send Message"
//     },
   
//     ]
//   } else if (auth == 3) {
//     state.communicationPermissions = [{
//       id: 107,
//       name: "Start Call"
//     },
//     {
//       id: 108,
//       name: "End Call"
//     },
//     {
//       id: 109,
//       name: "Send Message"
//     }]
//   } else {
//     state.communicationPermissions = []
//   }

// }

 export const appointmentCalendarPermissions = (state, auth) => {
  state.appointmentCalendarPermissions= auth.actionId
 }
//   if (auth == 1) {
//     state.appointmentCalendarPermissions = [{
//       id: 112,
//       name: "Add Appointment"
//     }]
//   } else if (auth == 2) {
//     state.appointmentCalendarPermissions = [{
//       id: 112,
//       name: "Add Appointment"
//     }
//     ]
//   }else {
//     state.appointmentCalendarPermissions = []
//   }

// }


export const tasksDashboardPermissions = (state, auth) => {
  state.tasksDashboardPermissions = auth.actionId
}
//   if (auth == 1) {
//     state.tasksDashboardPermissions = [{
//       id: 113,
//       name: "Add Task"
//     },
//     {
//       id: 114,
//       name: "Filter Tasks"
//     },
//     {
//       id: 115,
//       name: "Edit Task"
//     },
//     {
//       id: 116,
//       name: "Delete Task"
//     },
//     {
//       id: 117,
//       name: "Active/Inactive Task"
//     },
//     {
//       id: 118,
//       name: "Export Tasks"
//     }]
//   } else if (auth == 2) {
//     state.tasksDashboardPermissions = [{
//       id: 113,
//       name: "Add Task"
//     },
//     {
//       id: 114,
//       name: "Filter Tasks"
//     },
//     {
//       id: 117,
//       name: "Active/Inactive Task"
//     },
//     {
//       id: 118,
//       name: "Export Tasks"
//     }]
//   }  else {
//     state.communicationPermissions = []
//   }
