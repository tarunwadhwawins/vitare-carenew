import Swal from 'sweetalert2';
import moment from 'moment';
import store from '@/store/index'
import Bowser from "bowser";
// import momentTimeZone from 'moment-timezone';



//for all timeStamp to according date and time format
export function dateAndTimeFormate(timeStamp, format) {
	var date = moment.unix(new Date(timeStamp));
	return date.format(format);
}
export const globalDateFormat = "MMM DD, YYYY"
export function errorLogWithDeviceInfo(errorMessage) {
	let deviceInfo = Bowser.parse(window.navigator.userAgent)
	store.dispatch('errorLogWithDeviceInfo', { deviceInfo: JSON.stringify(deviceInfo), errorMessage: JSON.stringify(errorMessage) })
}
export function timeStampFormate(timeStamp, format) {

	return moment.unix(timeStamp).format(format);
}


// for all table export excel data
export function exportExcel(data, field = "?fromDate=&toDate=") {
	let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	// let timeZone = momentTimeZone.tz.guess();
	store.dispatch('exportReportRequest', { data: data, field: field,timezone:timeZone })
}

//action tracking when user click on any action 
export function actionTrack(id, actionId, endPoint) {
	store.dispatch('actionTrack', { id: id, actionId: actionId, endPoint: endPoint })
}

// encode a string
export function deCodeString(value) {
	let decode = window.atob(value);
	return decode.replace('=', '');
}

// encode a string
export function enCodeString(value) {
	return window.btoa(value);
}

//Capitalize a string
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// swal for success message
export function successSwal(message) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 5000,
		timerProgressBar: true
	});
	Toast.fire({
		icon: 'success',
		title: message.split(' ').map(capitalize).join(' ')
	});
}

// swal for error message
export async function errorSwal(message) {
	const result = await Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: message//.split(' ').map(capitalize).join(' ')
	});
	if (result.isConfirmed) {
		return true;
	} else {
		return false;
	}
}
// swal for  message
export async function messageSwal(message) {
	const result = await Swal.fire({
		title: 'Warning',
		text: message,
		icon: 'warning',
		
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes'
	});
	if (result.isConfirmed) {
		return true;
	} else {
		return false;
	}
}
// swal for warning message
export async function warningSwal(message,title=null) {
	const result = await Swal.fire({
		title: title,
		text: message,
		icon: 'warning',
		showCancelButton: true,
		
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: `No`,
	});
	if (result.isConfirmed) {
		return true;
	} else {
		return false;
	}
}

// Date for getting this format yyyy-MM-DD pass timeStamp
export function dateOnlyFormatSImple(timeStamp) {
	var day = moment.unix(new Date(timeStamp));
	return day.format('yyyy-MM-DD');
}

export function timeFormatSimple(timeStamp) {
	var day = moment.unix(new Date(timeStamp));
	return day.format('HH:mm');
}

export function dateOnlyFormat(timeStamp) {
	var day = moment.unix(timeStamp);
	return day.format('MMM DD, yyyy');
}

export function timerFromTimestamp(timeStamp) {
	var day = moment.unix(new Date(timeStamp));
	return day.format('HH:mm:ss');
}

export function dateFormat(date) {
	return moment.unix(date).format('MMM DD, yyyy, hh:mm A');
}

export function dateTimeFormat(date) {
	return moment.unix(date).format('MMM DD hh:mm A');
}

export function meridiemFormat(time) {
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
	if (time.length > 1) {
		time = time.slice(1);
		time[4] = +time[0] < 12 ? ' AM' : ' PM';
		time[0] = +time[0] % 12 || 12;
		var newTime = (time[0] + time[1] + time[2] + time[4]).toString();
	}
	return newTime;
}

export function meridiemFormatFromTimestamp(time) {
	return moment.unix(time).format('hh:mm A');
}

export function dobFormat(date) {
	return moment(date).format('MMMM DD, YYYY');
}

export function dobFormat2(date) {
	return moment(date).format('YYYY-MM-DD');
}

export function timeOnly(date) {
	var day = moment.unix(new Date(date));
	return String(day.format('HH'));
}
export function yaxis(title) {
	return {
		labels: {
			formatter: function (val) {
				return val.toFixed(0);
			}
		},
		title: {
			text: title
		}
	};
}

export function dataLabels(value) {
	return {
		enabled: value
	};
}
export function plotOptions(borderRadius, columnWidth, barHeight, distributed, horizontal, position) {
	return {
		bar: {
			borderRadius: borderRadius,
			columnWidth: columnWidth,
			barHeight: barHeight,
			distributed: distributed,
			horizontal: horizontal,
			dataLabels: {
				position: position
			}
		}
	};
}
export function annotations(xname, seriesIndex, borderColor, offsetY, color, background) {
	return {
		points: [
			{
				x: xname,
				seriesIndex: seriesIndex,
				label: {
					borderColor: borderColor,
					offsetY: offsetY,
					style: {
						color: color,
						background: background
					}
				}
			}
		]
	};
}

