export const program = async (state, data) => {
 
  state.programColumns = [
    {
      title: "Program Name",
      dataIndex: "name",
      sorter:true
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter:true
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      slots: {
        customRender: "isActive",
      },
    },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   slots: {
    //     customRender: "actions",
    //   },
    // },
  ]
  state.manageProgramList = data.data.map((item, index) => {
    item.isActive = item.isActive == 1 ? true : false
    item.key = index
    return item
  })
  state.programMeta = data.meta ? data.meta.pagination : ''
}
export const programMsg = async (state, data) => {
  state.programMsg = data
}
export const editProgram = async (state, data) => {
  state.editProgram = data.map((item) => {
    item.status = item.status == 1 ? true : false
    return item
  })
}


