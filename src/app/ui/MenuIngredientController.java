package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import app.Main;
import app.service.Menu;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.Priority;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;

/**
 * Handles user action on menu ingredient page (adding a new item to the menu
 * and linking ingredients)
 */
public class MenuIngredientController {
	// This set is used to preserve ordering
	private static LinkedHashSet<String> allIngredients;
	// private HashMap<String, Ingredient> dbIngredients;

	@FXML
	private Button backBtn;
	@FXML
	private ComboBox<String> ingredientEntry;
	@FXML
	private Button addBtn;
	@FXML
	private Button submitBtn;

	@FXML
	private HBox viewBox;

	/**
	 * Class extends from ListCell, which is originally used in ListView.
	 * This is done to generate X buttons and have it link to deleting a given row
	 * properly
	 */
	static class DelCell extends ListCell<String> {
		HBox hbox = new HBox();
		Label label = new Label("");
		Pane pane = new Pane();
		Button button = new Button("X");

		public DelCell() {
			super();
			hbox.getChildren().addAll(label, pane, button);
			HBox.setHgrow(pane, Priority.ALWAYS);
			button.setOnAction(event -> {
				String ingredName = getItem();
				allIngredients.remove(ingredName);
				getListView().getItems().remove(ingredName);
			});
		}

		/**
		 * Set the button and the row properly
		 * 
		 */
		@Override
		protected void updateItem(String item, boolean empty) {
			super.updateItem(item, empty);
			setText(null);
			setGraphic(null);

			if (item != null && !empty) {
				label.setText(item);
				setGraphic(hbox);
			}
		}
	}

	/**
	 * Make the lists and display all ordered for the rows
	 * 
	 */
	public void initialize() {
		allIngredients = new LinkedHashSet<>(); // Just so that it remembers order
		// dbIngredients = dbExec.getAllIngredients();

		ArrayList<String> sortedList = new ArrayList<>(Menu.dbIngredients.keySet());
		Collections.sort(sortedList);
		for (String ingredient : sortedList) {
			ingredientEntry.getItems().add(ingredient);
		}
		refreshList();
	}

	/**
	 * Refresh the list whenever something is added or whenever something is deleted
	 * 
	 */
	public void refreshList() {
		ObservableList<String> list = FXCollections.observableArrayList(allIngredients);
		ListView<String> lv = new ListView<>(list);
		HBox.setHgrow(lv, Priority.ALWAYS);
		lv.setCellFactory(param -> new DelCell());
		viewBox.getChildren().removeAll(viewBox.getChildren());
		viewBox.getChildren().add(lv);
	}

	/**
	 * Goes back to the menu display whenever hit
	 * 
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
	}

	/**
	 * Adds the ingredient and link them to some given item
	 * 
	 */
	public void addClick() throws IOException {
		String ingred = ingredientEntry.getValue();
		if (ingred == null || ingred.equals("") || ingred == "") {
			// TODO: Error
		} else {
			// Returns True if not in HashSet
			// System.out.println("ingred:" + ingred);
			if (allIngredients.add(ingred)) {
				ingredientEntry.setValue("");
				refreshList();
			}
		}
	}

	/**
	 * finalizes the linking of ingredient items to a given menu item to add
	 * 
	 */
	public void submitClick() {
		try {
			Menu.insertItemToMenu(Main.menuItemToAdd, allIngredients, true);

			allIngredients.clear();
			Main.menuItemToAdd = null;
			submitBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