// Used for timeStamp for dateTime
export function timeStamp(date) {
	return moment(date).format('X');
	// return moment.utc(date).local().format('X');
}
export function timeStampLocal(date) {
	return moment.utc(date).local().format('X');
}
export function timeStampToTime(time, format) {
	return moment.unix(time).format(format);
}

// Used for pass array and get object of array
export function arrayToObjact(data, id) {
	return data.find((o) => o.id === id);
}
export function startimeAdd(value) {
	let timeStart = '00:00:00';
	return moment(value.format('MM/DD/YYYY') + ' ' + timeStart).format();
}

export function timestampToDate(timestamp, format) {
	var day = moment.unix(timestamp);
	console.log('dayday', day.format(format))
	return day.format(format);
}

export function endTimeAdd(value) {
	let endTime = '23:59:59';
	return moment(value.format('MM/DD/YYYY') + ' ' + endTime).format();
}

export function responseConvert(time, data, format) {
	let record = [];
	time.forEach((element) => {
		let recordList = [];
		data.forEach((value) => {
			if (moment(dateFormat(value.date)).format(format) === element) {
				recordList.push(value);
			}
		});
		if (recordList.length > 0) {
			let value_obj_get = {
				time: element,
				data: recordList
			};
			record.push(value_obj_get);
		} else {
			let value_obj = {
				time: element,
				data: []
			};
			record.push(value_obj);
		}
	});
	return record;
}
export function findOcc(arr, key) {
	let arr2 = [];

	arr.forEach((x) => {
		let isFound = 0;
			arr2.forEach((k,index) => {
			
				if (k[key] === x[key]) {
					arr2[index]["total"] = x.total+arr2[index]["total"];
					isFound = 1;
				}
			})

		if(isFound==0) {
			
			let a = {}
			a[key] = x[key]
			a['duration'] = x.duration
			a["total"] = x.total
			arr2.push(a);
		}
	})

	return arr2
}
export function chartTimeCount(timeLine, count) {
	let newPatient = [];
	if (timeLine.globalCodeId == 122) {
		let array = count.map((item) => {
			item.time = moment(dateFormat(item.duration)).format('hh:00 A')
			return item
		})
		
		let getTotal = findOcc(array, 'time')
		
		const time = [
			'08:00 AM',
			'09:00 AM',
			'10:00 AM',
			'11:00 AM',
			'12:00 PM',
			'01:00 PM',
			'02:00 PM',
			'03:00 PM',
			'04:00 PM',
			'05:00 PM',
			'06:00 PM',
			'07:00 PM',
			'08:00 PM'
		];
		time.forEach((item, i) => {

			let obj = getTotal.find((o) => moment(dateFormat(o.duration)).format('hh:00 A') === item);
			
			if (typeof obj === 'undefined') {
				let value_obj = {
					key: i,
					duration: item,
					total: 0
				};
				newPatient.push(value_obj);
			} else {
				
				let value_obj_get = {
					duration: moment(dateFormat(obj.duration)).format('hh:00 A'),
					total: obj.total
				};
				newPatient.push(value_obj_get);
			}
		});
	} else if (timeLine.globalCodeId == 123) {
		let today = moment();
	
		today.subtract(timeLine.number, timeLine.intervalType);
		today.subtract(1, timeLine.intervalType);
		
		for (let i = 0; i <= timeLine.number; i++) {
			var day = today.add(1, 'days');
			let obj = count.find((o) => moment(dateFormat(o.duration)).format('dddd') === day.format('dddd'));

			if (typeof obj === 'undefined') {
				let value_obj = {
					key: i,
					duration: day.format('ddd'),
					total: 0
				};
				newPatient.push(value_obj);
			} else {
				let value_obj2 = {
					key: i,
					duration: day.format('ddd'),
					total: obj.total
				};
				//console.log('check2',obj)
				newPatient.push(value_obj2);
			}
		}
	} else if (timeLine.globalCodeId == 124) {
		var startDate = moment();
		var endDate = moment().subtract(timeLine.number, timeLine.intervalType);

		var result = startDate.diff(endDate, 'days');

		for (let i = 0; i <= result; i++) {
			let day = endDate.add(1, 'days');
			let obj = count.find(
				(o) => moment(dateFormat(o.duration)).format('MMM DD,yyyy') === day.format('MMM DD,yyyy')
			);
			if (typeof obj === 'undefined') {
				let value_obj = {
					duration: day.format('MMM DD,yyyy'),
					total: 0
				};
				newPatient.push(value_obj);
			} else {
				let value_obj2 = {
					duration: day.format('MMM DD,yyyy'),
					total: obj.total
				};
				newPatient.push(value_obj2);
			}
		}
	} else {
		let month = [];
		for (let k = 1; k < 13; k++) {
			month.push(moment(moment().toDate()).add(k, 'month').startOf('month').format('MMMM'));
		}
		month.forEach((item, i) => {
			let obj = count.find((o) => moment(dateFormat(o.duration)).format('MMMM') === item);
			if (typeof obj === 'undefined') {
				let value_obj = {
					key: i,
					duration: item,
					total: 0
				};
				newPatient.push(value_obj);
			} else {
				let value_obj2 = {
					key: i,
					duration: item,
					total: obj.total
				};
				newPatient.push(value_obj2);
			}
		});
	}
	return newPatient;
}

