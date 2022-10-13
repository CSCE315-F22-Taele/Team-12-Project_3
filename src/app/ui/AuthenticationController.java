package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.TextField;
import javafx.scene.control.Button;

public class AuthenticationController {
    @FXML
	private Button backBtn;
	@FXML
	private TextField userEntry;
	@FXML
	private Button submitBtn;


	public void initialize() {
	}

    public void backClick() throws IOException {
        System.out.println("Authentication ---> Start Page");
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
    }

    public void submitClick() throws IOException {
        System.out.println("Authenticating...");
        // managerBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
}