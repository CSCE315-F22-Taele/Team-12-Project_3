package app.ui;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


import app.Main;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.DatePicker;

import java.time.Period;
import java.util.HashMap;

/**
 * Handles user action on the sales report page
 */
public class SalesController {
    @FXML
	private Button backBtn;
    @FXML
	private Button updateBtn;
    @FXML
    private DatePicker startDate;
    @FXML
    private DatePicker endDate;
    @FXML
    private ScrollPane salesPane;

	/**
	 * Error message to display is something within this file goes wrong
	 *
	 * @param errorMsg
	 * @throws IOException
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
	 * Updates the pane below with new info after the dates have been updated 
	 */
    public void updateClick() throws IOException {
        try {
            Timestamp start = Timestamp.valueOf(startDate.getValue().atStartOfDay());
            Timestamp end = Timestamp.valueOf(endDate.getValue().atStartOfDay());
            Period period = Period.between(startDate.getValue(), endDate.getValue());

            //print error message screen
            if(period.isNegative()) {
                throw new Exception("Dates");
            }

            HashMap<String, Integer> itemFrequencies = Manager.getSalesReport(start, end);
            GridPane salesBox = initializePane();

            for(String key : itemFrequencies.keySet()) {
               writeToGUI(key, itemFrequencies.get(key), salesBox); 
            }


        } catch(Exception e) {
            if(e.getMessage().equals("Dates")) {
                openErrorWindow("End Date should come after Start Date");
            }
            else {
                openErrorWindow("Something wrong within TrendsController");
            }
        }
    }

	/**
	 * Goes back to the manager page if back button is clicked
	 *
	 * @throws IOException
	 */
    public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
	}

    /**
	 * Initializing and setting up display for inventory
	 * @return initialized UI container
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
		salesPane.setContent(resultPane);
		salesPane.setMinWidth(500);
		salesPane.setMaxWidth(-1);

		return resultPane;
	}

	/**
	 * Displaying from List
	 * @param ingredientName name of ingredient to display
	 * @param amount amount of ingredient sold in timeframe
	 * @param resultPane UI container to populate
	 */
	public void writeToGUI(String ingredientName, int amount, GridPane resultPane) {

		Label nameLabel = new Label();
		nameLabel.setText(ingredientName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, resultPane.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		Label amountLabel = new Label();
		amountLabel.setText(amount + "");
		amountLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(amountLabel, 1, resultPane.getChildren().size());
		GridPane.setHalignment(amountLabel, HPos.RIGHT);

		resultPane.getChildren().addAll(nameLabel, amountLabel);
		salesPane.setContent(resultPane);
	}

}
