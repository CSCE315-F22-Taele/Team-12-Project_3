package app.service;

import app.Main;
// import app.model.Credentials;
import app.model.User;
import app.model.UserType;
import app.repository.dbExec;

/**
 * Handle authentication of users on login page
 */
public class Authentication {
	/**
	 * Get type that user is trying to sign in as, based on the page that led them to authentication
	 * 
	 * @param type name of file from which the user navigated
	 * @return UserType that user is trying to sign in as
	 */
	public static UserType getTypeFromString(String type) {
		if (type.toLowerCase().equals("server.fxml"))
			return UserType.SERVER;
		else return UserType.MANAGER;
	}

	/**
	 * Determine if password matches user's things from credentials
	 * Also make sure user isn't trying to get more privilege than they actually have
	 * 
	 * @param userName username entered by user
	 * @param password password entered by user
	 * @return the validity of username+password combination
	 */
	public static boolean checkPassword(String userName, String password) {
		if (userName.equals("") || password.equals("")) {			// if either left blank, can't authenticate
			return false;
		}
		if (!dbExec.checkUserExistence(userName)) {			// user can't be found in database
			return false;
		}
		
		UserType actType = dbExec.findUserTypeByName(userName);		// user's actual type by name
		UserType desType = getTypeFromString(Main.authen);			// type that the user is trying to sign in as

		if (actType == UserType.SERVER && desType == UserType.MANAGER) {			// server can't sign in as manager
			return false;
		}
		// other than that, manager can sign in as server, and obviously managermanager and serverserver work

		User user = dbExec.findUserByUserName(userName, actType);
		String realPass = dbExec.getUserPassword(user.getUserId());
		// Credentials credential = new Credentials(user.getUserId(), realPass);
		// return credential.checkPassword(password);
		return realPass.equals(password);
	}
}