export function convertResponse(timeArray, recordsArray) {
	let records = [];
	timeArray.forEach((time) => {
		let recordList = [];
		recordsArray.forEach((record) => {
			if (record.takeTime === time) {
				recordList.push(record);
			}
		});
		if (recordList.length > 0) {
			let valuesObject = {
				takeTime: time,
				data: recordList.map((item) => {
					var field = item.vitalField.replace(/ /g, '_').toLowerCase();
					item[field] = item.value;
					return item;
				})
			};
			records.push(valuesObject);
		}
	});
	return records;
}

export function convertData(patientVitals) {
	let records = [];
	patientVitals.forEach((element) => {
		let itemObject = {};
		element.data.forEach((item) => {
			var field = (item.deviceType + '_' + item.vitalField).replace(/ /g, '_').toLowerCase();
			element.data = [];
			itemObject['id'] = item.id;
			itemObject['takeTime'] = dateFormat(item.takeTime);
			itemObject['vitalField'] = item.vitalField;
			itemObject['deviceType'] = item.deviceType;
			itemObject[field] = item.value;
		});
		records.push(itemObject);
	});
	return records;
}

export function convertChartResponse(vitaldFieldsArray, recordsArray) {
	var timesArray = [];
	recordsArray.forEach((element) => {
		if (!timesArray.includes(timeFormatSimple(element.takeTime))) {
			timesArray.push(timeFormatSimple(element.takeTime));
		}
	});
	let records = [];
	vitaldFieldsArray.forEach((vitalField) => {
		let recordList = [];
		recordsArray.forEach((record) => {
			if (record.vitalField === vitalField) {
				recordList.push(record);
			}
		});
		if (recordList.length > 0) {
			let valuesObject = {
				name: vitalField,
				data: recordList.map((item) => {
					return item.value;
				})
			};
			records.push(valuesObject);
		}
	});
	return {
		records,
		timesArray
	};
}

export function createDynamicColumns(patientVitals) {
	let itemObject = {
		tableName: '',
		columns: [
			{
				title: 'Date Recorded',
				dataIndex: 'takeTime',
				key: 'takeTime',
				slots: {
					customRender: 'takeTime'
				}
			}
		]
	};
	if (patientVitals.length > 0) {
		patientVitals.map((item) => {
			var field = (item.deviceType + '_' + item.vitalField).replace(/ /g, '_').toLowerCase();
			var exists = itemObject.columns.some(function (dataIndex) {
				return dataIndex.dataIndex === field;
			});
			if (!exists) {
				// console.log('patientVitals exists', exists)
				// itemObject.tableName = item.deviceType;
				// itemObject.columns.push({
				//   title: item.vitalField,
				//   dataIndex: field,
				//   key: field,
				//   slots: {
				//     customRender: field
				//   },
				// })
			}
		});
	}
	// console.log('patientVitals itemObject', itemObject)
	return itemObject;
}

export function getSeconds(hms) {
	var a = hms.split(':'); // split it at the colons
	// minutes are worth 60 seconds. Hours are worth 60 minutes.
	var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
	return seconds;
}

export function secondsToTime(secs) {
	var hours = Math.floor(secs / (60 * 60));
	var divisor_for_minutes = secs % (60 * 60);
	var minutes = Math.floor(divisor_for_minutes / 60);
	var divisor_for_seconds = divisor_for_minutes % 60;
	var seconds = Math.ceil(divisor_for_seconds);
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	return hours + ':' + minutes + ':' + seconds;
}
export const tableYScroller = 700
export const tableYScrollerCounterPage = 500
export const disableHours = [1, 2, 3, 4, 5, 6, 7, 21, 22, 23, 24]

// export function tableScrollerData (tableContent,filters,meta,endPoint,gettres){
	
// 	var data = []
// 	tableContent.addEventListener("scroll", (event) => {
// 	let maxScroll = event.target.scrollHeight - event.target.clientHeight;
// 	let currentScroll = event.target.scrollTop + 2;
// 	if (currentScroll >= maxScroll) {
// 		let current_page = meta.current_page + 1;
        
// 		if (current_page <= meta.total_pages) {
//          data= gettres
// 			store
// 				.dispatch(
// 					endPoint,
// 					"?page=" +
// 					current_page +
// 					filters
// 				)
// 				.then((resp) => {
					
// 					if(resp==true){
// 						return {data:data,scroll:maxScroll}	
// 					}
// 				});
				
// 		}

		
// 	}
// 	return {data:data,scroll:maxScroll}	
// })
// }
