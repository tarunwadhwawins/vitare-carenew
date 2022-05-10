
import {
  createdAtDateFormat
} from '../../commonMethods/commonMethod';

/**
 * Groups
*/

export const createGroup = async(state, data) => {
  if(data) {
    data.isActive = data.isActive == 1 ? true : false
  }
  state.createGroup = data;
}

export const groupDetails = async(state, group) => {
  group.isActive = group.isActive == 1 ? true : false
  state.groupDetails = group;
}

export const groupsList = async(state, data) => {
  state.groupsList = data.map(item => {
    item.createdAt = createdAtDateFormat(item.createdAt)
    item.isActive = item.isActive ? true : false
    return item
  });
}

/**
 * Group Staff
*/

export const searchStaff = async(state, data) => {
  state.searchStaff = data;
}

export const addStaffToGroup = async(state, data) => {
  state.addStaffToGroup = data;
}

export const groupStaffList = async(state, data) => {
  state.groupStaffList = data.map(item => {
    item.fullName = item.firstName+' '+item.lastName
    return item
  });
}

/**
 * Group Programs
*/

export const searchProgram = async(state, data) => {
  state.searchProgram = data;
}

export const addProgramToGroup = async(state, data) => {
  state.addProgramToGroup = data;
}

export const groupProgramsList = async(state, data) => {
  state.groupProgramsList = data
}

/**
 * Group Providers
*/

export const searchProvider = async(state, data) => {
  state.searchProvider = data;
}

export const addProviderToGroup = async(state, data) => {
  state.addProviderToGroup = data;
}

export const groupProvidersList = async(state, data) => {
  state.groupProvidersList = data
}

/**
 * Group Permissions
*/

export const addGroupPermissions = async(state, data) => {
  state.addGroupPermissions = data
}

export const groupPermissionsModules = async (state, data) => {
  state.groupPermissionsModules = data;
}

export const groupPermissions = async (state, data) => {
  state.groupPermissions = data;
}

/**
 * Stepper Counter
*/

export const counterPlus = (state) => {
  state.counter++
}

export const counterMinus = (state) => {
  state.counter--
}

export const resetCounter = (state) => {
  state.counter = 0
}

export const errorMsg = (state, data) => {
  state.errorMsg = data
}