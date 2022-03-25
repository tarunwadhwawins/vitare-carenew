export const errorMsg = (state, data) => {
  state.errorMsg = data
}
export const providerData = (state, data) => {
  state.provider = data
}
export const providerLocation = (state, data) => {
  state.providerLocation = data
}

export const provider = (state, data) => {

  state.providersListAll = data.map(element => {
    element.status = element.status == 1 ? true : false
    return element;
  })

  state.providerListColumns = [
    {
      title: "Provider Name",
      dataIndex: "name", 
      slots: {
        customRender: "name",

      },
    },
    {
      title: "Provider Address",
      dataIndex: "address",
    },
    {
      title: "Active/Inactive",
      dataIndex: "status",
      slots: {
        customRender: "status",
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

export const editSingleProvider = async (state, result) => {
  state.editSingleProvider = result;
  result.tagId = JSON.parse(result.tagId);
  result.moduleId = JSON.parse(result.moduleId);
}
export const providerLocationList = (state, data) => {
  state.providerLocationList = ""
  state.providerLocationList = data.map(element => {
    return element;
  })
  state.columns = [
    {
      title: "Location Name",
      dataIndex: "locationName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "No. of Location",
      dataIndex: "noOfLocations",
    },
    {
      title: "Address",
      dataIndex: "address",
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

export const updateSingleProvider = (state, data) => {
  state.updateSingleProvider = data
}


