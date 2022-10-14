package app.ui;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.UUID;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import app.Main;
import app.db.jdbcpostgreSQL;
import app.model.Item;
import app.model.Order;
import app.model.UserType;
import app.repository.dbExec;
import app.repository.queries;
import app.service.Server;
import app.service.Authentication;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.control.TitledPane;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.util.Pair;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextField;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;

public class MenuController {
	@FXML
	private Button backBtn;
	@FXML
	private Button addBtn;
	@FXML
	private Button deleteBtn;
	@FXML
	private Button updateBtn;
	@FXML
	private ComboBox<String> comboBox;
	@FXML
	private TextField nameEntry;
	@FXML
	private TextField priceEntry;
	@FXML
	private TextField updatedPriceEntry;
	@FXML
	private ScrollPane menuPane;

	private GridPane menuBox;

	public void initialize() {
		comboBox.getItems().removeAll(comboBox.getItems());

		ArrayList<Pair<Item, String>> items = Manager.getMenuItems();
		menuBox = initializePane();

		for (Pair<Item, String> item : items) {
			writeToGUI(item.getValue(), item.getKey().getTotalPrice());
			comboBox.getItems().add(item.getValue());
		}
		// comboBox.getSelectionModel().select(comboBox.getItems().get(0));
	}

	// event handlers

	// Prevents user from entering non-digit characters
	// HOWEVER, with double would want to input .
	// public void inputListener(KeyEvent e) {
	// 	constrainInput(priceEntry);
	// }

	// private void constrainInput(TextField input) {
	// 	if (!input.getText().matches("\\d*")) {
	// 		input.setText(input.getText().replaceAll("[^\\d]", ""));
	// 		input.positionCaret(input.getText().length());
	// 	}
	// }

	public void backClick() throws IOException {
		System.out.println("Manager --> Server");
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("Manager.fxml")));
	}

	public void deleteClick() throws IOException {
		String itemName = comboBox.getSelectionModel().getSelectedItem();
		if(itemName.isEmpty()){
			// ERROR
		} else {
			dbExec.removeItemFromMenu(itemName);
		}

		this.initialize();
	}

	public void updatePriceClick() throws IOException {
		String amount = priceEntry.getText();
		String itemName = comboBox.getSelectionModel().getSelectedItem();
		if(itemName.isEmpty() || amount.isEmpty()){
			// ERROR
		} else {
			try {
				Double amt = Double.parseDouble(amount);
	
				ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getMenuByItem(itemName));
	
				UUID itemId = UUID.fromString(result.getString("item_id"));
				UUID orderId = UUID.randomUUID();
				
				Item item = new Item(itemId, itemName, orderId, 0, amt);

				dbExec.updateItemToMenu(item);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		this.initialize();
	}

	public void addItem() {
		String amount = priceEntry.getText();
		String itemName = nameEntry.getText();
		if(itemName.isEmpty() || amount.isEmpty()){
			// ERROR
		} else {
			Double amt = Double.parseDouble(amount);

			UUID itemId = UUID.randomUUID();
			UUID orderId = UUID.randomUUID();
			Item item = new Item(itemId, itemName, orderId, 1, amt);

			dbExec.addItemToMenu(item);
		}

		this.initialize();
	}

	// initializing and setting up display for cart
	public GridPane initializePane() {
		GridPane cartBox = new GridPane();

		ColumnConstraints col1 = new ColumnConstraints();
		col1.setPercentWidth(40);
		ColumnConstraints col2 = new ColumnConstraints();
		col2.setPercentWidth(40);
		cartBox.getColumnConstraints().addAll(col1, col2);
		cartBox.setMinWidth(500);
		cartBox.setMaxWidth(-1);
		menuPane.setContent(cartBox);
		menuPane.setMinWidth(500);
		menuPane.setMaxWidth(-1);

		return cartBox;
	}

	// displaying from List
	public void writeToGUI(String itemName, double amount) {

		Label nameLabel = new Label();
		nameLabel.setText(itemName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, menuBox.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		Label amountLabel = new Label();
		amountLabel.setText(amount + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, menuBox.getChildren().size());
		GridPane.setHalignment(amountLabel, HPos.RIGHT);

		menuBox.getChildren().addAll(nameLabel, amountLabel);
		menuPane.setContent(menuBox);
	}
}