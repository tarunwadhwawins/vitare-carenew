
export const addStaff= async (state, data) => {
    state.addStaff = data;
}

export const errorMsg = (state, data) => {
  state.errorMsg = data
}
export const successMsg = (state, data) =>{
  state.successMsg = data
}
export const searchAppointmentSuccess= async (state, data) => {
  const test = [{
    time:"08:00AM",
  data:[
    {
        "id": 11,
        "startDate": "2022-01-21",
        "startTime": "11:00:00",
        "staff": "super admin",
        "patient": "Ramsey Gordon"
    },
    {
        "id": 12,
        "startDate": "2022-01-21",
        "startTime": "11:00:00",
        "staff": "super admin",
        "patient": "Ramsey Gordon"
    }, 
]},{
time:"09:00 AM",
data:[]},{
time:"011:00 AM",
data:
  [{
      "id": 14,
      "startDate": "2022-01-27",
      "startTime": "11:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  {
      "id": 15,
      "startDate": "2022-01-27",
      "startTime": "11:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  {
      "id": 16,
      "startDate": "2022-01-28",
      "startTime": "11:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  
]},{
time:"01:00 PM",
 data:
  [
  {
      "id": 25,
      "startDate": "2022-01-27",
      "startTime": "16:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  {
      "id": 26,
      "startDate": "2022-01-27",
      "startTime": "16:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  {
      "id": 27,
      "startDate": "2022-01-27",
      "startTime": "13:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  }
]},{
time:"02:00 PM",
 data:
  [
  {
      "id": 25,
      "startDate": "2022-01-27",
      "startTime": "16:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  {
      "id": 26,
      "startDate": "2022-01-27",
      "startTime": "16:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  },
  {
      "id": 27,
      "startDate": "2022-01-27",
      "startTime": "13:00:00",
      "staff": "Ramsey1 Gordon",
      "patient": "Ramsey Gordon"
  }
]},{
time:"03:00 PM",
 data:
  []
}]
  state.searchAppointmentRecords = test;
}
