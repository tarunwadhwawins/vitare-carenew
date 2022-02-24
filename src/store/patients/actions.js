import serviceMethod from '@/services/serviceMethod';
import { successSwal, errorSwal } from '@/commonMethods/commonMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"

export const addDemographic = async ({commit}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("post", "patient", null, data).then((response) => {
    commit('addDemographic', response.data.data);
    commit('status', true)
    commit('counterPlus')
    // successSwal(response.data.message)
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}

export const updateDemographic = async ({commit}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("put", `patient/${data.id}`, null, data.data).then((response) => {
    commit('updateDemographic', response.data.data);
    // successSwal(response.data.message)
    commit('loadingStatus', false)
    commit('counterPlus')
    
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}



export const patients = async ({
  commit
},page) => {
  let link = page? "patient"+page : "patient"
  commit('loadingStatus', true)
  await serviceMethod.common("get", link, null, null).then((response) => {
    commit('patients', response.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })

}


export const addCondition = async ({commit}, request) => {
  const data = request.data;
  const patientId = request.id;
  commit('loadingStatus', true)
  if(data.designation || data.email || data.fax || data.name || data.phoneNumber || data.physicianDesignation || data.physicianEmail || data.physicianFax || data.physicianName || data.physicianPhoneNumber) {
    await serviceMethod.common("post", `patient/${patientId}/condition`, null, data).then((response) => {
      commit('addCondition', response.data);
      commit('loadingStatus', false)
    }).then(()=> {
      serviceMethod.common("post", `patient/${patientId}/referals`, null, data).then((response) => {
        commit('addPatientReferals', response.data);
        commit('loadingStatus', false)
      })
    }).then(()=> {
      serviceMethod.common("post", `patient/${patientId}/physician`, null, data).then((response) => {
        commit('addPatientPhysician', response.data);
        commit('loadingStatus', false)
        commit('counterPlus')
        // successSwal(response.data.message)
        commit('loadingStatus', false)
      }).catch((error) => {
        if (error.response.status === 422) {
          commit('errorMsg', error.response.data)
          commit('loadingStatus', false)
        } else if (error.response.status === 500) {
          errorSwal(error.response.data.message)
          commit('loadingStatus', false)
        } else if (error.response.status === 401) {
          // commit('errorMsg', error.response.data.message)
          errorSwal(error.response.data.message)
          commit('loadingStatus', false)
        }
      })
      commit('loadingStatus', false)
      commit('counterPlus')
    })
  }
  else {
    await serviceMethod.common("post", `patient/${patientId}/condition`, null, data).then((response) => {
      commit('addCondition', response.data.data);
      commit('loadingStatus', false)
      commit('counterPlus')
    })
  }
}

export const updateCondition = async ({commit}, request) => {
  const data = request.data;
  const patientId = request.id;
  commit('loadingStatus', true)
  if(data.designation || data.email || data.fax || data.name || data.phoneNumber || data.physicianDesignation || data.physicianEmail || data.physicianFax || data.physicianName || data.physicianPhoneNumber) {
    await serviceMethod.common("post", `patient/${patientId}/condition`, null, data).then((response) => {
      commit('updateCondition', response.data.data);
      commit('loadingStatus', false)
    }).then(()=> {
      serviceMethod.common("put", `patient/${patientId}/referals/${data.referalID}`, null, data).then((response) => {
        commit('updatePatientReferals', response.data.data);
        commit('loadingStatus', false)
      })
    }).then(()=> {
      serviceMethod.common("put", `patient/${patientId}/physician/${data.physicianId}`, null, data).then((response) => {
        commit('updatePatientPhysician', response.data.data);
        commit('counterPlus')
        // successSwal(response.data.message)
        commit('loadingStatus', false)
      }).catch((error) => {
        if (error.response.status === 422) {
          commit('errorMsg', error.response.data)
          commit('loadingStatus', false)
        } else if (error.response.status === 500) {
          errorSwal(error.response.data.message)
          commit('loadingStatus', false)
        } else if (error.response.status === 401) {
          // commit('errorMsg', error.response.data.message)
          errorSwal(error.response.data.message)
          commit('loadingStatus', false)
          commit('counterPlus')
        }
      })
    })
  }
  else {
    await serviceMethod.common("post", `patient/${patientId}/condition`, null, data).then((response) => {
      commit('addCondition', response.data.data);
      commit('loadingStatus', false)
      commit('counterPlus')
    })
  }
}

// export const addPatientReferals = async ({
//   commit
// }, data) => {
//   await serviceMethod.common("post", `patient/${data.id}/referals`, null, data.data).then((response) => {
//     commit('addPatientReferals', response.data.data);
//   }).catch((error) => {
//     if (error.response.status === 422) {
//       commit('errorMsg', error.response.data)
//     } else if (error.response.status === 500) {
//       errorSwal(error.response.data.message)
//     } else if (error.response.status === 401) {
//       commit('errorMsg', error.response.data.message)
//     }
//   })
// }

// export const updatePatientReferals = async ({commit}, data) => {
//   await serviceMethod.common("put", `patient/${data.id}/referals/${data.referalID}`, null, data.data).then((response) => {
//     commit('updatePatientReferals', response.data.data);
//     successSwal(response.data.message)
//   }).catch((error) => {
//     if (error.response.status === 422) {
//       commit('errorMsg', error.response.data)
//     } else if (error.response.status === 500) {
//       errorSwal(error.response.data.message)
//     } else if (error.response.status === 401) {
//       commit('errorMsg', error.response.data.message)
//     }
//   })
// }


// export const addPatientPhysician = async ({
//   commit
// }, data) => {
//   commit('loadingStatus', true)
//   await serviceMethod.common("post", `patient/${data.id}/physician`, null, data.data).then((response) => {
//     commit('addPatientPhysician', response.data.data);
//     commit('counterPlus')
//     successSwal(response.data.message)
//     commit('loadingStatus', false)
//   }).catch((error) => {
//     if (error.response.status === 422) {
//       commit('errorMsg', error.response.data)
//       commit('loadingStatus', false)
//     } else if (error.response.status === 500) {
//       errorSwal(error.response.data.message)
//       commit('loadingStatus', false)
//     } else if (error.response.status === 401) {
//       commit('errorMsg', error.response.data.message)
//       commit('loadingStatus', false)
//     }
//   })
// }

// export const updatePatientPhysician = async ({commit}, data) => {
//   commit('loadingStatus', true)
//   await serviceMethod.common("put", `patient/${data.id}/physician/${data.physicianId}`, null, data.data).then((response) => {
//     commit('updatePatientPhysician', response.data.data);
//     successSwal(response.data.message)
//     commit('counterPlus')
//     commit('loadingStatus', false)
//   }).catch((error) => {
//     if (error.response.status === 422) {
//       commit('errorMsg', error.response.data)
//       commit('loadingStatus', false)
//     } else if (error.response.status === 500) {
//       errorSwal(error.response.data.message)
//       commit('loadingStatus', false)
//     } else if (error.response.status === 401) {
//       commit('errorMsg', error.response.data.message)
//       commit('loadingStatus', false)
//     }
//   })
// }


export const patientConditions = async ({ commit }, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/condition', null, null).then((condition) => {
    commit('patientConditions', condition.data.data);
    serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/referals', null, null).then((referal) => {
      commit('patientReferralSource', referal.data.data[0]);
      serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/physician', null, null).then((physician) => {
        commit('patientPrimaryPhysician', physician.data.data[0]);
        commit('loadingStatus', false)
      });
    });
  }).catch((error) => {
    commit('loadingStatus', false)
    errorSwal(error.response.data.message)
  })
}

