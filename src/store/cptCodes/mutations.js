export const cptCodesList = async (state, cptCodes) => {
 state.cptCodesColumns = [
    {
      title: "Cpt Code",
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
      title: "Billing Amount",
      dataIndex: "billingAmout",
      sorter: {
        compare: (a, b) => a.billingAmout - b.billingAmout,
        multiple: 2,
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
  ];
  state.cptCodesList = cptCodes.data;
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