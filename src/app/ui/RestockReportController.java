package app.ui;

import java.io.IOException;
import java.util.ArrayList;

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

/**
 * Handles user action on restock report page
 */
public class RestockReportController {
    @FXML
	private Button backBtn;
	@FXML
	private Button refreshBtn;
    @FXML
    private ScrollPane restockPane;

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
	 * Acts as a refresh button
	 * 
	 * @throws IOException
	 */
    public void updateClick() throws IOException {
        try {
            ArrayList<String> allMinInventoryItems = Manager.getRestockReport();
            GridPane salesBox = initializePane();

			if(allMinInventoryItems.size() == 0)
				writeToGUI("None", salesBox);
            for(String key : allMinInventoryItems) {
               writeToGUI(key, salesBox); 
            }


        } catch(Exception e) {
            openErrorWindow("Something wrong within RestockReportController");
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
	 * initializing and setting up display for inventory
	 */
	public GridPane initializePane() {
		GridPane resultPane = new GridPane();

		ColumnConstraints col1 = new ColumnConstraints();
		col1.setPercentWidth(100);
		
		resultPane.getColumnConstraints().addAll(col1);
		resultPane.setMinWidth(500);
		resultPane.setMaxWidth(-1); // Makes it so it uses pref_size?
		restockPane.setContent(resultPane);
		restockPane.setMinWidth(500);
		restockPane.setMaxWidth(-1);

		return resultPane;
	}

	/**
	 * Displaying from List
	 * 
	 * @param ingredientName name of ingredient to display
	 * @resultPane UI container to be populated
	 */
	public void writeToGUI(String ingredientName, GridPane resultPane) {

		Label nameLabel = new Label();
		nameLabel.setText(ingredientName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, resultPane.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		resultPane.getChildren().addAll(nameLabel);
		restockPane.setContent(resultPane);
	}
}
