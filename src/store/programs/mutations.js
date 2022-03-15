export const programList = async (state, data) => {
 
  state.programColumns = [
    {
      title: "Program Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: (a, b) => a.description - b.description,
        multiple: 3,
      },
    },
    {
      title: "Active/Inactive",
      dataIndex: "status",
      slots: {
        customRender: "status",
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "actions",
      },
    },
  ]
  state.programList = data.data.map((item, index) => {
    item.status = item.status == 1 ? true : false
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
    item.isActive = item.status == 1 ? true : false
    return item
  })
}


