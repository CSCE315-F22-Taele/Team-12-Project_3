package app.ui;


import java.io.IOException;
import java.sql.Timestamp;
import java.text.Format;
import java.text.SimpleDateFormat;

import app.Main;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.DatePicker;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;

/** 
 * Handles user actions on excess reports page
 */
public class ExcessController {
    @FXML
	private Button backBtn;
    @FXML
	private Button updateBtn;
    @FXML
    private DatePicker startDate;
    @FXML
    private TextField endDate;
    @FXML
    private ScrollPane salesPane;

	/**
	 * Set end date field to be current day
	 */
	public void initialize() {
		Format f = new SimpleDateFormat("MM/dd/YYYY");
		String strDate = f.format(new Date());
		endDate.setEditable(false);
		endDate.setText(strDate);
	}

	/**
	 * Opens an error window with corresponding message given an error
	 *
	 * @param errorMsg error message to display in error window
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
	 * Upon user click change the timestamps for the beginning and ending
	 */
	public void updateClick() throws IOException {
		try {
			Timestamp start = Timestamp.valueOf(startDate.getValue().atStartOfDay());
			LocalDate now = LocalDate.now().plusDays(1);
			Timestamp end = Timestamp.valueOf(now.atStartOfDay());

			HashSet<String> itemFrequencies = Manager.getExcessReport(start, end);
			GridPane salesBox = initializePane();

            for(String key : itemFrequencies) {
               writeToGUI(key, salesBox); 
            }


        } catch(Exception e) {
            openErrorWindow("Something wrong within ExcessController");
            
        }
    }

	/**
	 * Upon click goes back to the manager ui page
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
	}

	/**
	 * Initializing and setting up display for inventory
	 * 
	 * @return initialized UI container
	 */
	public GridPane initializePane() {
		GridPane resultPane = new GridPane();

		ColumnConstraints col1 = new ColumnConstraints();
		col1.setPercentWidth(100);
		resultPane.getColumnConstraints().addAll(col1);
		resultPane.setMinWidth(500);
		resultPane.setMaxWidth(-1);
		salesPane.setContent(resultPane);
		salesPane.setMinWidth(500);
		salesPane.setMaxWidth(-1);

		return resultPane;
	}

	/**
	 * Displaying from List
	 *
	 * @param ingredientName name of ingredient to add to UI
	 * @param resultPane UI container to be populated
	 */
	public void writeToGUI(String ingredientName, GridPane resultPane) {

		Label nameLabel = new Label();
		nameLabel.setText(ingredientName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, resultPane.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		resultPane.getChildren().addAll(nameLabel);
		salesPane.setContent(resultPane);
	}
}
