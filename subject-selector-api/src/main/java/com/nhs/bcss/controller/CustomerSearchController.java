package com.nhs.bcss.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhs.bcss.BcssSubjectCriteria;
import com.nhs.bcss.pojos.CustomerSearchPO;
import com.nhs.bcss.services.CustomerSearchService;
import com.nhs.bcss.services.MapValidationErrorService;

@RestController
@RequestMapping("/api/customersearch")
public class CustomerSearchController {
	
	private static final Logger Logger = LogManager.getLogger(BcssSubjectCriteria.class);


	@Autowired
	private CustomerSearchService customerSearchService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@GetMapping("/allCustomer/{minAge}/{maxAge}")
	public ResponseEntity<List<CustomerSearchPO>> getAllCustomerByBetweenAges(@PathVariable String minAge,@PathVariable String maxAge) {
		
		List<CustomerSearchPO> retValue = new ArrayList<CustomerSearchPO>();
		try {
			retValue = customerSearchService.findAllCustomerByBetweenAges(15, 25);
					
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		HttpHeaders responseHeaders = new HttpHeaders();

		
//		for (Map.Entry<String, String> entry : taskProcessingLines.config.getHeaders().entrySet()) {
//			Logger.info(String.format("Header Transformed %s  =  %s", entry.getKey(), entry.getValue()));
//			responseHeaders.set(entry.getKey(), entry.getValue());
//		}
		
		return ResponseEntity.ok().headers(responseHeaders).body(retValue);
		
		//return (List<CustomerSearchPO>) customerSearchService.findAllCustomerByBetweenAges(minAge, maxAge);
	}

}
