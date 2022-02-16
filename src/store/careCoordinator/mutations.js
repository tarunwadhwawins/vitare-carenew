
 export const counterPlus = (state) => {
  state.counter++
}

export const counterMinus = (state) => {
  state.counter--
}

export const resetCounter = (state) => {
  state.counter = 0
}

export const addStaff= async (state, data) => {
    state.addStaff = data;
}


export const updateStaff= async (state, data) => {
  state.updateStaff = data;
}

export const errorMsg = (state, data) => {
  state.errorMsg = data
}

export const specializationStaff = (state, data) => {
  state.specializationStaff = data
}

export const networkStaff = (state, data) => {
  state.networkStaff = data
}

export const staffs= async (state, data) => {
    state.staffs = data;
    state.columns = [
        {
          title: "Name",
          dataIndex: "fullName",
          sorter: {
            compare: (a, b) => a.first_name - b.first_name,
            multiple: 3,
          },
          slots: {
            customRender: "name",
          },
        },
        // {
        //   title: "Last Name",
        //   dataIndex: "last_name",
        //   sorter: {
        //     compare: (a, b) => a.last_name - b.last_name,
        //     multiple: 3,
        //   },
        // },
        {
          title: "Role",
          dataIndex: "role.name",
          sorter: {
            compare: (a, b) => a.role - b.role,
            multiple: 3,
          },
        },
        {
          title: "Specialization",
          dataIndex: "specialization",
          sorter: {
            compare: (a, b) => a.specialization - b.specialization,
            multiple: 2,
          },
        },
        {
          title: "Network",
          dataIndex: "network",
          sorter: {
            compare: (a, b) => a.network - b.network,
            multiple: 1,
          },
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          sorter: {
            compare: (a, b) => a.created_at - b.created_at,
            multiple: 1,
          },
          slots: {
            customRender: "createdDate",
          },
        },
        {
          title: "Status",
          dataIndex: "status",
          sorter: {
            compare: (a, b) => a.status - b.status,
            multiple: 1,
          },
        },
        // {
        //   title: "Action",
        //   dataIndex: "action",
        //   slots: {
        //     customRender: "action",
        //   },
        // },
      ];
}



export const addContacts = (state, data) => {
  state.addContacts = data
}

export const staffContactList = (state, data) => {
  state.staffContactList = data
  state.staffContactColms = [{
    title: "First Name",
    dataIndex: "firstName",
},
{
    title: "Last Name",
    dataIndex: "lastName",
},
{
    title: "Email",
    dataIndex: "email",
},
{
    title: "Phone No",
    dataIndex: "phoneNumber",
},
{
    title: "Actions",
    dataIndex: "actions",
    slots: {
        customRender: "action",
    },
},
];
}



export const addAvailability = (state, data) => {
  state.addAvailability = data
}

export const availabilityList = (state, data) => {
  state.availabilityList = data,
  state.availabilityListColms =[{
    title: "Start Time",
    dataIndex: "startTime",
  },
  {
    title: "End Time",
    dataIndex: "endTime",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
        customRender: "action",
    },
  },
  ];
}


export const addStaffRole = (state, data) => {
  state.addStaffRole = data
}

export const roleList = (state, data) => {
  state.roleList = data,
  state.roleListColms = [
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "action",
      },
    },
  ];
}


export const addProvider = (state, data) => {
  state.addProvider = data
}


export const providerList = (state, data) => {
  state.providerList = data
  state.providerListColms = [
    {
      title: "Provider Name",
      dataIndex: "name",
    },
  
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "action",
      },
    },
  ];
  
}



export const roles = (state, data) => {
  state.roles = data
}


export const providers = (state, data) => {
  state.providers = data
}


export const staffPermissions = (state, auth) => {
  if (auth == 1) {
    state.staffPermissions = [{
        id: 1,
        name: "Add New Coordinator"
    },
    {
        id: 2,
        name: "Counter Card"
    },
    {
        id: 3,
        name: "Export to Excel"
    },
    {
        id: 4,
        name: "List Table"
    }]
}else if(auth == 2){
    state.staffPermissions = [
 {
     id: 2,
     name: "Counter Card"
 },
 
 {
     id: 4,
     name: "List Table"
 }]
}

}