
import {
  createdAtDateFormat
} from '../../commonMethods/commonMethod';

export const createGroup = async(state, data) => {
  state.createGroup = data;
}

export const updateGroup = async(state, data) => {
  state.updateGroup = data;
}

export const searchStaff = async(state, data) => {
  state.searchStaff = data;
}

export const searchProgram = async(state, data) => {
  state.searchProgram = data;
}

export const searchProvider = async(state, data) => {
  state.searchProvider = data;
}

export const groupsList = async(state, data) => {
  state.groupsList = data.map(item => {
    item.createdAt = createdAtDateFormat(item.createdAt)
    item.isActive = item.isActive ? true : false
    return item
  });
}

export const groupDetails = async(state, group) => {
  group.isActive = group.isActive ? true : false
  state.groupDetails = group;
}

export const addStaffToGroup = async(state, data) => {
  state.addStaffToGroup = data;
}

export const groupStaffList = async(state, data) => {
  state.groupStaffList = data;
}