export const tasksListSuccess = async (state, tasks) => {
  state.tasksList = tasks;
}

export const taskStatusSuccess = async (state, status) => {
  state.taskStatus = status;
}

export const taskPrioritySuccess = async (state, priorities) => {
  state.taskPriority = priorities;
}

