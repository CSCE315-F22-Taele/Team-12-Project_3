package app.model;

import java.util.UUID;

public class User {
	private UUID userId;
	private String username;
	private UserType type;

	public User(String username, UserType type) {
		this.userId = UUID.randomUUID();
		this.username = username;
		this.type = type;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public UserType getType() {
		return type;
	}

	public void setType(UserType type) {
		this.type = type;
	}
}