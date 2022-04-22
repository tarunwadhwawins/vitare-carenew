export const cptCode = async (state, cptCodes) => {
 state.cptCodesColumns = [
    {
      title: "Cpt Code",
      dataIndex: "name",
      sorter:true
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter:true
    },
    {
      title: "Billing Amount",
      dataIndex: "billingAmout",
      sorter:true
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      slots: {
        customRender: "isActive",
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      slots: {
        customRender: "actions",
      },
    },
  ];
  state.cptCodesList = cptCodes.data.map((item)=>{
    item.billingAmout = '$ ' + item.billingAmout 
    return item
  });
  state.cptMeta=cptCodes.meta ? cptCodes.meta.pagination : ''
}

export const addCptCode = async (state, cptCode) => {
  state.addCptCode = cptCode;
}

export const deleteCptCode = async (state, cptCode) => {
  state.deleteCptCode = cptCode;
}

export const cptCodeDetails = async (state, cptCode) => {
  //console.log(cptCode)
  state.cptCodeDetails = cptCode;
}

export const updateCptCode = async (state, cptCode) => {
  state.updateCptCode = cptCode;
}
export const service = async (state, service) => {
  state.service = service;
}