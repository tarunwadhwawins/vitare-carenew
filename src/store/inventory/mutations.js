// import { dateFormat } from '../../commonMethods/commonMethod';

export const addInventorySuccess = async (state, inventory) => {
  state.addInventory = inventory;
}

export const inventory = async (state, inventories) => {
  state.inventoriesList = inventories.data;
  state.inventoryMeta = inventories.meta.pagination
}

export const inventoryDetailsSuccess = async (state, inventory) => {
  inventory.isActive = inventory.status;
  state.inventoryDetails = inventory;
}

export const updateInventorySuccess = async (state, inventories) => {
  state.updateInventory = inventories;
}

export const deleteInventorySuccess = async (state, inventories) => {
  state.deleteInventory = inventories;
}

export const deviceModalsListSuccess = async (state, inventories) => {
  state.deviceModalsList = inventories.map(item=>{
    item.name = item.modelNumber
    return item;
  });
}