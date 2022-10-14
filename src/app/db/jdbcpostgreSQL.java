package app.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/*
CSCE 315
9-27-2021 Lab
 */
public class jdbcpostgreSQL {
	public static Connection conn;
	public static Statement stmt;

	public jdbcpostgreSQL() {
		jdbcpostgreSQL.conn = null;
		jdbcpostgreSQL.stmt = null;
	}

	public static void openConnection() {
		// Building the connection with your credentials
		String teamNumber = "12";
		String sectionNumber = "912";
		String dbName = "csce315" + "_" + sectionNumber + "_" + teamNumber;
		String dbConnectionString = "jdbc:postgresql://csce-315-db.engr.tamu.edu/" +
				dbName;

		// Connecting to the database
		try {
			conn = DriverManager.getConnection(dbConnectionString, dbSetup.user,
					dbSetup.pswd);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}

		System.out.println("Opened database successfully");

		try {
			// create a statement object
			stmt = conn.createStatement();

			// int result = stmt.executeUpdate(sqlStatement);

			// while (result.next()) {
			// System.out.println(result.getString("column_name"));
			// }
			// OR
			// System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
	}

	public static void closeConnection() {
		try {
			conn.close();
			System.out.println("Connection Closed.");
		} catch (Exception e) {
			System.out.println("Connection NOT Closed.");
		}
	}

	// Commands to run this script
	// This will compile all java files in this directory
	// javac *.java
	// This command tells the file where to find the postgres jar which it needs to
	// execute postgres commands, then executes the code
	// Windows: java -cp ".;postgresql-42.2.8.jar" jdbcpostgreSQL
	// Mac/Linux: java -cp ".:postgresql-42.2.8.jar" jdbcpostgreSQL

	// MAKE SURE YOU ARE ON VPN or TAMU WIFI TO ACCESS DATABASE
	/*
	 * public static List<String[]> readFromFile(String filename) throws
	 * FileNotFoundException {
	 * Scanner readFile = new Scanner(new File(filename));
	 * 
	 * List<String[]> allAttributes = new ArrayList<>();
	 * while (readFile.hasNextLine()) {
	 * String line = readFile.nextLine();
	 * allAttributes.add(line.split(","));
	 * }
	 * 
	 * return allAttributes;
	 * }
	 */

}// end Class
