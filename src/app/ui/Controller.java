package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.control.Button;

public class Controller {

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
}