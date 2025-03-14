package website.parkit.ParkIT.model;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.time.LocalDateTime;


public class Account {

    private String email;
    private String password; // stores the hashed password

    public Account(String email, String password) {
        this.email = email;
        setPassword(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    /**
     * Sets the account password.
     * The provided plain text password is hashed before being stored.
     *
     * @param plainPassword the plain text password to hash and store
     */

    public void setPassword(String plainPassword) {
        this.password = hashPassword(plainPassword);
    }

    /**
     * Checks if the provided plain text password matches the stored hashed password.
     *
     * @param plainPassword the plain text password to validate
     * @return true if the password matches, false otherwise
     */
    public boolean validatePassword(String plainPassword) {
        return Objects.equals(this.password, hashPassword(plainPassword));
    }

    /**
     * Hash password using SHA-256.
     *
     * @param password the plain text password
     * @return the hashed password as a hexadecimal string
     */
    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
