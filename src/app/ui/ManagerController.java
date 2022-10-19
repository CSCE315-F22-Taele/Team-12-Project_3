package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.control.Button;

public class ManagerController {
    @FXML
	private Button backBtn;
    @FXML
    private Button reportsBtn;
    @FXML
    private Button inventoryBtn;
    @FXML
    private Button menuBtn;
    @FXML
    private Label manLabel;

    public void initialize() {
        // idk what to put here lol
    }

    public void trendsClick() throws IOException {
        reportsBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("reports.fxml")));
    }
    public void inventoryClick() throws IOException {
        inventoryBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("inventory.fxml")));
    }
    public void menuClick() throws IOException {
        inventoryBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
    }
    public void backClick() throws IOException {
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
    }
}
