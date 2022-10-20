package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

import app.Main;
import app.model.Item;
import app.repository.dbExec;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import javafx.util.Pair;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;

/**
 * Handles user actions on menu page
 */
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

	/**
	 * Initalize the ui elements
	 * 
	 */
	public void initialize() {
		comboBox.getItems().removeAll(comboBox.getItems());

		ArrayList<Pair<Item, String>> items = Manager.getMenuItems();
		menuBox = initializePane();

		for (Pair<Item, String> item : items) {
			writeToGUI(item.getKey().getName(), item.getKey().getTotalPrice());
			comboBox.getItems().add(item.getKey().getName());
		}
	}

	public void inputListener(KeyEvent e) {
		CartController.constrainInput(priceEntry);
		CartController.constrainInput(updatedPriceEntry);
	}

	/**
	 * Opens an error window
	 * 
	 * @param errorMsg message to put in error window
	 */
	public void openErrorWindow(String errorMsg) throws IOException {
		Main.errorMsg = errorMsg;
		Parent root = FXMLLoader.load(getClass().getResource("error.fxml"));
		Stage stage = new Stage();
		stage.setTitle("Error!");
		stage.setScene(new Scene(root, 600, 380));
		stage.show(); // Once user closes that, it will go back to this scene
	}

	/**
	 * Go back to previous page
	 * 
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("Manager.fxml")));
	}

	/**
	 * Deletes a given item if selected from dropBox, menuItem will be deleted
	 * 
	 */
	public void deleteClick() throws IOException {
		String itemName = comboBox.getSelectionModel().getSelectedItem();
		if (itemName.isEmpty()) {
			// ERROR
		} else {
			dbExec.removeItemFromMenu(itemName);
		}

		this.initialize();
	}

	/**
	 * If hit, will update the price from a menu item
	 * 
	 */
	public void updatePriceClick() throws IOException {
		String amount = updatedPriceEntry.getText();
		String itemName = comboBox.getSelectionModel().getSelectedItem();
		if (itemName == null || amount == null) {
			// ERROR
		} else {
			Double amt = Double.parseDouble(amount);

			Item pastItem = dbExec.getMenuByItem(itemName);
			UUID orderId = UUID.randomUUID();

			Item item = new Item(pastItem.getItemId(), pastItem.getName(), orderId, 1, amt);

			dbExec.updateItemToMenu(item);

			updatedPriceEntry.setText("");
		}

		this.initialize();
	}

	/**
	 * Add item to the menu list
	 * 
	 */
	public void addItemToMenu() throws IOException {
		String price = priceEntry.getText();
		String itemName = nameEntry.getText();
		try {
			if (itemName == null || price == null) {
				throw new Exception("empty");
			} else {
				Double prc = Double.parseDouble(price);

				UUID itemId = UUID.randomUUID();
				UUID orderId = null; // Change made 10/17 ~ Dien
				Item item = new Item(itemId, itemName, orderId, 1, prc);

				Main.menuItemToAdd = item;
				priceEntry.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu_ingredients.fxml")));
			}
		} catch (Exception e) {
			if (e.getMessage().equals("empty")) {
				openErrorWindow("Enter valid item name/price!!!");
			} else {
				openErrorWindow("Invalid amount to se threshold!!!");
			}
		}

	}

	/**
	 * Initializing and setting up display for cart
	 * 
	 * @return initialized UI container
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
		menuPane.setContent(cartBox);
		menuPane.setMinWidth(500);
		menuPane.setMaxWidth(-1);

		return cartBox;
	}

	/**
	 * Displaying from list
	 * 
	 * @param itemName name of menu item
	 * @param price item's price
	 */
	public void writeToGUI(String itemName, double price) {

		Label nameLabel = new Label();
		nameLabel.setText(itemName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, menuBox.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		Label amountLabel = new Label();
		amountLabel.setText(price + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, menuBox.getChildren().size());
		GridPane.setHalignment(amountLabel, HPos.RIGHT);

		menuBox.getChildren().addAll(nameLabel, amountLabel);
		menuPane.setContent(menuBox);
	}
}
