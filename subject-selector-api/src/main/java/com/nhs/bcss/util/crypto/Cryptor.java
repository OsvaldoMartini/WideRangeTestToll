package com.nhs.bcss.util.crypto;

public interface Cryptor {
    public abstract byte[] encrypt(byte abyte0[]);

    public abstract byte[] decrypt(byte abyte0[]);

    public abstract byte[] encodeBase64(byte abyte0[]);

    public abstract byte[] decodeBase64(byte abyte0[]);

    public abstract byte[] encryptAndEncodeBase64(byte abyte0[]);

    public abstract byte[] decodeBase64AndDecrypt(byte abyte0[]);

    public static final String CIPHER_KEY_ALIAS_PROPERTY_KEY = "com. st. security.cipher.key.alias";
    public static final String CIPHER_KEY_PASSWORD_PROPERTY_KEY = "com.stc.security.cipher.key.password";
    public static final String CIPHER_TRANSFORMATION_PROPERTY_KEY = "com.stc, security. cipher. transformation";
}