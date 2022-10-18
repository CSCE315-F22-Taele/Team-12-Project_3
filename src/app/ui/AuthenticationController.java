package app.ui;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import app.Main;
import app.db.jdbcpostgreSQL;
import app.service.Authentication;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import javafx.scene.control.Button;

public class AuthenticationController {
    @FXML
	private Button backBtn;
	@FXML
	private TextField userEntry;
	@FXML
	private TextField passwordEntry;
	@FXML
	private Button submitBtn;


	public void initialize() {
	}

    public void backClick() throws IOException {
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
    }
    
    public void submitClick() throws IOException, InterruptedException {
        String uEntry = userEntry.getText();
        Main.username = uEntry;
        String passEntry = passwordEntry.getText();

		if(Authentication.checkPassword(uEntry, passEntry)) {
            submitBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource(Main.authen)));
        }
        else {
            passwordEntry.setText("");
            userEntry.setText("");
            passwordEntry.setPromptText("Wrong Username/Password! Try Again...");
            // TimeUnit.SECONDS.sleep(3);
            // Thread.sleep(2500);
            // passwordEntry.setPromptText("Enter Password:");
        }
    }
}