import { dateFormat } from '../../commonMethods/commonMethod';
export const tasksListSuccess = async (state, tasks) => {
  state.tasksList = tasks.map(element => {
    element.dueDate = dateFormat(element.dueDate)
    return element;
  });

  state.tasksListColumns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      slots: {
        customRender: "taskName",
      },
      filters: [
        {
          text: "Task 1",
          value: "task 1",
        },
        {
          text: "Task 2",
          value: "task 2",
        },
      ],
      onFilter: (value, record) => record.taskName.indexOf(value) === 0,
    },
    {
      title: "Status ",
      dataIndex: "status",
      slots: {
        customRender: "status",
      },
    },
    {
      title: "Priority ",
      dataIndex: "priority",
      filters: [
        {
          text: "High",
          value: "high",
        },
        {
          text: "Normal",
          value: "normal",
        },
        {
          text: "Urgent",
          value: "urgent",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
      filters: [
        {
          text: "Dec 24, 2021",
          value: "Dec 24, 2021",
        },
        {
          text: "Dec 28, 2021",
          value: "Dec 28, 2021",
        },
      ],
      onFilter: (value, record) => record.dueDate.indexOf(value) === 0,
    },
    {
      title: "Assigned By",
      dataIndex: "assignedBy",
      filters: [
        {
          text: "John",
          value: "John",
        },
        {
          text: "	Devin",
          value: "	Devin",
        },
      ],
      slots: {
        customRender: "assigned",
      },
      onFilter: (value, record) => record.assignedBy.indexOf(value) === 0,
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

export const taskPrioritySuccess = async (state, priorities) => {
  state.taskPriority = priorities;
}

export const searchTasksSuccess = async (state, result) => {
  state.tasksList = result;
}

export const addTaskSuccess = async (state, result) => {
  state.addTaskSuccess = result;
}

export const letastTaskSuccess = async (state, result) => {
  state.letastTask = result;
}

