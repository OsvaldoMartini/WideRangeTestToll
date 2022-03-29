package uk.nhs.bcss.util.crypto;

import java.security.Key;

public interface KeyStoreUtil {

    public abstract void addSymmetricKeyToKeyStore(int i, String S, String S1, char ac[]);

    public abstract Key getKey(String S, char ac[]);

    public static final String KEYSTORE_URL_PROPERTY_KEY = "com.stc.security.keyStore";
    public static final String KEYSTORE_TYPE_PROPERTY_KEY = "com.stc.security.keyStore.type";
    public static final String KEYSTORE_PASSWORD_PROPERTY_KEY = "com.stc.security.keyStore.password";
}