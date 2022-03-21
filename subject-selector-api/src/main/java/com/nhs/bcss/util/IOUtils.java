package com.nhs.bcss.util;

import com.nhs.bcss.util.crypto.Cryptor;
import com.nhs.bcss.util.crypto.CryptorImpl;

public class IOUtils {

    public static Cryptor cri = CryptorImpl.getInstance();

    public static String encrypt(String input) {
        String ret = "";
        try {
            ret = new String(cri.encryptAndEncodeBase64(input.getBytes()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ret;
    }

    public static String decrypt(String input) {
        String ret = "";
        try {
            ret = new String(cri.decodeBase64AndDecrypt(input.getBytes()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ret;
    }

    /**
     * @param args
     */

    public static void main(String[] args) {
        System.out.println("Original text. . . . .: " + args[0]);
        System.out.println("Encrypted text. . . . : " + IOUtils.encrypt(args[0]));
        System.out.println("Decrypted text. . . . : " + IOUtils.decrypt(IOUtils.encrypt(args[0])));
        System.out.println("Decrypted text. . . . : " + IOUtils.decrypt(args[1]));
    }
}
