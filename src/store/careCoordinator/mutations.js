import {dateAndTimeFormate} from '@/commonMethods/commonMethod';
export const counterPlus = (state, data) => {
	if (data) {
		state.counter = data;
	} else {
		state.counter++;
	}
};

export const counterMinus = (state) => {
	state.counter--;
};

export const resetCounter = (state) => {
	state.counter = 0;
};

export const addStaff = async (state, data) => {
	state.addStaff = data;
};

export const updateStaff = async (state, data) => {
	state.updateStaff = data;
};

export const errorMsg = (state, data) => {
	state.errorMsg = data;
};

export const specializationStaff = (state, data) => {
	state.specializationStaff = data;
};

export const networkStaff = (state, data) => {
	state.networkStaff = data;
};

export const staff = async (state, data) => {

	state.staffs = data.data;
	state.columns = [
		{
			title: 'Name',
			dataIndex: 'fullName',
			sorter: true,
			slots: {
				customRender: 'name'
			}
		},
		{
			title: 'Role',
			dataIndex: 'role',
			slots: {
				customRender: 'role'
			},
			sorter: true
		},
		{
			title: 'Specialization',
			dataIndex: 'specialization',
			sorter: true
		},
		{
			title: 'Network',
			dataIndex: 'network',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			sorter: true,
			slots: {
				customRender: 'createdDate'
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			slots: {
				customRender: 'status'
			}
		},
		{
			title: 'Action',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
	state.staffMeta = data.meta.pagination;
};

export const addContacts = (state, data) => {
	state.addContacts = data;
};

export const staffContactList = (state, data) => {
	state.staffContactList = data.map(item => {
		item.phoneNumber = item.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$2-$2-$3")
		return item
	});
	state.staffContactColms = [
		{
			title: 'First Name',
			dataIndex: 'firstName'
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName'
		},
		{
			title: 'Email',
			dataIndex: 'email'
		},
		{
			title: 'Phone No',
			dataIndex: 'phoneNumber'
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const addAvailability = (state, data) => {
	state.addAvailability = data;
};

export const availabilityList = (state, data) => {
	(state.availabilityList = data.map((item) => {
		item.startTime = dateAndTimeFormate(item.startTime,'hh:mm A');
		item.endTime = dateAndTimeFormate(item.endTime,'hh:mm A');
		return item;
	})),
		(state.availabilityListColms = [
			{
				title: 'Start Time',
				dataIndex: 'startTime'
			},
			{
				title: 'End Time',
				dataIndex: 'endTime'
			},
			{
				title: 'Actions',
				dataIndex: 'actions',
				slots: {
					customRender: 'action'
				}
			}
		]);
};

export const addStaffRole = (state, data) => {
	state.addStaffRole = data;
};

export const roleList = (state, data) => {
	(state.roleList = data),
		(state.roleListColms = [
			{
				title: 'Role',
				dataIndex: 'role',
				slots: {
					customRender: 'role'
				}
			},
			{
				title: 'Actions',
				dataIndex: 'actions',
				slots: {
					customRender: 'action'
				}
			}
		]);
};

export const addProvider = (state, data) => {
	state.addProvider = data;
};

export const providerList = (state, data) => {
	state.providerList = data;
	state.providerListColms = [
		{
			title: 'Provider Name',
			dataIndex: 'name'
		},

		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const roles = (state, data) => {
	state.roles = data;
};

export const providers = (state, data) => {
	state.providers = data;
};

export const addStaffDocument = (state, data) => {
	state.addStaffDocument = data;
};

export const staffDocuments = (state, data) => {
	state.staffDocuments = data.map((item) => {
		return item;
	});
	state.documentColumns = [
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Document',
			dataIndex: 'document',
			slots: {
				customRender: 'document'
			}
		},
		{
			title: '	Type',
			dataIndex: 'type'
		},
		{
			title: '	Tags',
			dataIndex: 'tags',
			slots: {
				customRender: 'tags'
			}
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const closeModal = (state, data) => {
	state.closeModal = data;
};

export const availabilityDetails = (state, data) => {
	data.startTime = dateAndTimeFormate(data.startTime,'HH:mm')
	data.endTime = dateAndTimeFormate(data.endTime,'HH:mm')
	state.availabilityDetails = data;
};

export const contactDetails = (state, data) => {
	state.contactDetails = data;
};


export const clearStaffFormValidation = (state, data) => {
	state.clearStaffFormValidation = data;
};


export const documentStaffDetails = (state, data) => {
 const tags = []
  data.tag.map(tag => {
    tags.push(tag.tagId)
  })
  data.tags = tags
  data.document = data.path
  data.type = data.typeId
  state.documentStaffDetails = data
};


