package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;

/**
 * Handles user action on reports page
 */
public class ReportsController {
    @FXML
    private Button backBtn;
    @FXML
    private Button salesBtn;
    @FXML
    private Button excessBtn;
    @FXML
    private Button restockBtn;

    /**
     * Function not used, included for completeness and uniformity
     */
    public void initialize() {
        //
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
	 * Goes to the sales report page if sales button is clicked
     *
	 * @throws IOException
	 */
    public void salesClick() throws IOException {
        salesBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("sales.fxml")));
    }

    /**
	 * Goes to the excess report page if excess button is clicked
     *
	 * @throws IOException
	 */
    public void excessClick() throws IOException {
        excessBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("excess.fxml")));
    }
    /**
	 * Goes to the restock report page if restock button is clicked
     *
	 * @throws IOException
	 */
    public void restockClick() throws IOException {
        restockBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("restockReport.fxml")));
    }
}
