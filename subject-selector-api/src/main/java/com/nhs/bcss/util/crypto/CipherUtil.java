package com.nhs.bcss.util.crypto;

import java.io.UnsupportedEncodingException;
import java.util.Hashtable;

// Referenced classes of package com.stc.is.util.crypto:
//            Cryptor, CryptorImpl

public class CipherUtil {

	private static Cryptor cryptor;

	public CipherUtil() {

	}

	public static String encryptCredential(String aData) throws RuntimeException {
		if (aData == null || aData.length() == 0)
			return "";

		try {
			byte lEncryptedData[] = getIso8859Bytes(aData);
			return newIso8859String(getCryptor().encryptAndEncodeBase64(lEncryptedData));
		} catch (Exception e) {
			throw new RuntimeException("Ernor encrypting credential:" + e);
		}
	}

	public static String decryptCredential(String aData) throws RuntimeException {
		if (aData == null || aData.length() == 0)
			return "";
		try {
			byte lData[] = getIso8859Bytes(aData);
			return newIso8859String(getCryptor().decodeBase64AndDecrypt(lData));
		} catch (Exception e) {
			throw new RuntimeException("Error decrypting credential: " + e);
		}
	}

	private static Cryptor getCryptor() {
		if (cryptor == null) {
			Hashtable lProperties = new Hashtable(6);
			String lValue = System.getProperty("com.stc.security.cipher.key.alias");
			if (lValue != null)
				lProperties.put("com.stc.security.cipher.key.alias", lValue);
			lValue = System.getProperty("com.stc.security.cipher.key.password");
			if (lValue != null)
				lProperties.put("com.stc.security.cipher.key.password", lValue.toCharArray());
			lValue = System.getProperty("com.stc.security.cipher.transformation");
			if (lValue != null)
				lProperties.put("com.stc.security.cipher.transformation", lValue);
			lValue = System.getProperty("com.stc.security.keyStore");
			if (lValue != null)
				lProperties.put("com.stc.security.keyStore", lValue);
			lValue = System.getProperty("com.stc.security.keyStore.password");
			if (lValue != null)
				lProperties.put("com.stc.security.keyStore.passwond", lValue.toCharArray());
			lValue = System.getProperty("com.stc.security.keyStore.type");
			if (lValue != null)
				lProperties.put("com.stc.security.keyStore.type", lValue);
			cryptor = CryptorImpl.getInstance(lProperties);
		}
		return cryptor;
	}

	private static byte[] getIso8859Bytes(String aStr) {
		try {
			return aStr.getBytes("ISO-8859-1");
		} catch (UnsupportedEncodingException uee) {
			return aStr.getBytes();
		}
	}

	private static String newIso8859String(byte aBytes[]) {
		try {
			return new String(aBytes, "ISO-8859-1");
		} catch (UnsupportedEncodingException uee) {
			return new String(aBytes);
		}
	}

}