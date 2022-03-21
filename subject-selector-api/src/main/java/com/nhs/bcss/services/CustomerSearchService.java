package com.nhs.bcss.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nhs.bcss.pojos.CustomerSearchPO;
import com.nhs.bcss.repositories.CustomerSearchRepository;

@Service
public class CustomerSearchService {

	@Autowired
	private CustomerSearchRepository customerSearchRepository;

	public List<CustomerSearchPO> findAllCustomerByBetweenAges(int minAge, int maxAge) {
		return customerSearchRepository.findAll();
	}

}
