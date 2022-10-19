package app.model;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.UUID;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

/**
 * Store user's password separately for security purposes
 */
public class Credentials {
	private UUID userId;
	private String hashedPassword;

	/**
	 * Creates a new instance of the credentials with the userId and hashed password
	 * @param userId
	 * @param password
	 */
	public Credentials(UUID userId, String password) {
		this.userId = userId;
		this.hashedPassword = hashPassword(password);
	}

	/**
	 * Checks if the given password matches user's password in database
	 * @param password
	 * @return: Boolean if the passwords match, else false
	 */
	public boolean checkPassword(String password) {
		String hashedPassword2 = hashPassword(password);
		return this.hashedPassword.equals(hashedPassword2);
	}

	/**
	 * Encrypt a user's password
	 * @param: password
	 * @return: hashed password
	 */
	public String hashPassword(String password) {
		SecureRandom random = new SecureRandom();
		byte[] salt = new byte[16];
		random.nextBytes(salt);
		KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);

		String hashedPassword;
		try {
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			byte[] hash = factory.generateSecret(spec).getEncoded();
			Base64.Encoder enc = Base64.getEncoder();

			hashedPassword = enc.encodeToString(hash);
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new RuntimeException(e);
		}

		this.hashedPassword = hashedPassword;

		return hashedPassword;
	}

	/**
	 * Return userId
	 * @return: userId
	 */
	public UUID getUserId() {
		return userId;
	}

	/**
	 * Set user's ID
	 * @param userId
	 */
	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	/**
	 * Return's has
	 * @return: hashedPassword
	 */
	public String getHashedPassword() {
		return hashedPassword;
	}

	public void setHashedPassword(String hashedPassword) {
		this.hashedPassword = hashedPassword;
	}
}