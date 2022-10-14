package app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.sql.Statement;
import java.util.List;
import java.util.UUID;

import app.db.dbSetup;
import app.db.jdbcpostgreSQL;
import app.service.Inventory;
import app.service.Menu;

import java.sql.Connection;
import java.sql.DriverManager;

public class Main extends Application {
	public static boolean wow;
/* 	public static UUID defaultId=UUID.fromString("00000000-0000-0000-0000-000000000000");
 */	public static String authen; // Store the result fxml file after authen

	@Override
	public void start(Stage primaryStage) throws Exception {
		// Parent root = FXMLLoader.load(getClass().getResource("index.fxml"));
		// primaryStage.setTitle("Hello World");
		// primaryStage.setScene(new Scene(root, 400, 300));
		// primaryStage.show();

		Parent root = FXMLLoader.load(getClass().getResource("ui/starting_page.fxml"));
		primaryStage.setScene(new Scene(root, 600, 380));
		primaryStage.show();
	}

	public static void main(String[] args) {
		jdbcpostgreSQL db = new jdbcpostgreSQL();
		jdbcpostgreSQL.openConnection();

		Menu.addItemsToMenu();
		Inventory.addIngredients();
		launch(args);
		jdbcpostgreSQL.closeConnection();
	}
}