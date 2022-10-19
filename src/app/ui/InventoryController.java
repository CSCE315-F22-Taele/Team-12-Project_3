package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// import org.omg.IOP.ExceptionDetailMessage;

import app.Main;
import app.model.Ingredient;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontPosture;
import javafx.stage.Stage;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;

public class InventoryController {
	@FXML
	private Button backBtn;
	@FXML
	private Button addBtn;
	@FXML
	private Button minBtn;
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

	/**
	 * Initialize the dropdown menu and the gridPane so that it holds some of the
	 * items in inventory upon load
	 * 
	 * @return void
	 */
	public void initialize() {
		comboBox.getItems().removeAll(comboBox.getItems());
		ArrayList<Ingredient> inventory = Manager.getAllInventory();
		Collections.sort(inventory);
		GridPane inventoryBox = initializePane();

		for (Ingredient ingredient : inventory) {
			writeToGUI(ingredient.getName(), ingredient.getAmount(), ingredient.getThreshold(), inventoryBox); // Min for ingredients is 100

			comboBox.getItems().add(ingredient.getName());
		}
		// comboBox.getSelectionModel().select(comboBox.getItems().get(0));
	}

	// event handlers

	//
	/**
	 * Prevents user from entering non-digit characters
	 * 
	 * @param e
	 * @return void
	 */
	public void inputListener(KeyEvent e) {
		constrainInput(quantityEntry);
		constrainInput(restockEntry);
	}

	/**
	 * Prevent non-alpha characters
	 * 
	 * @param input
	 * @return void
	 */
	private void constrainInput(TextField input) {
		if (!input.getText().matches("\\d*")) {
			input.setText(input.getText().replaceAll("[^\\d]", ""));
			input.positionCaret(input.getText().length());
		}
	}

	/**
	 * Opens error window
	 * 
	 * @param errorMsg
	 * @return void
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
	 * Goes back to the manager page
	 * 
	 * @return void
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
	}

	/**
	 * Add amount to whatever inventory item
	 * 
	 * @return void
	 */
	public void addAmount() throws IOException {
		try{
			int amount = Integer.parseInt(quantityEntry.getText());
			String name = comboBox.getSelectionModel().getSelectedItem();
			if(name == null){
				throw new Exception("name");
			}
			Manager.restockIngredient(amount, name);
			quantityEntry.setText("");
	
			this.initialize();
		} catch(Exception e){
			if(e.getMessage().equals("name")){
				openErrorWindow("Invalid name to add!!!");
			} else{
				openErrorWindow("Invalid amount to add!!!");
			}
		}
	}

	/**
	 * Change the threshold for a given inventory item
	 * 
	 * @return void
	 */
	public void setMin() throws IOException {
		try{
			int threshold = Integer.parseInt(quantityEntry.getText());
			String name = comboBox.getSelectionModel().getSelectedItem();
			if(name == null){
				throw new Exception("name");
			}
			Manager.changeIngredientThreshold(threshold, name);
			quantityEntry.setText("");
	
			this.initialize();
		} catch(Exception e){
			if(e.getMessage().equals("name")){
				openErrorWindow("Invalid name to set threshold!!!");
			} else{
				openErrorWindow("Invalid amount to set threshold!!!");
			}
		}
	}

	/**
	 * Restock all the inventory items given what the user input
	 * 
	 * @return void
	 */
	public void restockAll() throws IOException {
		try{
			int amount = Integer.parseInt(restockEntry.getText());
			Manager.restockAll(amount);

			restockEntry.setText("");
			this.initialize();
		}
		catch(Exception e){
			openErrorWindow("Invalid amount to restock all!!!");
		}
	}

	/**
	 * Initializing and setting up display for inventory
	 * 
	 * @param GridPane
	 * @return void
	 */
	public GridPane initializePane() {
		GridPane resultPane = new GridPane();

		ColumnConstraints col1 = new ColumnConstraints();
		col1.setPercentWidth(40);
		ColumnConstraints col2 = new ColumnConstraints();
		col2.setPercentWidth(40);
		resultPane.getColumnConstraints().addAll(col1, col2);
		resultPane.setMinWidth(500);
		resultPane.setMaxWidth(-1); // Makes it so it uses pref_size?
		inventoryPane.setContent(resultPane);
		inventoryPane.setMinWidth(500);
		inventoryPane.setMaxWidth(-1);

		return resultPane;
	}

	/**
	 * displaying from List
	 * 
	 * @param ingredientName
	 * @param amount
	 * @param min
	 * @param resultPane
	 * @return void
	 */
	public void writeToGUI(String ingredientName, int amount, int min, GridPane resultPane) {

		Label nameLabel = new Label();
		nameLabel.setText(ingredientName);
		nameLabel.setPadding(new Insets(0, 0, 10, 10));
		GridPane.setConstraints(nameLabel, 0, resultPane.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.LEFT);

		Label amountLabel = new Label();
		amountLabel.setText(amount + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, resultPane.getChildren().size());
		GridPane.setHalignment(amountLabel, HPos.CENTER);

		Label minLabel = new Label();
		minLabel.setText(min + "");
		minLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(minLabel, 2, resultPane.getChildren().size());
		GridPane.setHalignment(minLabel, HPos.RIGHT);

		resultPane.getChildren().addAll(nameLabel, amountLabel, minLabel);
		inventoryPane.setContent(resultPane);
	}
}
