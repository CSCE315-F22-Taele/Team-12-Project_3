package app.ui;

import java.io.IOException;

import app.Main;
import javafx.fxml.FXML;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;
import javafx.scene.control.Button;

/**
 * Handles error popup and associated user actions
 */
public class ErrorController {
    @FXML
	private Button backBtn;
    @FXML
	private TextArea errorMsg;

    /**
	 * Sets the error message using metadata from Main
	 */
    public void initialize() {
        errorMsg.setText(Main.errorMsg);
    }

    /**
	 * Closes the window that opens up instead of actually going back
	 */
    public void backClick() throws IOException {
        // backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
        Stage stage = (Stage) backBtn.getScene().getWindow();
        stage.close();
    }
}
