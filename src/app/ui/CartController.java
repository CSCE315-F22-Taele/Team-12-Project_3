package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import app.model.Item;
import app.model.Order;
import app.requests.createOrderRequest;
import app.service.Manager;
import app.service.Server;
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

import javafx.util.Pair;

public class CartController {
	@FXML
	private Button backBtn;
	@FXML
	private Button addBtn;
	@FXML
	private Button deleteBtn;
	@FXML
	private Button submitBtn;
	@FXML
	private ComboBox<String> comboBox;
	@FXML
	private TextField nameEntry;
	@FXML
	private TextField quantityEntry;
	@FXML
	private ScrollPane cartPane;

	private GridPane cartBox;

	public void initialize() {
		comboBox.getItems().removeAll(comboBox.getItems());

		ArrayList<Pair<Item, String>> items = Manager.getMenuItems();
		cartBox = initializePane();
		Server.initializeCart();

		for (Pair<Item, String> item : items) {

			comboBox.getItems().add(item.getValue());
		}
		comboBox.getSelectionModel().select(comboBox.getItems().get(0));
	}

	// event handlers

	// Prevents user from entering non-digit characters
	public void inputListener(KeyEvent e) {
		constrainInput(quantityEntry);
	}

	private void constrainInput(TextField input) {
		if (!input.getText().matches("\\d*")) {
			input.setText(input.getText().replaceAll("[^\\d]", ""));
			input.positionCaret(input.getText().length());
		}
	}

	public void backClick() throws IOException {
		System.out.println("Cart --> Server");
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("server.fxml")));
	}

	public void deleteClick() throws IOException {
		Server.clearCart();
		cartBox.getChildren().removeAll();
	}

	public void submitClick() throws IOException {
		String customerName = nameEntry.getText();
		if(customerName.isEmpty()){
			// ERROR
		} else{
			createOrderRequest req = new createOrderRequest(customerName, Server.getId(), Server.getCart());
			Order customerOrder = Server.createOrder(req);
			// Do some query with Order object
		}
	}

	public void addAmount() {
		int amount = Integer.parseInt(quantityEntry.getText());
		String itemName = comboBox.getSelectionModel().getSelectedItem();
		Server.addToCart(itemName, amount);

		writeToGUI(itemName, amount);
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
		cartBox.setMaxWidth(500);
		cartPane.setContent(cartBox);
		cartPane.setMinWidth(500);
		cartPane.setMaxWidth(500);

		return cartBox;
	}

	// displaying from List
	public void writeToGUI(String itemName, int amount) {

		Label nameLabel = new Label();
		nameLabel.setText(itemName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, 0);
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		Label amountLabel = new Label();
		amountLabel.setText(amount + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, 0);
		GridPane.setHalignment(amountLabel, HPos.RIGHT);

		cartBox.getChildren().addAll(nameLabel, amountLabel);
		cartPane.setContent(cartBox);
	}
}