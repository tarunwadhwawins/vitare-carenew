import {meridiemFormatFromTimestamp,} from '../../commonMethods/commonMethod';


export const timeLogReportList = async (state, data) => {
  state.timeLogReportList = data.map(item=>{
    item.timeAmount = meridiemFormatFromTimestamp(item.timeAmount)
    return item
  }),
  state.timeLogReportColumns =[
    {
      title: "Staff",
      dataIndex: "performedBy",
      sorter: {
        compare: (a, b) => a.template - b.template,
        multiple: 3,
      },
      slots: {
        customRender: "staff",
      },
    },
    {
      title: "Patient",
      dataIndex: "patient",
      sorter: {
        compare: (a, b) => a.template - b.template,
        multiple: 3,
      },
      slots: {
        customRender: "patient",
      },
    },
    {
      title: "Time (MM:SS)",
      dataIndex: "timeAmount",
      sorter: {
        compare: (a, b) => a.template - b.template,
        multiple: 3,
      },
    },
    {
      title: "Flag ",
      dataIndex: "flag",
      slots: {
        customRender: "flag",
      },
    },
    {
      title: "Notes ",
      dataIndex: "notes",
    },
  
    {
      title: "Actions",
      dataIndex: "id",
      slots: {
        customRender: "actions",
      },
    },
  ];
}

