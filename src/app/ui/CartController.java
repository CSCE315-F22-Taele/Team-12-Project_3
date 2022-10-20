package app.ui;

import java.io.IOException;
import java.util.ArrayList;

import app.Main;
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
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;

import javafx.util.Pair;

/**
 * Handles user actions on cart page (when creating a new order)
 */
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

	/**
	 * Initialize the UI elements before entering the page
	 */
	public void initialize() {
		comboBox.getItems().removeAll(comboBox.getItems());

		ArrayList<Pair<Item, String>> items = Manager.getMenuItems();
		cartBox = initializePane();
		Server.initializeCart();

		for (Pair<Item, String> item : items) {

			comboBox.getItems().add((item.getKey()).getName());
		}
	}

	/**
	 * Listen in on certain input fields
	 * 
	 * @param e
	 */
	public void inputListener(KeyEvent e) {
		constrainInput(quantityEntry);
	}

	/**
	 * Prevents non-alpha characters from being input
	 * 
	 * @param input TextField to constrain
	 */
	public static void constrainInput(TextField input) {
		if (!input.getText().matches("\\d*")) {
			input.setText(input.getText().replaceAll("[^\\d]", ""));
			input.positionCaret(input.getText().length());
		}
	}

	/**
	 * Goes back to previous page
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("server.fxml")));
	}

	/**
	 * Removes all from the cart
	 */
	public void deleteClick() throws IOException {
		Server.clearCart();
		cartBox.getChildren().removeAll(cartBox.getChildren());
	}

	/**
	 * Does a database query after hitting submit to add order to database
	 */
	public void submitClick() throws IOException {
		String customerName = nameEntry.getText();
		if (customerName.isEmpty()) {
			// ERROR
		} else {
			createOrderRequest req = new createOrderRequest(customerName, Main.username, Server.getCart());
			Order customerOrder = Server.createOrder(req, false);
			// Do some query with Order object
			deleteClick();
			submitBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("server.fxml")));
		}
	}

	/**
	 * Adds the associated item name and amount to the cart for server to order
	 */
	public void addAmount() {
		int amount = Integer.parseInt(quantityEntry.getText());
		String itemName = comboBox.getSelectionModel().getSelectedItem();
		Server.addToCart(itemName, amount);

		writeToGUI(itemName, amount);
	}

	/**
	 * Initializing and setting up display for the cart
	 * 
	 * @return GridPane
	 */
	public GridPane initializePane() {
		GridPane cartBox = new GridPane();

		ColumnConstraints col1 = new ColumnConstraints();
		col1.setPercentWidth(40);
		ColumnConstraints col2 = new ColumnConstraints();
		col2.setPercentWidth(40);
		cartBox.getColumnConstraints().addAll(col1, col2);
		cartBox.setMinWidth(500);
		cartBox.setMaxWidth(-1);
		cartPane.setContent(cartBox);
		cartPane.setMinWidth(500);
		cartPane.setMaxWidth(-1);

		return cartBox;
	}

	/**
	 * Displaying the contents of the cart from List
	 * 
	 * @param itemName name of added item
	 * @param amount amount of item that was added
	 */
	public void writeToGUI(String itemName, int amount) {
		Label nameLabel = new Label();
		nameLabel.setText(itemName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, cartBox.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		Label amountLabel = new Label();
		amountLabel.setText(amount + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, cartBox.getChildren().size());
		GridPane.setHalignment(amountLabel, HPos.RIGHT);

		cartBox.getChildren().addAll(nameLabel, amountLabel);
		cartPane.setContent(cartBox);
	}
}