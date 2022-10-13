package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.control.ComboBox;

public class InventoryController {
    @FXML
	private Button backBtn;
    @FXML
    private Button addBtn;
    @FXML
    private Button restockBtn;

    @FXML
    private ComboBox<String> comboBox;

    @FXML
    private TextField quantityEntry;
    @FXML
    private TextField restockEntry;

    public void initialize() {
        comboBox.getItems().removeAll(comboBox.getItems());
        comboBox.getItems().addAll("Option A", "Option B", "Option C", "Option D", "Option E", "Option F", "Option H", "Option I");
        comboBox.getSelectionModel().select("Option B");
    }

    public void backClick() throws IOException {
        System.out.println("Inventory --> Manager");
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
    }
}
