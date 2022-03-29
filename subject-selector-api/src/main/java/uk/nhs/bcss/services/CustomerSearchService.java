package uk.nhs.bcss.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uk.nhs.bcss.pojos.CustomerSearchPO;
import uk.nhs.bcss.repositories.CustomerSearchRepository;

@Service
public class CustomerSearchService {

	@Autowired
	private CustomerSearchRepository customerSearchRepository;

	public List<CustomerSearchPO> findAllCustomersBy(int minAge, int maxAge, String operation) {
		return customerSearchRepository.findAll(minAge, maxAge, operation);
	}

}
