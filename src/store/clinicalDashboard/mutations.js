import { yaxis, dataLabels, plotOptions, annotations, chartTimeCount } from '@/commonMethods/commonMethod';
import { dashBoard } from '.././dashboard/index';
export const clicalTask = (state, data) => {
	state.clicalTask = {
		code: {
			annotations: annotations('In', 0, '#775DD0', 0, '#fff', '#775DD0'),
			chart: {
				type: 'bar'
			},
			plotOptions: plotOptions(10, '20%', '100%', true, false, 'bottom'),
			dataLabels: dataLabels(false),
			colors: [ '#3b72c5', '#ffb526', '#419541', '#343470' ],
			stroke: {
				width: 1,
				colors: [ '#fff' ]
			},

			grid: {
				row: {
					colors: [ '#fff', '#f2f2f2' ]
				}
			},
			xaxis: {
				labels: {
					rotate: -45
				},
				categories: data.map((item) => {
					return item.text;
				})
			},
			yaxis: yaxis('Task Count')
		},
		value: [
			{
				name: 'Task',
				data: data.map((item) => {
					return item.total;
				})
			}
		]
	};
};
export const patientsFlag = (state, data) => {
	state.patientsFlag = {
		code: {
			annotations: annotations('In', 0, '#775DD0', 0, '#fff', '#775DD0'),
			chart: {
				type: 'bar'
			},
			plotOptions: plotOptions(10, '20%', '100%', true, false, 'bottom'),
			dataLabels: dataLabels(false),
			colors: data.map((item) => {
				return item.color;
			}),
			stroke: {
				width: 1,
				colors: [ '#fff' ]
			},

			grid: {
				row: {
					colors: [ '#fff', '#f2f2f2' ]
				}
			},
			xaxis: {
				labels: {
					rotate: -45
				},
				categories: data.map((item) => {
					return item.text;
				})
			},
			yaxis: yaxis('Patients Flags Count')
		},
		value: [
			{
				name: 'Patients Flags',
				data: data.map((item) => {
					return item.total;
				})
			}
		]
	};
};
export const escalationCount = (state, data) => {
	state.escalationCount = {
		code: {
			annotations: annotations('In', 0, '#775DD0', 0, '#fff', '#775DD0'),
			chart: {
				type: 'bar'
			},
			plotOptions: plotOptions(10, '20%', '100%', true, false, 'bottom'),
			dataLabels: dataLabels(false),
			colors: [ '#3b72c5', '#ffb526', '#419541', '#343470' ],
			stroke: {
				width: 1,
				colors: [ '#fff' ]
			},

			grid: {
				row: {
					colors: [ '#fff', '#f2f2f2' ]
				}
			},
			xaxis: {
				labels: {
					rotate: -45
				},
				categories: data.map((item) => {
					return item.text;
				})
			},
			yaxis: yaxis('Escalations Count')
		},
		value: [
			{
				name: 'Escalations',
				data: data.map((item) => {
					return item.total;
				})
			}
		]
	};
};
export const appointmentCount = (state, count) => {
	let format = '';
	let type = '';
	if (dashBoard.state.timeLineButton.globalCodeId == 122) {
		type = 'time';
		format = 'hh';
	} else if (dashBoard.state.timeLineButton.globalCodeId == 123) {
		type = 'day';
		format = 'dddd';
	} else if (dashBoard.state.timeLineButton.globalCodeId == 124) {
		type = 'day';
		format = 'dd';
	} else {
		type = 'month';
		format = 'MM';
	}
	let categories = chartTimeCount(dashBoard.state.timeLineButton, count).map((item) => {
		return item.duration;
	});
	let data = chartTimeCount(dashBoard.state.timeLineButton, count).map((item) => {
		return item.total;
	});

	state.appointmentCount = {
		chartOptions: {
			chart: {
				type: 'bar'
			},
			dataLabels: dataLabels(false),
			stroke: {
				curve: 'smooth'
			},
			xaxis: {
				type: type,
				categories: categories
			},
			yaxis: yaxis('Number of appointments'),
			tooltip: {
				x: {
					format: format
				}
			}
		},
		value: [
			{
				name: 'New Appointment',
				data: data
			}
		]
	};
};
