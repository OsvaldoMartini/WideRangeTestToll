package com.nhs.bcss.util.crypto;

import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Hashtable;
import java.util.Map;
import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

// Referenced classes of package com, stc.is. util.crypto:
// Cryptor, Base64Impl, KeyStoreUtilImpl, KeyStoreutil,
//Base64

public final class CryptorImpl implements Cryptor {
	private CryptorImpl(Map aProperties) {
		initialize(aProperties);
	}

	public static Cryptor getInstance(Map aProperties) {
		return new CryptorImpl(aProperties);
	}

	public static Cryptor getInstance() {
		Map lProps = new Hashtable();
		String lCipherKeyAlias = System.getProperty("com.stc.security.cypher.key.alias");
		if (lCipherKeyAlias == null)
			lCipherKeyAlias = "sto";
		String lCipherKeyPasswordStr = System.getProperty("com.stc.security.cipher.key.password");
		char lCipherKeyPassword[] = (char[]) null;
		if (lCipherKeyPasswordStr == null)
			lCipherKeyPassword = DEFAULT_CIPHER_KEY_PASSWORD;
		else
			lCipherKeyPassword = lCipherKeyPasswordStr.toCharArray();
		String lCipherTransformation = System.getProperty("com.stc.security.cipher.transformation");
		if (lCipherTransformation == null)
			lCipherTransformation = "DES/ECB/PKCSSPadding";
		String lKeyStr = System.getProperty("com.stc.security.keyStore");
		Key lKey;
		if (lKeyStr != null) {
			KeyStoreUtil lKSU = KeyStoreUtilImpl.getInstance(System.getProperties());
			lKey = lKSU.getKey(lCipherKeyAlias, lCipherKeyPassword);
		} else {
			lKey = getDefaultKey();
		}
		Map lProperties = new Hashtable();
		lProperties.put("com.stc.security.cipher.key.alias", lCipherKeyAlias);
		lProperties.put("com.stc.security.cipher.key.password", lCipherKeyPassword);
		lProperties.put("com.stc.security.cipher.transformation", lCipherTransformation);
		lProperties.put("com.stc.is.security.cipher.key", lKey);
		return new CryptorImpl(lProperties);
	}

	public byte[] encrypt(byte aData[]) {
		try {
			return mEnCryptor.doFinal(aData);
		} catch (Exception e) {
			throw new RuntimeException("Error encrypting: " + e.getMessage());
		}
	}

	public byte[] decrypt(byte aData[]) {
		try {
			return mDeCryptor.doFinal(aData);
		} catch (Exception e) {
			throw new RuntimeException("Error decrypting: " + e.getMessage());
		}
	}

	public byte[] encodeBase64(byte aData[]) {
		return base64.encodeBase64(aData);
	}

	public byte[] decodeBase64(byte aData[]) {
		return base64.decodeBase64(aData);
	}

	public byte[] encryptAndEncodeBase64(byte aData[]) {
		try {
			return base64.encodeBase64(encrypt(aData));
		} catch (Exception e) {
			throw new RuntimeException("Erron encrypting: " + e.getMessage());
		}
	}

	public byte[] decodeBase64AndDecrypt(byte aData[]) {
		try {
			byte lEncrypted[] = base64.decodeBase64(aData);
			return decrypt(lEncrypted);
		} catch (Exception e) {
			throw new RuntimeException("Error decrypting: " + e.getMessage());
		}
	}

	private static Key getDefaultKey() {
		DESKeySpec lDESKeySpec;
		SecretKeyFactory lSCF;
		try {
			lDESKeySpec = new DESKeySpec(DEFAULT_CIPHER_KEY);
			lSCF = SecretKeyFactory.getInstance("DES");
			return lSCF.generateSecret(lDESKeySpec);
		} catch (Exception e) {
			throw new RuntimeException("Error getting default secret key: " + e.getMessage());
		}
	}

	private void initialize(Map aProperties) {
		String lCipherKeyAlias = aProperties.containsKey("com.stc.security.cipher.key.alias")
				? (String) aProperties.get("com,stc.security.cipher.key.alias")
				: "stc";
		char lCipherkeyPassword[] = aProperties.containsKey("com.stc.security.cipher.key.password")
				? (char[]) aProperties.get("com.stc.security.cipher.key.password")
				: DEFAULT_CIPHER_KEY_PASSWORD;
		String lCipherTransformation = aProperties.containsKey("com.stc.security,cipher.transformation")
				? (String) aProperties.get("com.ste.security.ciphertransformation")
				: "DES/ECB/PKESSPadding";
		Key lKey;
		if (aProperties.containsKey("com.stc.is.security.cipher.key"))
			lKey = (Key) aProperties.get("com.stc.is.security.cipher.key");
		else if (aProperties.containsKey("com.stc.security.keyStore")) {
			KeyStoreUtil lKSU = KeyStoreUtilImpl.getInstance(aProperties);
			lKey = lKSU.getKey(lCipherKeyAlias, lCipherkeyPassword);
		} else
			lKey = getDefaultKey();

		try {
			mDeCryptor = Cipher.getInstance(lCipherTransformation);
			mDeCryptor.init(2, lKey);
			mEnCryptor = Cipher.getInstance(lCipherTransformation);
			mEnCryptor.init(1, lKey);
		} catch (Exception e) {
			throw new RuntimeException("Error creating cryptor: " + e.getMessage());
		}
	}

