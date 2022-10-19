package app.ui;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;

public class ReportsController {
    @FXML
    private Button backBtn;
    @FXML
    private Button salesBtn;
    @FXML
    private Button excessBtn;
    @FXML
    private Button restockBtn;

    public void initialize() {
        //
    }

    public void backClick() throws IOException {
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("manager.fxml")));
    }
    public void salesClick() throws IOException {
        salesBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("sales.fxml")));
    }
    public void excessClick() throws IOException {
        excessBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("excess.fxml")));
    }
    public void restockClick() throws IOException {
        restockBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("restockReport.fxml")));
    }
}
