import { dateOnlyFormatSImple, yaxis, dataLabels, plotOptions, dateOnlyFormat } from '../../commonMethods/commonMethod';
import moment from "moment"
export const task = async (state, tasks) => {
  state.tasksList = tasks.data.map(element => {
    element.dueDate = dateOnlyFormat(element.dueDate)
    element.category = element.category.map(item => item.taskCategory)
    return element;
  });
  state.taskMeta = tasks.meta.pagination
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
  //console.log("status",status)
  state.taskStatus = status;
  state.incompleteAllTask = status.map(item => item.total)
  state.completedAllTask = {
    chart: {
      type: "pie",
    },
    labels: status.map(item => item.text),
    colors: status.map(item => item.color),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  }



  // for completion

  // state.completionSeries = status.map(item => {
  //   item.name = item.text,
  //     item.data = status.map(item => item.total)
  //   return item
  // })


  // [
  //   {
  //     name: "Complete",
  //     data: status.map(item=>item.total)
  //   },
  //   {
  //     name: "Incomplete",
  //     data: status.map(item=>item.total)
  //   },
  // ];


}
export const completeTaskRate = async (state, count) => {
  
  state.completeTaskRate = count.taskCompletionRates;
 
}

export const allTaskStatusSuccess = async (state, status) => {
  
  state.allTaskStatus = status;
  let task=[]
  const completed = status.filter(object => Object.values(object).includes('Completed'));
  let today = moment();
    today.subtract(7, 'days')
    for (let i = 0; i < 7; i++) {
      var day = today.add(1, 'days');
      // status.forEach((item)=>{
      //   let obj = item.includes(day.format('dddd'))
        
      // })
      const results = completed.filter(object => Object.values(object).includes(day.format('dddd')));
      let obj = ''
if(results.length>0){
  results.forEach((items)=>{
      task.push({
        count:items.total,
        time:items.time
      })
  })
  
}else{
  obj= {count:0,
  time:day.format('dddd')
  }
  task.push(obj)
    }
    
  }
  // state.completionSeries = [{
  //   name :'Completed',
  //     data : task.map(item => item.total)
  // }]
  state.completionSeries = [{
    name: "Complete",
    data: task.map((item) => { return item.count}),
  },
 ]
  state.completionOptions = {
    chart: {
      
      
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#0fb5c2"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      
      categories: task.map((item) => {return item.time}),
    },
    yaxis: yaxis("Task Count"),
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  //console.log("task",task.map(item => item.count))

  // [
  //   {
  //     name: "Complete",
  //     data: status.map(item=>item.total)
  //   },
  //   {
  //     name: "Incomplete",
  //     data: status.map(item=>item.total)
  //   },
  // ];
  

}

export const taskPriority = async (state, priorities) => {
  state.taskPriority = {
    optionPriority: {
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
      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
      colors: priorities.map((item) => { return item.color }),
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
        categories: priorities.map((item) => { return item.text }),
      },
      yaxis: yaxis("Task Count")
    },
    seriesPriority: [
      {
        name: "Task Count",
        data: priorities.map((item) => { return item.total }),
      },
    ],

  };
}


export const taskTeamMember = async (state, TeamMember) => {
  let teamTopMember=[]
  TeamMember.map((item,index) => { if(index<=4){teamTopMember.push(item) }})
  
  //console.log("teamTopMember",teamTopMember)
  state.taskTeamMember = {
    optionTeamMember: {
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
      plotOptions: plotOptions(10, "20%", "100%", true, false, "bottom"),
      dataLabels: dataLabels(false),
      // colors: TeamMember.map((item) => { return  item.color  }),
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
        categories: teamTopMember.map((item) => {return item.text }),
      },
      yaxis: yaxis("Task Count")
    },
    seriesTeamMember: [
      {
        name: "Task Count",
        data: teamTopMember.map((item) => { return item.total }),
      },
    ],

  };
}

export const taskCategory = async (state, TeamMember) => {

  state.taskCategory.business = TeamMember.map(item => item.total)
  state.taskCategory.premium = {
    chart: {
      width: 412,
      type: "pie",
    },
    labels: TeamMember.map(item => item.text),
    colors: ["#0fb5c2", "#40a9ff", "#267dff", "#8e60ff"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
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
  state.editTask.assignedTo.forEach((item)=>{
    state.editTask.entityType= item.entityType
  })
  state.editTask.assignedTo = state.editTask.assignedTo.map((item) => item.id)
  state.editTask.taskCategory = state.editTask.category.map((item) => item.id)
  state.editTask.dueDate = dateOnlyFormatSImple(state.editTask.dueDate)
  state.editTask.startDate = dateOnlyFormatSImple(state.editTask.startDate)
  state.editTask.priority = state.editTask.priorityId,
    state.editTask.taskStatus = state.editTask.taskStatusId

  // state.editTask.taskCategory = JSON.parse(state.editTask.taskCategory)
  state.editTask
}


export const updateTask = async (state, result) => {
  state.updateTask = result;
}


export const latestTaskSuccess = async (state, result) => {
  if (result && result.length > 0) {
    result.date = dateOnlyFormat(result.date);
    state.latestTask = result;
  }
  else {
    state.latestTask = null
  }
}


export const taskPermissions = (state, permission) => {
  state.taskPermissions = permission.actionId
  // if (auth == 1) {

  //   state.taskPermissions = [{
  //     id: 1,
  //     name: "Add New Task"
  //   },
  //   {
  //     id: 2,
  //     name: "Dashboard View"
  //   },
  //   {
  //     id: 3,
  //     name: "List View"
  //   },

  //   {
  //     id: 4,
  //     name: "Counter Card"
  //   },
  //   {
  //     id: 5,
  //     name: "Task Bar"
  //   },
  //   {
  //     id: 6,
  //     name: "List Table"
  //   },
  //   {
  //     id: 7,
  //     name: "Table Action"
  //   }
  // ]
  // } else if (auth == 2) {
  //   state.taskPermissions = [
  //     {
  //       id: 2,
  //       name: "Dashboard View"
  //     },
  //     {
  //       id: 3,
  //       name: "List View"
  //     },
  //     {
  //       id: 4,
  //       name: "Counter Card"
  //     },

  //     {
  //       id: 6,
  //       name: "List Table"
  //     },
  //   ]
  // }else{
  //   state.patientsPermissions =[]
  // }

}
