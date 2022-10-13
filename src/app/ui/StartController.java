package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;

public class StartController {
	@FXML
	private Button serverBtn;
	@FXML
	private Button managerBtn;


	public void initialize() {
	}

	public void serverClick() throws IOException {
        System.out.println("Server --> Authentication");
        serverBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
    public void managerClick() throws IOException {
        System.out.println("Manager --> Authentication");
        managerBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
}