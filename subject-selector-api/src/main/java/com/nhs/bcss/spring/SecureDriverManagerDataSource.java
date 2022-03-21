package com.nhs.bcss.spring;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.nhs.bcss.util.crypto.Cryptor;
import com.nhs.bcss.util.crypto.CryptorImpl;


public class SecureDriverManagerDataSource extends DriverManagerDataSource {
 public String getPassword() {
	 try {
		 Cryptor cryp = CryptorImpl.getInstance();
		 return new String(cryp.decodeBase64AndDecrypt(super.getPassword().getBytes()));
	 }
	 catch(Exception e) {
		 throw new RuntimeException(e.getMessage(), e);
	 }
 }
}
