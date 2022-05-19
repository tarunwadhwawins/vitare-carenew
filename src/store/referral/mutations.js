export const referralColumns = async (state) => {
  state.referralColumns = [
    {
      title: "Name",
      dataIndex: "name",
      //sorter:true
    },
    {
      title: "Email",
      dataIndex: "email",
      //sorter:true
    },
    {
      title: "Patients Name",
      dataIndex: "patientName",
      //sorter:true
      slots: {
        customRender: "patientName",
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
      //sorter:true
    },
  
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   slots: {
    //     customRender: "actions",
    //   },
    // },
  ];
}
export const referralList = async (state, referral) => {
 
  state.referralList = referral.data
  state.referralMeta=referral.meta ? referral.meta.pagination : ''
}

