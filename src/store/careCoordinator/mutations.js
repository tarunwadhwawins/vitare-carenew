
export const addStaff= async (state, data) => {
    state.addStaff = data;
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
        {
          title: "Action",
          dataIndex: "action",
          slots: {
            customRender: "action",
          },
        },
      ];
}