export const programList = async ({
  commit
}, data) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `program`, null, data).then((response) => {
    commit('programList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('loadingStatus', false)
    errorSwal(error.response.data.message)
  })
}


export const addProgram = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/program`, null, data.data).then((response) => {
    commit('addProgram', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })

}

export const deleteProgram = async ({commit}, data) => {
  await serviceMethod.common("delete", `patient/${data.id}/program/${data.programID}`, null, null).then((response) => {
    commit('deleteProgram', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })

}



export const program = async ({
  commit
}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `patient/${id}/program`, null, null).then((response) => {
    commit('program', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })

}

export const addDevice = async ({
  commit
}, data) => {
  console.log('DATA..', data)
  await serviceMethod.common("post", `patient/${data.id}/inventory`, null, data.data).then((response) => {
    commit('addDevice', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })
}



export const changeStatus = async ({
  commit
}, data) => {
  await serviceMethod.common("put", `patient/${data.id}/inventory/${data.statusId}`, null, data.status).then((response) => {
    commit('changeStatus', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      commit('errorMsg', error.response.data.message)
    }
  })
}

export const deleteDevice = async ({
  commit
}, data) => {
  await serviceMethod.common("delete", `patient/${data.id}/inventory/${data.deviceId}`, null, data.data).then((response) => {
    commit('deleteDevice', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}

export const devices = async ({
  commit
}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `patient/${id}/inventory`, null, null).then((response) => {
    commit('devices', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('loadingStatus', false)
    errorSwal(error.response.data.message)
  })
}


export const inventoryList = async ({
  commit
}, data) => {
  await serviceMethod.common("get", `inventory?isAvailable=${data.isAvailable}&deviceType=${data.deviceType}`, null, null).then((response) => {
    commit('inventoryList', response.data.data);
    if(response.data.data[0]=='' || response.data.data.length==0){
    errorSwal('Data not found!')
    }
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}


let temp = []
export const parameterFields = async ({
  commit
}, id) => {
  await serviceMethod.common("get", `field/${id}`, null, null).then((response) => {
    temp[id] = response.data.data ? response.data.data :
      commit('parameterFields', temp)
  }).catch(() => {
  })
}


export const parameter = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/vital`, null, { vital: data.vital }).then((response) => {
    commit('parameter', response.data.data);
    commit('counterPlus')
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })

}


