package app.service;

import app.Main;
import app.model.Credentials;
import app.model.User;
import app.model.UserType;
import app.repository.dbExec;

public class Authentication {
	public static UserType getTypeFromString(String type) {
		if (type.toLowerCase().equals("server.fxml"))
			return UserType.SERVER;
		else return UserType.MANAGER;
	}

	public static boolean checkPassword(String userName, String password) {
		if (userName.equals("") || password.equals("")) {			// if either left blank, can't authenticate
			return false;
		}
		if (!dbExec.checkUserExistence(userName)) {			// user can't be found in database
			return false;
		}
		
		UserType actType = dbExec.findUserTypeByName(userName);		// user's actual type by name
		UserType desType = getTypeFromString(Main.authen);			// type that the user is trying to sign in as

		// System.out.println("User is a " + actType.toString() + " trying to sign in as a " + desType.toString());
		if (actType == UserType.SERVER && desType == UserType.MANAGER) {			// server can't sign in as manager
			return false;
		}
		// other than that, manager can sign in as server, and obviously manager:manager and server:server work

		User user = dbExec.findUserByUserName(userName, actType);
		Credentials credential = new Credentials(user.getUserId(), password);
		return credential.checkPassword(password);
	}
}
