
export const getVitals = async (state, data) => {
  state.vitalData = ''
  state.vitalData = data

}
export const vitalSuccessMsg = async (state, data) => {

  state.vitalSuccessMsg = data

}
export const vitalSuccessList = async (state, data) => {
  state.vitalList=''
  let record = []
  data.map(element => {
    let count = element.generalparameter.data.length
    element.generalparameter.data.forEach((data, index) => {
      data['key'] = index
      if (index == 0)
        data['data'] = count
      else {
        data['data'] = 0
      }
      record.push(data)
    })
  });
  console.log("check",record)
  state.vitalList = record

}
