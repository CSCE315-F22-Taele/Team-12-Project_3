package app.ui;

import app.Main;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import app.db.jdbcpostgreSQL;

public class StartController {
	@FXML
	private Button serverBtn;
	@FXML
	private Button managerBtn;

	public void initialize() {
        Main.authen = "";
	}

	public void serverClick() throws IOException {
        // System.out.println("Server --> Authentication");
        Main.authen = "server.fxml";
        serverBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
    public void managerClick() throws IOException {
        // System.out.println("Manager --> Authentication");
        Main.authen = "manager.fxml";
        managerBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
}