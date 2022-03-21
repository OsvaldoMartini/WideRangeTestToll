package com.nhs.bcss.util.crypto;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.Key;
import java.security.KeyStore;
import java.util.Hashtable;
import java.util.Map;
import javax.crypto.KeyGenerator;

// Referenced classes of package com,stc.is.util.crypto:
// KeyStoreUtil
public class KeyStoreUtilImpl implements KeyStoreUtil {

	private static final String DEFAULT_KEYSTORE = "/cryptorkeystore";
	private static final String DEFAULT_KEYSTORE_TYPE = "ICEKS";
	private static final char DEFAULT_KEYSTORE_PASSWORD[] = { 'c', 'h', 'a', 'n', 'g', 'e', 'i', 't' };
	private KeyStore keyStore;
	private URL keyStoreURL;
	private char keyStorePassword[];

	private KeyStoreUtilImpl(Map aProperties) {
		initialize(aProperties);
	}

	public static KeyStoreUtil getInstance(Map aProperties) {
		return new KeyStoreUtilImpl(aProperties);
	}

	public void addSymmetricKeyToKeyStore(int aKeySize, String aAlgorithm, String aAlias, char aPassword[]) {
		if (keyStoreURL == null)
			throw new RuntimeException("Error storing symmetric key; not allowed to add key to the default keystore.");
		String lProtocol = keyStoreURL.getProtocol();
		if (!"file".equalsIgnoreCase(lProtocol))
			throw new RuntimeException("Error generating symmetric key: " + lProtocol
					+ " is not supported for storing keys in the keystore");
		try {
			KeyGenerator lKG = KeyGenerator.getInstance(aAlgorithm);
			lKG.init(aKeySize);
			Key lKey = lKG.generateKey();
			keyStore.setKeyEntry(aAlias, lKey, aPassword, null);
			String lFilename = keyStoreURL.getFile();
			keyStore.store(new FileOutputStream(lFilename), keyStorePassword);
		} catch (Exception e) {
			throw new RuntimeException("Error storing secret key in the keystore: " + e.getMessage());
		}
	}

	public Key getKey(String aAlias, char aPassword[]) {
		try {
			return keyStore.getKey(aAlias, aPassword);
		} catch (Exception e) {
			throw new RuntimeException("Error getting the key from the keystore: " + e.getMessage());
		}
	}

	private void initialize(Map aProperties) {
		InputStream lKeyStoreIS = null;
		try {
			if (aProperties.containsKey("com.stc.security.keyStore")) {
				lKeyStoreIS = getKeyStoreIS((String) aProperties.get("com.stc.security.keyStore"));
			} else {
				lKeyStoreIS = KeyStoreUtilImpl.class.getResourceAsStream("/cryptorkeystore");
				if (lKeyStoreIS == null)
					throw new RuntimeException("The default keystore is not available on classpath");
			}

			keyStorePassword = aProperties.containsKey("com.stc.security.keyStore.password")
					? (char[]) aProperties.get("com.stc.security.keyStore.password")
					: DEFAULT_KEYSTORE_PASSWORD;
			String lKeyStoreType = aProperties.containsKey("com.stc.security.keyStore.type")
					? (String) aProperties.get("com.stc.security.keyStore.type")
					: "JCEKS";
			try {
				keyStore = KeyStore.getInstance(lKeyStoreType);
				keyStore.load(lKeyStoreIS, keyStorePassword);
			} catch (Exception e) {
				throw new RuntimeException("Error loading keystore; " + e.getMessage());
			}
		} finally {
			if (lKeyStoreIS != null)
				try {
					lKeyStoreIS.close();
				} catch (Throwable throwable) {
				}
		}
		return;
	}

	private InputStream getKeyStoreIS(String aKeyStoreURL) {
		if (!aKeyStoreURL.startsWith("http:") && !aKeyStoreURL.startsWith("file:") && !aKeyStoreURL.startsWith("ftp:"))
			try {
				aKeyStoreURL = (new File(aKeyStoreURL)).toURL().toString();
			} catch (MalformedURLException mue) {
				throw new RuntimeException("Error accessing the keystore; invalid file path specified, " + aKeyStoreURL
						+ ": " + mue.getMessage());
			}

		InputStream lKeyStoreIS = null;
		try {
			keyStoreURL = new URL(aKeyStoreURL);
			lKeyStoreIS = keyStoreURL.openStream();
		} catch (MalformedURLException me) {
			throw new RuntimeException(
					"Error accessing the keystore; invalid url specified, " + aKeyStoreURL + "; " + me.getMessage());
		} catch (IOException ioe) {
			throw new RuntimeException(
					"Error accessing the keystore; using the URL, " + aKeyStoreURL + ": " + ioe.getMessage());
		}
		return lKeyStoreIS;
	}

	public static void main(String args[]) {
		try {
			Map lProperties = new Hashtable(1);
			lProperties.put("com, stc,security.keyStore", "file:C:/tmp/tmpkeystore");
			KeyStoreUtil lKSU = getInstance(lProperties);
			lKSU.addSymmetricKeyToKeyStore(56, "DES", "bala", "changeit".toCharArray());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}