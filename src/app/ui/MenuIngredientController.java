package app.ui;

import java.io.IOException;
import java.util.ArrayList;

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
import app.service.Server;
import app.service.Authentication;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.TitledPane;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.Priority;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;

public class MenuIngredientController {
    private static ArrayList<String> allIngredients = new ArrayList<String>();

    @FXML
    private Button backBtn;
    @FXML
    private TextField ingredientEntry;
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

	public void initialize() {
        ObservableList<String> list = FXCollections.observableArrayList(allIngredients);
        ListView<String> lv = new ListView<>(list);
        HBox.setHgrow(lv, Priority.ALWAYS);
        lv.setCellFactory(param -> new DelCell());
        viewBox.getChildren().removeAll(viewBox.getChildren());
        viewBox.getChildren().add(lv);
	}

    public void backClick() throws IOException {
        // System.out.println("Server --> Home");
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
    }

	public void addClick() throws IOException {
        String ingred = ingredientEntry.getText();
        if(ingred == null){
            // TODO: Error
        } 
        else if(allIngredients.contains(ingred)){
            // TODO: Error
        }
        else{
            ingredientEntry.setText("");
            allIngredients.add(ingred);
            initialize();
        }
	}

    public void submitClick() {
        // TODO: Link this up with the database

        allIngredients.clear();
    }
}
