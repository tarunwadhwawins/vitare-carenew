import {
	responseConvert,
	dateFormat,
	dateOnlyFormat,
	meridiemFormatFromTimestamp
} from '../../commonMethods/commonMethod';
import moment from 'moment';

export const addStaff = async (state, data) => {
	state.addStaff = data;
};

export const errorMsg = (state, data) => {
	state.errorMsg = data;
};
export const successMsg = (state, data) => {
	state.successMsg = data;
};
export const searchAppointmentSuccess = async (state, data) => {
	state.searchAppointmentRecords = '';
	if (data.key == 3) {
		state.searchAppointmentRecords = responseConvert(state.weekName, data.data, 'dddd');
	} else if (data.key == 4) {
		state.searchAppointmentRecords = data.data.map((item) => {
			item.title = item.appointmentType;
			item.timeGet = item.duration;
			item.date = moment(dateFormat(item.date)).format('YYYY-MM-DD');
			return { ...item };
		});
	} else {
		let officeTime = [
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
		state.searchAppointmentRecords = responseConvert(officeTime, data.data, 'hh:00 A');
	}
};
export const GetWeekName = (state, date) => {
	let from = date.from;
	let dayName = [];
	for (var i = 0; i < 7; i++) {
		var day = from.add(1, 'days');
		dayName.push(day.format('dddd'));
	}
	state.weekName = dayName;
};
export const calendarDateSelect = (state, date) => {
	state.calendarDate = date;
};
export const showMoreRecords = (state, data) => {
	let getRecord = [];
	data.data.forEach((element, index) => {
		if (index > data.to - 1) {
			element['key'] = index;
			//element['satartTime']=dateAndTimeFormate(element.date,'hh:mm A')
			// element['date']=dateAndTimeFormate(element.date,'MMM DD, yyyy')

			getRecord.push(element);
		}
	});

	state.showMoreRecords = getRecord;
};

export const latestAppointmentSuccess = (state, response) => {
	if (response && response.length > 0) {
		const data = response[0].value;
		data[0].date = dateOnlyFormat(data[0].date);
		state.latestAppointment = data;
	} else {
		state.latestAppointment = null;
	}
};

export const appointmentConference = (state, data) => {
	state.appointmentConference = data;
};

export const getStaffs = async (state, data) => {
	state.getStaff = data;
};


export const appointmentDetails = (state, data) => {
	state.appointmentDetails = data;
}

export const patientAppointmentsList = (state, appointments) => {
	console.log('patientAppointmentsList Mutation', appointments)
	state.patientAppointmentsList = appointments.map(data => {
		data.staff = data.staff.fullName
		data.date = dateOnlyFormat(data.date)
		data.time = meridiemFormatFromTimestamp(data.time)
		data.dateTime = data.date+' '+data.time
		return data
	});
};



export const requestCall = (state, data) => {
	state.requestCall = data;
}


