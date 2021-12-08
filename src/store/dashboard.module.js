import DashboardService from '../services/dashboard.service';

export const dashBoard = {
  state:{
    tcount:null,
    ncount:null,
    abcount:null,
    activecount:null,
    inactivecount:null,
    critcount:null,
    newappointment:null,
    futureappointment:null,
    appointment:null,
    specialization:null,
    wellness:null,


  },
  actions: {
   async totalPatients({ commit }) {
    try{
    let resp = await DashboardService.totalPatient()
    commit('totalPatientsSuccess', resp.data.data);
    }catch (error){
      commit('totalPatientsFailure',error);
    }
    },
    async newPatients({ commit }) {
      try{
      let resp = await DashboardService.newPatient()
      commit('newPatientsSuccess', resp.data.data);
      }catch (error){
        commit('newPatientsFailure',error);
      }
      },
      async abnormalPatients({ commit }) {
        try{
        let resp = await DashboardService.abnormalPatient()
        commit('abnormalPatientsSuccess', resp.data.data);
        }catch (error){
          commit('abnormalPatientsFailure',error);
        }
        },
        async activePatients({ commit }) {
          try{
          let resp = await DashboardService.activePatient()
          commit('activePatientsSuccess', resp.data.data);
          }catch (error){
            commit('activePatientsFailure',error);
          }
          },
          async inactivePatients({ commit }) {
            try{
            let resp = await DashboardService.inactivePatient()
            commit('inactivePatientsSuccess', resp.data.data);
            }catch (error){
              commit('inactivePatientsFailure',error);
            }
            },
            async criticalPatients({ commit }) {
              try{
              let resp = await DashboardService.criticalPatient()
              commit('criticalPatientsSuccess', resp.data.data);
              }catch (error){
                commit('criticalPatientsFailure',error);
              }
              },
              async newappointment({ commit }) {
                try{
                let resp = await DashboardService.newappointment()
                commit('newappointmentSuccess', resp.data.data);
                }catch (error){
                  commit('newappointmentFailure',error);
                }
                },
                async futureappointment({ commit }) {
                  try{
                  let resp = await DashboardService.futureappointment()
                  commit('futureappointmentSuccess', resp.data.data);
                  }catch (error){
                    commit('futureappointmenttFailure',error);
                  }
                  },
                  async appointmentcount({ commit }) {
                    try{
                    let resp = await DashboardService.appointmentcount()
                    commit('appointmentcountSuccess', resp.data.data);
                    }catch (error){
                      commit('appointmentcountFailure',error);
                    }
                    },
                    async specialization({ commit },id) {
                      try{
                        //console.log(id)
                      let resp = await DashboardService.specialization(id)
                      if(id==1){
                        commit('wellnessSuccess', resp.data.data);
                      }else{
                        commit('specializationSuccess', resp.data.data);
                      }
                      }catch (error){
                        commit('specializationFailure',error);
                      }
                      },
},
  mutations: {
    totalPatientsSuccess(state, count) {
      state.tcount = count;
    },
    totalPatientsFailure(state,error) {
      state.tcount = error;
    },
    newPatientsSuccess(state, count) {
      state.ncount = count;
    },
    newPatientsFailure(state,error) {
      state.ncount = error;
    },
    abnormalPatientsSuccess(state, count) {
      state.abcount = count;
    },
    abnormalPatientsFailure(state,error) {
      state.abcount = error;
    },
    activePatientsSuccess(state, count) {
      state.activecount = count;
    },
    activePatientsFailure(state,error) {
      state.activecount = error;
    },
    inactivePatientsSuccess(state, count) {
      state.inactivecount = count;
    },
    inactivePatientsFailure(state,error) {
      state.inactivecount = error;
    },
    criticalPatientsSuccess(state, count) {
      state.critcount = count;
    },
    criticalPatientsFailure(state,error) {
      state.critcount = error;
    },
    newappointmentSuccess(state, appointment) {
      state.newappointment = appointment;
    },
    newappointmentFailure(state,error) {
      state.newappointment = error;
    },
    futureappointmentSuccess(state, appointment) {
      state.futureappointment = appointment;
    },
    futureappointmentFailure(state,error) {
      state.futureappointment = error;
    },
    appointmentcountSuccess(state, count) {
      state.appointment = count;
    },
    appointmentcountFailure(state,error) {
      state.appointment = error;
    },
    wellnessSuccess(state, count) {
      state.wellness = count;
    },
    specializationSuccess(state, count) {
      state.specialization = count;
    },
    specializationFailure(state, count) {
      state.specialization = count;
    },
    
    
  }
};