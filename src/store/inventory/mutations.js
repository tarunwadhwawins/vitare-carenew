// import { dateFormat } from '../../commonMethods/commonMethod';

export const addInventorySuccess = async (state, inventory) => {
  state.addInventory = inventory;
}

export const inventoriesListSuccess = async (state, inventories) => {
  state.inventoriesList = inventories;
}

export const inventoryDetailsSuccess = async (state, inventories) => {
  state.inventoryDetails = inventories;
}

export const updateInventorySuccess = async (state, inventories) => {
  state.updateInventory = inventories;
}

export const deleteInventorySuccess = async (state, inventories) => {
  state.deleteInventory = inventories;
}