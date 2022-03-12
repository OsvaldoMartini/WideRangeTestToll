package com.nhs.bcss.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "`users`")
@ApiModel(description="All details about the Users. ")
public class UserPO {

	//@ApiModelProperty(notes = "The database generated users ID")
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	//@ApiModelProperty(notes = "The users first name")
	@Column(name = "firstName")
	private String firstName;

	//@ApiModelProperty(notes = "The users last name")
	@Column(name = "lastName")
	private String lastName;

	//@ApiModelProperty(notes = "The users email id")
	@Column(name = "emailAddress")
	private String emailAddress;

	public UserPO() {

	}

	public UserPO(String firstName, String lastName, String emailAddress) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = emailAddress;
	}

	public UserPO(long id, String firstName, String lastName, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = email;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "first_name", nullable = false)
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column(name = "last_name", nullable = false)
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Column(name = "email_address", nullable = false)
	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	
	@Override
	public String toString() {
		return "UserPojo [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailAddress=" + emailAddress + "]";
	}


}
