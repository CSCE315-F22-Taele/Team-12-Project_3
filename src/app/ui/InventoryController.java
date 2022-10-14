package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import app.model.Ingredient;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontPosture;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;

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
	@FXML
	private ScrollPane inventoryPane;

	public void initialize() {
		comboBox.getItems().removeAll(comboBox.getItems());
		/*
		 * comboBox.getItems().addAll("Option A", "Option B", "Option C", "Option D",
		 * "Option E", "Option F", "Option H",
		 * "Option I");
		 */

		ArrayList<Ingredient> inventory = Manager.getAllInventory();
		GridPane inventoryBox = initializePane();

		for (Ingredient ingredient : inventory) {
			writeToGUI(ingredient.getName(), ingredient.getAmount(), inventoryBox);

			comboBox.getItems().add(ingredient.getName());
		}
		comboBox.getSelectionModel().select(comboBox.getItems().get(0));
	}

	// event handlers

	// Prevents user from entering non-digit characters
	public void inputListener(KeyEvent e) {
		constrainInput(quantityEntry);
		constrainInput(restockEntry);
	}

	private void constrainInput(TextField input) {
		if (!input.getText().matches("\\d*")) {
			input.setText(input.getText().replaceAll("[^\\d]", ""));
			input.positionCaret(input.getText().length());
		}
	}

	public void backClick() throws IOException {
		System.out.println("Inventory --> Manager");
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
	}

	public void addAmount() {
		int amount = Integer.parseInt(quantityEntry.getText());
		String name = comboBox.getSelectionModel().getSelectedItem();
		Manager.restockIngredient(amount, name);

		this.initialize();
	}

	public void restockAll() {
		int amount = Integer.parseInt(restockEntry.getText());
		Manager.restockAll(amount);

		this.initialize();
	}

	// initializing and setting up display for inventory
	public GridPane initializePane() {
		GridPane resultPane = new GridPane();

		ColumnConstraints col1 = new ColumnConstraints();
		col1.setPercentWidth(40);
		ColumnConstraints col2 = new ColumnConstraints();
		col2.setPercentWidth(40);
		resultPane.getColumnConstraints().addAll(col1, col2);
		resultPane.setMinWidth(500);
		resultPane.setMaxWidth(500);
		inventoryPane.setContent(resultPane);
		inventoryPane.setMinWidth(500);
		inventoryPane.setMaxWidth(500);

		return resultPane;
	}

	// displaying from List
	public void writeToGUI(String ingredientName, int amount, GridPane resultPane) {

		Label nameLabel = new Label();
		nameLabel.setText(ingredientName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, 0);
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		Label amountLabel = new Label();
		amountLabel.setText(amount + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, 0);
		GridPane.setHalignment(amountLabel, HPos.RIGHT);

		resultPane.getChildren().addAll(nameLabel, amountLabel);
		inventoryPane.setContent(resultPane);
	}
}
