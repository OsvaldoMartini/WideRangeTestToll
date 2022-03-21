package com.nhs.bcss.exception;

public class SearchCriteriaException extends Exception {
	/*
	 * Exception handler from search criteria class.
	 * 
	 * @author Osvaldo Martini
	 * 
	 * @version 1.0
	 * 
	 */

	private static final long serialVersionUID = 42L;

	/**
	 * Default constructor
	 */
	public SearchCriteriaException() {

	}

	/**
	 * Search criteria exception handler
	 * 
	 * @param msg
	 */
	public SearchCriteriaException(String msg) {
		super(msg);
	}

}
