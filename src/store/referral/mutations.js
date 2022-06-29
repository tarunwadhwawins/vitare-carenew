export const referralColumns = async (state) => {
  state.referralColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter:true
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter:true
    },
    {
      title: "Patients Name",
      dataIndex: "patientName",
      sorter:true,
      slots: {
        customRender: "patientName",
      },
    },
    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   sorter:true
    // },
  
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   slots: {
    //     customRender: "actions",
    //   },
    // },
  ];
}
export const referral = async (state, referral) => {
 
  state.referral = referral.data
  state.referralMeta=referral.meta ? referral.meta.pagination : ''
}

