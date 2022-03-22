import { dateFormat } from '../../commonMethods/commonMethod';

export const globalCodesListSuccess = async (state, globalCodes) => {
  const codesList = [];
  globalCodes.map(codes => {
    codes.globalCode.map(code => {
      code.status = code.status == 1 ? true : false
      codesList.push(code)
    })
  });
  state.globalCodesList = codesList;
}

export const searchGlobalCodesSuccess = async (state, globalCodes) => {
  state.globalCodesList = globalCodes.map(globalCode => {
    globalCode.createdAt = dateFormat(globalCode.createdAt);
    return globalCode;
  })
}

export const addGlobalCodeSuccess = async (state, globalCode) => {
  state.addGlobalCode = globalCode;
}

export const deleteGlobalCodeSuccess = async (state, globalCode) => {
  state.deleteGlobalCode = globalCode;
}

export const globalCodeDetailsSuccess = async (state, globalCode) => {
  state.globalCodeDetails = globalCode
}

export const updateGlobalCodeSuccess = async (state, globalCode) => {
  state.updateGlobalCode = globalCode;
}