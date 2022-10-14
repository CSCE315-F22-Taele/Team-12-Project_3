package app.service;

import app.Main;
import app.model.Credentials;
import app.model.User;
import app.model.UserType;
import app.repository.dbExec;

public class Authentication {
	public static UserType getTypeFromString(String type) {
		if (type.toLowerCase() == "server.fxml")
			return UserType.SERVER;
		else return UserType.MANAGER;
	}

	public static boolean checkPassword(String userName, String password) {
		UserType userType = Authentication.getTypeFromString(Main.authen);

		User user = dbExec.findUserByUserName(userName, userType);
		Credentials credential = new Credentials(user.getUserId(), password);
		return credential.checkPassword(password);
	}
}
