package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.control.Button;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class MainController {

	@FXML
	private Label label;
	@FXML
	private Button btn;

	public void initialize() {

	}

	public void handleEvent() throws IOException {
		System.out.println("Handling event");
		
		btn.setText("yo");
		label.setText("do it again!");
		btn.getScene().setRoot(FXMLLoader.load(getClass().getResource("temp.fxml")));
	}

	public void handleEvent2() throws IOException {
		Parent root = FXMLLoader.load(getClass().getResource("server.fxml"));
		Stage stage = new Stage();
		stage.setScene(new Scene(root));
		stage.show();
	}
}