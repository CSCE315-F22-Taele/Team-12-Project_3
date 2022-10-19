package app.ui;

import app.Main;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import app.db.jdbcpostgreSQL;

/**
 * Initial page to load
 */
public class StartController {
	@FXML
	private Button serverBtn;
	@FXML
	private Button managerBtn;

    /**
     * Initializes Main.authen to null upon start and later assigned
     * server or manager fxml files
     */
	public void initialize() {
        Main.authen = "";
	}

    /**
     * If the server button is clicked, it changes Main.authen to server.fxml to indicate
     * the change to the server's side
     * @throws IOException
     */
	public void serverClick() throws IOException {
        Main.authen = "server.fxml";
        serverBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
    /**
     * If the manager button is clicked, it changes Main.authen to manager.fxml to indicate
     * the change to the manager's side
     * @throws IOException
     */
    public void managerClick() throws IOException {
        Main.authen = "manager.fxml";
        managerBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("authentication.fxml")));
    }
}