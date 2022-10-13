package app.ui;

import java.io.IOException;

import app.Main;

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
        String entry = userEntry.getText();
        if(entry.equals("12345")){
            System.out.println("Authentication Successful!");
            submitBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource(Main.authen)));
        }
        else{
            System.out.println("Authentication Failed!");
            userEntry.setText("");
            userEntry.setPromptText("Wrong Password! Try Again...");
        }
    }
}