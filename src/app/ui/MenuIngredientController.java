package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import app.Main;
import app.model.Ingredient;
import app.model.Order;
import app.model.UserType;
import app.repository.dbExec;
import app.service.Server;
import app.service.Authentication;
import app.service.Menu;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.Priority;
import javafx.util.Pair;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;

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

    public void initialize(){
        allIngredients = new LinkedHashSet<>(); // Just so that it remembers order
        // dbIngredients = dbExec.getAllIngredients();

        ArrayList<String> sortedList = new ArrayList<>(Menu.dbIngredients.keySet());
        Collections.sort(sortedList);
		for (String ingredient: sortedList) {
			ingredientEntry.getItems().add(ingredient);
		}
        refreshList();
    }
    
	public void refreshList() {
        ObservableList<String> list = FXCollections.observableArrayList(allIngredients);
        ListView<String> lv = new ListView<>(list);
        HBox.setHgrow(lv, Priority.ALWAYS);
        lv.setCellFactory(param -> new DelCell());
        viewBox.getChildren().removeAll(viewBox.getChildren());
        viewBox.getChildren().add(lv);
	}

    public void backClick() throws IOException {
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
    }

	public void addClick() throws IOException {
        // String ingred = ingredientEntry.getAccessibleText();
        String ingred = ingredientEntry.getValue();
        System.out.println("Add: " + ingred);
        if(ingred == ""){
            // TODO: Error
        } 
        else{ 
            // Returns True if not in HashSet
            if(allIngredients.add(ingred)){
                ingredientEntry.setValue("");
                refreshList();
            }
        }
	}

    public void submitClick() {
        try{
            Menu.insertItemToMenu(Main.menuItemToAdd, allIngredients, true);

            allIngredients.clear();
            Main.menuItemToAdd = null;
            submitBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
