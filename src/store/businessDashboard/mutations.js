import { yaxis, dataLabels, plotOptions, annotations } from '../../commonMethods/commonMethod';

export const cptCodeSuccess = (state, data) => {
	let cptResult = [];
	data.data.forEach((element) => {
if(element.name!="General"){
		let object = data.cpt.find((e) => e.text == element.name);

		if (object == undefined) {
			
			cptResult.push({ total: 0, text: element.name });
		} else {
			cptResult.push(object);
		}
	}
	});

	state.cptCodeValue = {
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
				categories: cptResult.map((item) => {
					return item.text;
				})
			},
			yaxis: yaxis('Amount')
		},
		value: [
			{
				name: 'Amount',
				data: cptResult.map((item) => {
					return item.total;
				})
			}
		]
	};
};
export const referalCount = (state, data) => {
	const topFive = [];
	data.map((item, index) => {
		if (index < 4) {
			topFive.push(item);
		}
	});
	state.referalCountRecord = data;
	state.referalCount = {
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
				categories: topFive.map((item) => {
					return item.text;
				})
			},
			yaxis: yaxis('Referral Count'),
			noData: {
				text: "No data",
				align: 'center',
				verticalAlign: 'middle',
				offsetX: 0,
				offsetY: 0,
				style: {
					color: undefined,
					fontSize: '24px',
					fontWeight: 'bold'
					//fontFamily: undefined
				}
			}
		},

		value: [
			{
				name: 'Name',
				data: topFive.map((item) => {
					return item.total;
				})
			}
		]
	};
};
export const financialSuccess = (state, data) => {
	state.financialValue = {
		due: [ data.Due != null ? Math.round(data.Due) : 100, data.Billed != null ? Math.round(data.Billed) : 0 ],
		billed: {
			chart: {
				type: 'pie',
				height: '400px'
			},
			labels: [ 'Due', 'Billed' ],
			colors: [ '#E30D2A', '#267dff' ],
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom'
						}
					}
				}
			]
		}
	};
};
export const callStatusSuccess = (state, count) => {
	let categories =
		count.length > 0
			? count.map((item) => {
					return item.text;
				})
			: [ 'Completed', 'In Queue' ];
	let data =
		count.length > 0
			? count.map((item) => {
					return item.total;
				})
			: [ 0, 0 ];
	state.callStatus = {
		calloption: {
			annotations: annotations('In', 0, '#775DD0', 0, '#fff', '#775DD0'),
			chart: {
				type: 'bar'
			},
			plotOptions: plotOptions(10, '20%', '100%', true, false, 'bottom'),
			dataLabels: dataLabels(false),
			colors: [ '#121258', '#218421', '#ffb526' ],
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
				categories: categories
			},
			yaxis: yaxis('Number of Count')
		},
		callseries: [
			{
				name: 'Call Queue',
				data: data
			}
		]
	};
};
