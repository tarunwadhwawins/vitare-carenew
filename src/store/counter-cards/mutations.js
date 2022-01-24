export const totalPatientsSuccess = (state, count) => {

    const test = [{
        "text": "totalPatients",
        "count": 12,
        "class": "one",
        "color": "#fff",
        "textColor": "#111"
    },
    {
        "text": "newPatients",
        "count": 2,
        "class": "two",
        "color": "#8e60ff",
        "textColor": "#fff"
    },
    {
        "text": "criticalPatients",
        "count": 5,
        "class": "three",
        "color": "#ff6061",
        "textColor": "#fff"
    },
    {
        "text": "abnormalPatients",
        "count": 5,
        "class": "four",
        "color": "#ffa800",
        "textColor": "#fff"
    },
        {
            "text": "activePatients",
            "count": 12,
            "class":"five",
            "color":"#0fb5c2",
            "textColor":"#fff"
        },
        // {
        //     "text": "inactivePatients",
        //     "count":0,
        //     "class":"six",
        //     "color":"#267dff",
        //     "textColor":"#fff"

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