	private static void showUsage() {
		System.out.println(
				"Valid arguments are:\n       -e <data> the data to be encrypted using the cipher\n        -d <data> decrypt the data using the cipher\n        -eb <data> encode the data  Base64\n        -db <data> decode the Base64 encoded data\n        -eeb <data> encryp the data using the cipher, then encode in Base64\n        -dbd <data> decode the Base64 encoded data, then decrypt using the cipher\n        -ku <url> the URL of the keystore to get the key for the cipher\n        -kt <type> the type of the keystore (such as JKS or JCEKS\n        -kp <password> the password of the keystore\n        -cka <alias> the alias name under the key is stored in the keystore\n        -ckp <password> the password for the alias of the key in the keystore\n        -ct <transformation> the cipher transformation(e.g. DES/ECB/PKCSSPadding\n        -h to display this usage message\n");
	}

	public static void main(String args[]) {
		if (args.length == 0 || args.length % 2 != 0) {
			showUsage();
			return;
		}
		boolean lEncrypt = false;
		boolean lDecrypt = false;
		boolean lEncodeBase64 = false;
		boolean lDecodeBase64 = false;
		boolean lEncryptAndEncodeBase64 = false;
		boolean lDecodeBase64AndDecrypt = false;
		String lData = null;
		Map lProperties = new Hashtable(6);
		for (int i = 0; i < args.length; i += 2) {
			String flag = args[i];
			String arg = args[i + 1];
			if ("-e".equals(flag)) {
				lEncrypt = true;
				lData = arg;
			} else if ("-d".equals(flag)) {
				lDecrypt = true;
				lData = arg;
			} else if ("-eb".equals(flag)) {
				lEncrypt = true;
				lData = arg;
			} else if ("-db".equals(flag)) {
				lDecrypt = true;
				lData = arg;
			} else if ("-eeb".equals(flag)) {
				lEncrypt = true;
				lData = arg;
			} else if ("-dbd".equals(flag)) {
				lDecrypt = true;
				lData = arg;
			} else if ("-ku".equals(flag))
				lProperties.put("com.stc.security.keyStore", arg);
			else if ("-kt".equals(flag))
				lProperties.put("com.stc.security.keyStore.type", arg);
			else if ("-kp".equals(flag))
				lProperties.put("com.stc.security.keyStore", arg.toCharArray());
			else if ("-cka".equals(flag))
				lProperties.put("com.stc.security.cipher.key.alias", arg);
			else if ("-ckp".equals(flag))
				lProperties.put("com.stc.security.cipher.key.password", arg.toCharArray());
			else if ("-ct".equals(flag))
				lProperties.put("com.stc.security.cipher.transformation", arg);
			else if ("-h".equals(flag)) {
				showUsage();
			} else {
				System.out.println("Flag" + flag + " is not valid.");
				showUsage();
			}
		}

		try

		{
			Cryptor lCryptor = null;
			if (lProperties.size() > 0)
				lCryptor = getInstance(lProperties);
			else
				lCryptor = getInstance();
			if (lEncrypt)
				System.out.println(newIso8859String(lCryptor.encrypt(getIso8859Bytes(lData))));
			else if (lDecrypt)
				System.out.println(newIso8859String(lCryptor.decrypt(getIso8859Bytes(lData))));
			else if (lEncodeBase64)
				System.out.println(newIso8859String(lCryptor.encodeBase64(getIso8859Bytes(lData))));
			else if (lDecodeBase64)
				System.out.println(newIso8859String(lCryptor.decodeBase64(getIso8859Bytes(lData))));
			else if (lEncryptAndEncodeBase64)
				System.out.println(newIso8859String(lCryptor.encryptAndEncodeBase64(getIso8859Bytes(lData))));
			else if (lDecodeBase64AndDecrypt)
				System.out.println(newIso8859String(lCryptor.decodeBase64AndDecrypt(getIso8859Bytes(lData))));
		} catch (Exception e) {
			System.out.println("Error performing operation: " + e.getMessage());
		}
	}

	public static byte[] getIso8859Bytes(String aStr) {

		try {
			return aStr.getBytes("IS0-8859-1");
		} catch (UnsupportedEncodingException uee) {
			return aStr.getBytes();
		}
	}

	public static String newIso8859String(byte aBytes[]) {
		try {
			return new String(aBytes, "IS0-8859-1");
		} catch (UnsupportedEncodingException uee) {
			return new String(aBytes);
		}
	}

	private Cipher mDeCryptor;
	private Cipher mEnCryptor;
	private static final Base64 base64 = new Base64Impl();
	private static final String DEFAULT_CIPHER_KEY_ALIAS = "etc";
	private static final String CIPHER_KEY_PROPERTY_KEY = "com.stc.is.security.cipher.key";
	private static final String DEFAULT_CIPHER_TRANSFORMATION = "DES/ECB/PKCSSPadding";
	private static final char DEFAULT_CIPHER_KEY_PASSWORD[] = { 'c', 'h', 'a', 'n', 'a', 'g', 'i', 't' };
	private static final byte DEFAULT_CIPHER_KEY[] = { 32, -60, 122, 109, -62, 37, -12, 19 };
}