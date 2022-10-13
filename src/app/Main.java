package app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.sql.Statement;
import java.util.List;

import app.db.dbSetup;
import app.db.jdbcpostgreSQL;

import java.sql.Connection;
import java.sql.DriverManager;


public class Main extends Application {

	@Override
	public void start(Stage primaryStage) throws Exception {
		Parent root = FXMLLoader.load(getClass().getResource("ui/index.fxml"));
		primaryStage.setTitle("Hello World");
		primaryStage.setScene(new Scene(root, 400, 300));
		primaryStage.show();
	}

	public static void main(String[] args) {
		launch(args);
		jdbcpostgreSQL db = new jdbcpostgreSQL();
		db.openConnection();
	}
}