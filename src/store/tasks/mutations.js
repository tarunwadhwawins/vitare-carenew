import { dateFormat,dateOnlyFormatSImple,yaxis, dataLabels, plotOptions } from '../../commonMethods/commonMethod';
export const tasksListSuccess = async (state, tasks) => {
  state.tasksList = tasks.map(element => {
    element.dueDate = dateFormat(element.dueDate)
    element.category = element.category.map(item=>item.taskCategory)
    return element;
  });

  state.tasksListColumns = [
    {
      title: "Task Name",
      dataIndex: "title",
      slots: {
        customRender: "taskName",
      },
      // filters: [
      //   {
      //     text: "Task 1",
      //     value: "task 1",
      //   },
      //   {
      //     text: "Task 2",
      //     value: "task 2",
      //   },
      // ],
      // onFilter: (value, record) => record.taskName.indexOf(value) === 0,
    },
    {
      title: "Task Status ",
      dataIndex: "taskStatus",
      slots: {
        customRender: "status",
      },
    },
    {
      title: "Priority ",
      dataIndex: "priority",
    //   filters: [
    //     {
    //       text: "High",
    //       value: "high",
    //     },
    //     {
    //       text: "Normal",
    //       value: "normal",
    //     },
    //     {
    //       text: "Urgent",
    //       value: "urgent",
    //     },
    //   ],
    //   onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Category",
      dataIndex: "category",
      slots: {
        customRender: "category",
      },
    },
    {
      title: "Due Date ",
      dataIndex: "dueDate",
    //   filters: [
    //     {
    //       text: "Dec 24, 2021",
    //       value: "Dec 24, 2021",
    //     },
    //     {
    //       text: "Dec 28, 2021",
    //       value: "Dec 28, 2021",
    //     },
    //   ],
    //   onFilter: (value, record) => record.dueDate.indexOf(value) === 0,
    },
    {
      title: "Assigned By",
      dataIndex: "assignedBy",
      // filters: [
      //   {
      //     text: "John",
      //     value: "John",
      //   },
      //   {
      //     text: "	Devin",
      //     value: "	Devin",
      //   },
      // ],
      slots: {
        customRender: "assigned",
      },
      // onFilter: (value, record) => record.assignedBy.indexOf(value) === 0,
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

export const taskStatusSuccess = async (state, status) => {
  state.taskStatus = status;
}

export const taskPriority = async (state, priorities) => {
  

  state.taskPriority ={
    option1: {
      annotations: {
        points: [
          {
            x: "In",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
            },
          },
        ],
      },
      chart: {
        type: "bar",
      },
      plotOptions: plotOptions(10,"20%","100%",true,false,"bottom"),
      dataLabels: dataLabels(false),
      colors: priorities.map((item) => { return  item.color  }),
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: priorities.map((item) => { return  item.text }),
      },
      yaxis: yaxis("Patients")
    },
    series1: [
      {
        name: "Patients",
        data: priorities.map((item) => { return  item.total }),
      },
    ],

  };
}

export const searchTasksSuccess = async (state, result) => {
  state.tasksList = result;
}

export const addTask = async (state, result) => {
  state.addTask = result;
}

export const editTask = async (state, result) => {
  state.editTask = result;
  state.editTask.assignedTo = state.editTask.assignedTo.map((item) => item.id)
  state.editTask.taskCategory = state.editTask.category.map((item) => item.id)
  state.editTask.dueDate = dateOnlyFormatSImple(state.editTask.dueDate)
  state.editTask.startDate = dateOnlyFormatSImple(state.editTask.startDate)
  state.editTask.priority = state.editTask.priorityId,
  state.editTask.taskStatus = state.editTask.taskStatusId
  
  
  // state.editTask.assignedTo = JSON.parse(state.editTask.assignedTo)
  // state.editTask.taskCategory = JSON.parse(state.editTask.taskCategory)
  state.editTask
}


export const updateTask = async (state, result) => {
  state.updateTask = result;
}


