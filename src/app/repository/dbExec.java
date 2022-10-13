package app.repository;

import java.sql.SQLException;

import app.db.jdbcpostgreSQL;
import app.model.User;
import app.model.UserType;

public class dbExec {
	public static User findUserByUserName(String userName, UserType type) {
		User user = new User(userName, type);        
        try {
			jdbcpostgreSQL.stmt.executeUpdate(queries.findUserByUserName(userName));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}
}
