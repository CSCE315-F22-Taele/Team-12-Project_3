package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import app.model.Order;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;

import javafx.scene.control.TitledPane;
import javafx.scene.control.Label;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;

public class ServerController {
    ArrayList<Order> allOrders;
    int selectedIdx = -1;
    Order currOrder;
    
    @FXML
    private Label label;
    @FXML
    private Button backBtn;
    @FXML
    private Button deleteBtn;
    @FXML
    private Button addBtn;

    @FXML
    private Accordion ordersAccrdn;
    
    public void initialize() {
        ordersAccrdn.expandedPaneProperty().addListener(new ChangeListener<TitledPane>() {
            public void changed(ObservableValue<? extends TitledPane> ov,
                TitledPane old_val, TitledPane new_val) {
                    if (new_val != null) {
                        selectedIdx = Integer.parseInt(ordersAccrdn.getExpandedPane().getText());
                        currOrder = allOrders.get(selectedIdx);
                    }
            }
        });
    }

    public void deleteClick() {
        TitledPane temp = ordersAccrdn.getPanes().get(selectedIdx);         // get TitledPane of selected order, then remove
        ordersAccrdn.getPanes().remove(temp);
        // also remove from database, for which currOrder will be useful methinks
        System.out.println("Deleting order");
    }
    public void addClick() throws IOException {
        System.out.println("Server --> Cart");
        allOrders.add(null);            // add order to running list
        
        TitledPane temp = new TitledPane("ethan", null);        // give name associated with new user's order
        ordersAccrdn.getPanes().add(temp);
        // addBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("cart.fxml")));
    }
    public void backClick() throws IOException {
        System.out.println("Server --> Home");
        backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
    }
}
