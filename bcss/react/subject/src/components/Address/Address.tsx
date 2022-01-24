import React from 'react'

export interface AddressProps {
	address: {
		addressLine1: string; 
		addressLine2?: string; 
		addressLine3?: string; 
		addressLine4?: string; 
		addressLine5?: string; 
		postCode?: string; 
	};
}

const Address = ({address = {addressLine1: 'No address'}}:AddressProps) => {
	return (
		<> 
			{join(address)}
		</>
	);
}

const join = (address : AddressProps["address"]) => {
	var fullAddress = "";
	for (const [value] of Object.entries(address)) {
		fullAddress += (fullAddress.length > 0 ? ", " : "") + value;
	}
	return fullAddress;
};

export default Address;
