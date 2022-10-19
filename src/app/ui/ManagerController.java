package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.control.Button;

/**
 * Handles user actions on manager page
 */
public class ManagerController {
    @FXML
	private Button backBtn;
    @FXML
    private Button reportsBtn;
    @FXML
    private Button inventoryBtn;
    @FXML
    private Button menuBtn;
    @FXML
    private Label manLabel;

    /**
     * Function not used, included for completeness and uniformity
     */
    public void initialize() {
    }

	/** 
	 * Load trends page
	 */
    public void trendsClick() throws IOException {
        reportsBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("reports.fxml")));
    }

	/**
	 * Load inventory page
	 */
    public void inventoryClick() throws IOException {
        inventoryBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("inventory.fxml")));
    }
	
	/**
	 * Load menu page
	 */
    public void menuClick() throws IOException {
        inventoryBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("menu.fxml")));
    }

	/**
	 * Load previous page (start)
	 */
    public void backClick() throws IOException {
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
    }
}
