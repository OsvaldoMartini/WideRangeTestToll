package uk.nhs.bcss.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.nhs.bcss.BcssSubjectCriteria;
import uk.nhs.bcss.pojos.CustomerSearchPO;
import uk.nhs.bcss.services.CustomerSearchService;
import uk.nhs.bcss.services.MapValidationErrorService;

@RestController
@RequestMapping("/api/subjectsearch")
@CrossOrigin
public class CustomerSearchController {

	private static final Logger Logger = LogManager.getLogger(BcssSubjectCriteria.class);

	@Autowired
	private CustomerSearchService customerSearchService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@GetMapping("/byAge/{operation}/{minAge}/{maxAge}")
	public ResponseEntity<List<CustomerSearchPO>> getAllCustomerByBetweenAges(@PathVariable String operation,
			@PathVariable short minAge, @PathVariable short maxAge) {

		List<CustomerSearchPO> retValue = new ArrayList<CustomerSearchPO>();
		try {
			retValue = customerSearchService.findAllCustomersByAge(minAge, maxAge, operation);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		HttpHeaders responseHeaders = new HttpHeaders();

		return ResponseEntity.ok().headers(responseHeaders).body(retValue);

	}
	
	@RequestMapping("/byAge/{operation}/{minAge}")
	public ResponseEntity<List<CustomerSearchPO>> getAllCustomerByBetweenAges(@PathVariable String operation, @PathVariable short minAge) {

		List<CustomerSearchPO> retValue = new ArrayList<CustomerSearchPO>();
		try {
			retValue = customerSearchService.findAllCustomersByAge(minAge, Integer.MAX_VALUE, operation);
		} catch (Exception e) {
			e.printStackTrace();
		}

		HttpHeaders responseHeaders = new HttpHeaders();

		return ResponseEntity.ok().headers(responseHeaders).body(retValue);
	}

	@GetMapping("/{nhsNumber}")
	public ResponseEntity<List<CustomerSearchPO>> getAllCustomerByNhsNumber(@PathVariable String nhsNumber) {

		List<CustomerSearchPO> retValue = new ArrayList<CustomerSearchPO>();
		try {
			retValue = customerSearchService.findAllCustomersByNHSNumber(nhsNumber);
		} catch (Exception e) {
			e.printStackTrace();
		}

		HttpHeaders responseHeaders = new HttpHeaders();

		return ResponseEntity.ok().headers(responseHeaders).body(retValue);
	}
	
	@GetMapping("/{nhsNumber}/{operation}/{minAge}/{maxAge}")
	public ResponseEntity<List<CustomerSearchPO>> getAllCustomerByNhsNumberAndBetweenAges(@PathVariable String nhsNumber, @PathVariable String operation,
			@PathVariable short minAge, @PathVariable short maxAge) {

		List<CustomerSearchPO> retValue = new ArrayList<CustomerSearchPO>();
		try {
			retValue = customerSearchService.findAllCustomersByNhsNumberAndAge(nhsNumber, minAge, maxAge, operation);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		HttpHeaders responseHeaders = new HttpHeaders();

		return ResponseEntity.ok().headers(responseHeaders).body(retValue);

	}
	
	@GetMapping("/{nhsNumber}/{operation}/{minAge}")
	public ResponseEntity<List<CustomerSearchPO>> getAllCustomerByNhsNumberAndBetweenAges(@PathVariable String nhsNumber, @PathVariable String operation,
			@PathVariable short minAge) {

		List<CustomerSearchPO> retValue = new ArrayList<CustomerSearchPO>();
		try {
			retValue = customerSearchService.findAllCustomersByNhsNumberAndAge(nhsNumber, minAge, Integer.MAX_VALUE, operation);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		HttpHeaders responseHeaders = new HttpHeaders();

		return ResponseEntity.ok().headers(responseHeaders).body(retValue);

	}

}
