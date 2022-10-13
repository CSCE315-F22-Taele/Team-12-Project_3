package app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {

	public static String authen; // Store the result fxml file after authen

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
		launch(args);
	}
}