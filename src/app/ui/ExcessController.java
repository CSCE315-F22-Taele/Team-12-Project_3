package app.ui;


import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


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
import javafx.scene.control.DatePicker;

import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import java.time.LocalDate;
import java.time.Period;
import java.util.Map;
import java.util.spi.LocaleServiceProvider;
import java.util.HashMap;
import java.util.HashSet;


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

    public void openErrorWindow(String errorMsg) throws IOException {
		Main.errorMsg = errorMsg;
		Parent root = FXMLLoader.load(getClass().getResource("error.fxml"));
		Stage stage = new Stage();
		stage.setTitle("Error!");
		stage.setScene(new Scene(root, 600, 380));
		stage.show(); // Once user closes that, it will go back to this scene
	}

    public void updateClick() throws IOException {
        try {
            Timestamp start = Timestamp.valueOf(startDate.getValue().atStartOfDay());
            LocalDate now = LocalDate.now().plusDays(1);
            Timestamp end = Timestamp.valueOf(now.atStartOfDay());
            

            HashSet<String> itemFrequencies = Manager.getExcessReport(start, end);
            System.out.println("Size of itemFrequencies salesController: " + itemFrequencies.size());
            GridPane salesBox = initializePane();

            for(String key : itemFrequencies) {
               writeToGUI(key, salesBox); 
            }


        } catch(Exception e) {
            System.out.println(e.getMessage());
            if(e.getMessage().equals("Dates")) {
                openErrorWindow("End Date should come after Start Date");
            }
            else {
                openErrorWindow("Something wrong within TrendsController");
            }
        }
    }

    public void backClick() throws IOException {
		// System.out.println("Inventory --> Manager");
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
	}

    // initializing and setting up display for inventory
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

	// displaying from List
	public void writeToGUI(String ingredientName, GridPane resultPane) {

		Label nameLabel = new Label();
		nameLabel.setText(ingredientName);
		nameLabel.setPadding(new Insets(0, 0, 10, 0));
		GridPane.setConstraints(nameLabel, 0, resultPane.getChildren().size());
		GridPane.setHalignment(nameLabel, HPos.CENTER);

		// Label amountLabel = new Label();
		// amountLabel.setText(amount + "");
		// amountLabel.setPadding(new Insets(0, 0, 10, 0));
		// GridPane.setConstraints(amountLabel, 1, resultPane.getChildren().size());
		// GridPane.setHalignment(amountLabel, HPos.RIGHT);

		resultPane.getChildren().addAll(nameLabel);
		salesPane.setContent(resultPane);
	}
}
