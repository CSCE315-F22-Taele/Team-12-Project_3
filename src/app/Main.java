package app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import app.db.jdbcpostgreSQL;
import app.model.Item;
import app.requests.createMultipleOrderRequests;
import app.service.Inventory;
import app.service.Menu;

public class Main extends Application {
	public static boolean wow;
	public static String authen; // Store the result fxml file after authen
	public static String username;
	public static Item menuItemToAdd; // menuItem to link ingredients to

	// Error States
	public static String errorMsg;

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

		Inventory.addIngredients();
		Menu.addIngredients();
		Menu.addItemsToMenu();

		// createMultipleOrderRequests.createMultipleOrders(1000);

		launch(args);
		jdbcpostgreSQL.closeConnection();
	}
}