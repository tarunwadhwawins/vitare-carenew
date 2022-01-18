export const callPerStaffSuccess = (state, count) => {
    console.log("login2")
    state.callPerStaffName={
      annotations: {
        points: [
          {
            x: "In",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "20%",
          barHeight: "100%",
          distributed: true,
          horizontal: false,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#269b8f", "#269b8f", "#121258", "#218421"],
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },

      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: count.map((item) => {return item.staff}),
      },
      yaxis: {
        title: {
          text: "Number of Calls",
        },
      },
    };count.map((item) => {return item.staff})
    state.callPerStaffCount =[
      {
        name: "Value",
        data:  count.map((item) => {return item.count }),
      },
    ];
    //console.log(state.callPerStaffName)
}
export const addCareCoordinatorSuccess = async (state, coordinator) => {
    state.coordinator = coordinator;
}
export const addContactSuccess = async (state, contact) => {
    state.contact = contact;
}
export const addAvailabilitySuccess = async (state, availability) => {
    state.availability = availability;
}
export const addRoleSuccess = async (state, role) => {
    state.role = role;
}
export const uploadFileSuccess = async (state, file) => {
    state.file = file;
}
export const addDocumentSuccess = async (state, document) => {
    state.document = document;
}
export const getCareCoordinatorsListSuccess = async (state, coordinatorsList) => {
    state.coordinatorsList = coordinatorsList;
}
export const getCoordinatorContactsSuccess = async (state, contactsList) => {
    state.contactsList = contactsList;
}
export const getCoordinatorAvailabilitiesSuccess = async (state, availabilityList) => {
    state.availabilityList = availabilityList;
}
export const getCoordinatorRolesSuccess = async (state, rolesList) => {
    state.rolesList = rolesList;
}
export const specializationWellnessSuccess = async (state, wellness) => {
    state.specializationWellness = wellness;
}
export const specializationBehavourSuccess = async (state, behaviour) => {
    state.specializationBehavour = behaviour;
}
export const networksInSuccess = async (state, networkIn) => {
    state.networksIn = networkIn;
}
export const networksOutSuccess = async (state, networkOut) => {
    state.networksOut = networkOut;
}
export const getCoordinatorContactDetailsSuccess = async (state, contactDetails) => {
    state.contactDetails = contactDetails;
}
export const getCoordinatorAvailabilitySuccess = async (state, availabilityDetails) => {
    state.availabilityDetails = availabilityDetails;
}
export const getCoordinatorRoleDetailsSuccess = async (state, roleDetails) => {
    state.roleDetails = roleDetails;
}
export const getCoordinatorDetailsSuccess = async (state, CoordinatorDetails) => {
    state.CoordinatorDetails = CoordinatorDetails;
}
export const deleteCoordinatorSuccess = async (state, deleteCoordinator) => {
    state.deleteCoordinator = deleteCoordinator;
}
export const deleteCoordinatorContactSuccess = async (state, deleteContact) => {
    state.deleteContact = deleteContact;
}
export const deleteCoordinatorAvailabilitySuccess = async (state, deleteAvailability) => {
    state.deleteAvailability = deleteAvailability;
}
export const deleteCoordinatorRoleSuccess = async (state, deleteRole) => {
    state.deleteRole = deleteRole;
}
export const Failure = async (state, error) => {
    state.errormsg = error;
}