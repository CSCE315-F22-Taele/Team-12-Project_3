package app.ui;

import java.io.IOException;

import app.Main;
import app.service.Authentication;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.TextField;
import javafx.scene.control.Button;

/**
 * Handle user actions on authentication page
 */
public class AuthenticationController {
    @FXML
	private Button backBtn;
	@FXML
	private TextField userEntry;
	@FXML
	private TextField passwordEntry;
	@FXML
	private Button submitBtn;

	/**
	 * Function not used, included for completeness and uniformity
	 */
	public void initialize() {
	}

	/**
	 * Go back to previous scene
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
	}

	/**
	 * Attempts to log the user in(whether server or manager)
	 */
	public void submitClick() throws IOException {
		String uEntry = userEntry.getText();
		Main.username = uEntry;
		String passEntry = passwordEntry.getText();

		if (Authentication.checkPassword(uEntry, passEntry)) {
			submitBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource(Main.authen)));
		} else {
			passwordEntry.setText("");
			passwordEntry.setPromptText("Wrong Username/Password! Try Again...");
		}
	}
}