package com.bai.utils;

import jakarta.inject.Singleton;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Singleton
public class PasswordHash {

    public String getEncodedPassword(String password) {
        return Hex.encodeHexString(hashPassword(password.toCharArray()));
    }

    private byte[] hashPassword(final char[] password) {
        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            int iterations = 10;
            int keyLength = 80;
            PBEKeySpec spec = new PBEKeySpec(password, "1805".getBytes(), iterations, keyLength);
            SecretKey key = skf.generateSecret(spec);
            return key.getEncoded();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }
}
