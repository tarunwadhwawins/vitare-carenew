export const errorMsg = (state, data) => {
	state.errorMsg = data;
};
export const providerData = (state, data) => {
	state.provider = data;
};
export const providerLocation = (state, data) => {
	state.providerLocation = data;
};

export const provider = (state, data) => {
	state.providersListAll = data.data.map((element) => {
		element.phoneNumber = element.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
		element.isActive = element.isActive == 1 ? true : false;
		return element;
	});
	state.providerMeta = data.meta.pagination;
	state.providerListColumns = [
		{
			title: 'Provider Name',
			dataIndex: 'name',
			sorter: true,
			slots: {
				customRender: 'name'
			}
		},
		{
			title: 'Provider Address',
			dataIndex: 'address'
		},
		{
			title: 'Active/Inactive',
			dataIndex: 'isActive',
			slots: {
				customRender: 'isActive'
			}
		},
		{
			title: 'Action',
			dataIndex: 'action',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const editSingleProvider = async (state, result) => {
	state.editSingleProvider = result;
	result.tagId = JSON.parse(result.tagId);
	result.moduleId = JSON.parse(result.moduleId);
	state.editSingleProvider['phoneNumber'] = result.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
};
export const providerLocationList = (state, data) => {
	state.providerLocationList = '';
	state.providerLocationList = data.map((element) => {
		element.phoneNumber = element.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
		return element;
	});
	state.columns = [
		{
			title: 'Location Name',
			dataIndex: 'locationName'
		},
		{
			title: 'Phone Number',
			dataIndex: 'phoneNumber'
		},
		{
			title: 'No. of Location',
			dataIndex: 'noOfLocations'
		},
		{
			title: 'Address',
			dataIndex: 'address'
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

export const updateSingleProvider = (state, data) => {
	state.updateSingleProvider = data;
	state.updateSingleProvider['phoneNumber'] = data.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
};


export const editProviderLocation = (state, data) => {
	state.editProviderLocation = data;
	state.editProviderLocation['phoneNumber'] = data.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
};
