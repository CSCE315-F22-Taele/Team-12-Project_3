package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class InventoryController {
    @FXML
	private Button backBtn;
    @FXML
    private Button addBtn;
    @FXML
    private Button restockBtn;

    @FXML
    private TextField quantityEntry;
    @FXML
    private TextField restockEntry;

    public void initialize() {
        // idk what to put here lol
    }

    public void backClick() throws IOException {
        System.out.println("Inventory --> Manager");
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
    }
}
