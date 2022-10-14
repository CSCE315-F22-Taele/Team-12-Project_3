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
    private Button trendsBtn;
    @FXML
    private Button inventoryBtn;
    @FXML
    private Label manLabel;

    public void initialize() {
        // idk what to put here lol
    }

    public void trendsClick() throws IOException {
        System.out.println("Manager --> Trends");
        trendsBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("trends.fxml")));
    }
    public void inventoryClick() throws IOException {
        System.out.println("Manager --> Inventory");
        inventoryBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("inventory.fxml")));
    }
    public void menuClick() throws IOException {
        System.out.println("Manager --> Menu");
        inventoryBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
    }
    public void backClick() throws IOException {
        System.out.println("Manager --> Home");
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
    }
}
