export const totalPatientsSuccess = (state, count) => {

    const test = [{
        "text": "totalPatients",
        "count": 10,
        "class": "one",
        "color": "#FF0000",
        "textColor": "white"
    },
    {
        "text": "totalPatients",
        "count": 10,
        "class": "two",
        "color": "#FF5733",
        "textColor": "white"
    },
    {
        "text": "totalPatients",
        "count": 10,
        "class": "three",
        "color": "#B13A20",
        "textColor": "white"
    },
    {
        "text": "totalPatients",
        "count": 10,
        "class": "four",
        "color": "rgb(16, 66, 49)",
        "textColor": "white"
    },
        // {
        //     "text": "totalPatients",
        //     "count": 10,
        //     "class":"five",
        //     "color":"rgb(16, 66, 49)",
        //     "textColor":"white"
        // },
        // {
        //     "text": "totalPatients",
        //     "count": 10,
        //     "class":"six",
        //     "color":"rgb(16, 66, 49)",
        //     "textColor":"white"

        // },




    ]
    state.xlGrid = parseInt(24 / test.length);
    state.totalPatientcount = test
}
export const failure = (state, error) => {
    state.errorMsg = error;
}
// export const newPatientsSuccess = (state, count) => {
//     state.newPatientcount = count
// }

// export const abnormalPatientsSuccess = (state, count) => {
//     state.abnormalPaitientcount = count
// }

// export const activePatientsSuccess = (state, count) => {
//     state.activePaitientcount = count
// }

// export const inactivePatientsSuccess = (state, count) => {
//     state.inActivePaitientcount = count
// }

// export const criticalPatientsSuccess = (state, count) => {
//     state.criticalPaitientcount = count
// }