export const addClinicalHistory = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/medicalHistory`, null, data.data).then((response) => {
    commit('addClinicalHistory', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })
}

export const deleteClinicalData = async ({commit}, data) => {
  await serviceMethod.common("delete", `patient/${data.id}/medicalHistory/${data.clinicalId}`, null, null).then((response) => {
    commit('deleteClinicalData', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}


export const clinicalHistoryList = async ({
  commit
}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `patient/${id}/medicalHistory`, null, null).then((response) => {
    commit('clinicalHistoryList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })

}



export const addClinicalMedicat = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/medicalRoutine`, null, data.data).then((response) => {
    commit('addClinicalMedicat', response.data.data);
    // successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })
}

export const deleteClinicalMedicat = async ({commit}, data) => {
  await serviceMethod.common("delete", `patient/${data.id}/medicalRoutine/${data.clinicalId}`, null, null).then((response) => {
    commit('deleteClinicalMedicat', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}

export const clinicalMedicatList = async ({
  commit
}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `patient/${id}/medicalRoutine`, null, null).then((response) => {
    commit('clinicalMedicatList', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('loadingStatus', false)
    errorSwal(error.response.data.message)
  })
}




export const addInsurance = async ({ commit }, data) => {
  let insurance = [];
  let insuranceData = data.data.insurance[0];
  insurance = insuranceData.insuranceNumber.map((item, i) => {
    let finalInsurance = { "expirationDate": "", "insuranceName": "", "insuranceNumber": "", "insuranceType": "", };
    if (insuranceData.insuranceName[i] != undefined) {
      finalInsurance.expirationDate = insuranceData.expirationDate[i];
      finalInsurance.insuranceName = insuranceData.insuranceName[i];
      finalInsurance.insuranceNumber = insuranceData.insuranceNumber[i];
      finalInsurance.insuranceType = insuranceData.insuranceType[i];
      return finalInsurance;
    }
  })
  commit('loadingStatus', true)
  await serviceMethod.common("post", `patient/${data.id}/insurance`, null, { insurance: insurance }).then((response) => {
    commit('addInsurance', response.data.data);
    commit('counterPlus')
    // successSwal(response.data.message)
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}


export const updateInsurance = async ({ commit }, data) => {
  let insurance = [];
  let insuranceData = data.data.insurance[0];
  insurance = insuranceData.insuranceNumber.map((item, i) => {
    let finalInsurance = { "expirationDate": "", "insuranceName": "", "insuranceNumber": "", "insuranceType": "", };
    if (insuranceData.insuranceName[i] != undefined) {
      finalInsurance.expirationDate = insuranceData.expirationDate[i];
      finalInsurance.insuranceName = insuranceData.insuranceName[i];
      finalInsurance.insuranceNumber = insuranceData.insuranceNumber[i];
      finalInsurance.insuranceType = insuranceData.insuranceType[i];
      return finalInsurance;
    }
  })
  commit('loadingStatus', true)
  await serviceMethod.common("put", `patient/${data.id}/insurance/${data.insuranceID}`, null, { insurance: insurance }).then((response) => {
    commit('updateInsurance', response.data.data);
    commit('counterPlus')
    // successSwal(response.data.message)
    commit('loadingStatus', false)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}

export const patientInsurance = async ({ commit }, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `patient/${id}/insurance`, null, null).then((response) => {
    commit('patientInsurance', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })
}

export const addDocument = async ({commit}, data) => {
  await serviceMethod.common("post", `patient/${data.id}/document`, null, data.data).then((response) => {
    commit('addDocument', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      errorSwal(error.response.data.message)
    }
  })
}


export const deleteDocument = async ({
  commit
}, data) => {
  await serviceMethod.common("delete", `patient/${data.id}/document/${data.documentId}`, null, null).then((response) => {
    commit('deleteDocument', response.data.data);
    successSwal(response.data.message)
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}



export const documents = async ({
  commit
}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `patient/${id}/document`, null, null).then((response) => {
    commit('documents', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    commit('loadingStatus', false)
    errorSwal(error.response.data.message)
  })
}



export const uploadFile = async ({
  commit
}, data) => {
  await serviceMethod.common("post", `file`, null, data).then((response) => {
    commit('uploadFile', response.data.data.path);
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}

export const patientDetails = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['patient'], id, null).then((response) => {
    commit('patientDetailsSuccess', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })
}

export const patientTimeline = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/timeLine', null, null).then((response) => {
    commit('patientTimelineSuccess', response.data.data);
    commit('loadingStatus', false)
  }).catch((error) => {
    errorSwal(error.response.data.message)
    commit('loadingStatus', false)
  })
}

export const patientDocuments = async ({commit}, id) => {
  await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/document', null, null).then((response) => {
    commit('patientDocumentsSuccess', response.data.data);
  }).catch((error) => {
    errorSwal(error.response.data.message)
  })
}

export const latestDocument = async ({ commit }, id) => {
	await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/document?latest=latest', null, null).then((response) => {
		commit('latestDocumentSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}

export const latestDevice = async ({ commit }, id) => {
	await serviceMethod.common("get", API_ENDPOINTS['patient']+'/'+id+'/inventory?latest=latest', null, null).then((response) => {
		commit('latestDeviceSuccess', response.data.data);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}



export const patientSearchWithBitrix = async ({ commit }, data) => {
	await serviceMethod.common("get", `bitrix/deal?title=${data.search}`, null, null).then((response) => {
		commit('patientSearchWithBitrix', response.data.result);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}


export const fetchFromBitrix = async ({ commit }, id) => {
	await serviceMethod.common("get", `bitrix/deal/${id}`, null, null).then((response) => {
		commit('fetchFromBitrix', response.data.result);
	})
	.catch((error) => {
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
	})
}