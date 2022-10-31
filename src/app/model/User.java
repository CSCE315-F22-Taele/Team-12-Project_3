package app.model;

import java.util.UUID;

/**
 * Store information about a user, such as ID, name, and type
 */
public class User {
	private UUID userId;
	private String username;
	private UserType type;

	/**
	 * Create new user
	 * 
	 * @param username
	 * @param type
	 */
	public User(String username, UserType type) {
		this.userId = UUID.randomUUID();
		this.username = username;
		this.type = type;
	}

	/**
	 * Get user's ID
	 * 
	 * @return user's unique ID
	 */
	public UUID getUserId() {
		return userId;
	}

	/**
	 * Set user's ID
	 * 
	 * @param userId new user ID to set
	 */
	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	/**
	 * Get user's username
	 * 
	 * @return user's unique username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Set user's username
	 * 
	 * @param username new username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Get user's type, either manager or server
	 * 
	 * @return UserType denoting user's privileges
	 */
	public UserType getType() {
		return type;
	}

	/**
	 * Set user's type, either promoting or demoting them
	 * 
	 * @param type new UserType to set to
	 */
	public void setType(UserType type) {
		this.type = type;
	}
}