package app.ui;

import java.io.IOException;

import app.Main;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;
import javafx.scene.control.Button;

public class ErrorController {
    @FXML
	private Button backBtn;
    @FXML
	private TextArea errorMsg;

    /**
	 * Sets the error message using metadata from Main
	 * 
	 * @return void
	 */
    public void initialize() {
        errorMsg.setText(Main.errorMsg);
    }

    /**
	 * Closes the window that opens up instead of actually going back
	 * 
	 * @return void
	 */
    public void backClick() throws IOException {
        // backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
        Stage stage = (Stage) backBtn.getScene().getWindow();
        stage.close();
    }
}
