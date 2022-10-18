package app.ui;

import java.io.IOException;
import java.util.ArrayList;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import app.Main;
import app.model.Order;
import app.model.UserType;
import app.service.Server;
import app.service.Authentication;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.TitledPane;
import javafx.scene.control.Label;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;

public class ServerController {
	ArrayList<Order> allOrders = new ArrayList<Order>();
	// int selectedIdx = -1;
	String selectedName;
	Order currOrder;

	@FXML
	private Label label;
	@FXML
	private Button backBtn;
	@FXML
	private Button serveBtn;
	@FXML
	private Button addBtn;

	@FXML
	private Accordion ordersAccrdn;

	public void initialize() {
		ordersAccrdn.expandedPaneProperty().addListener(new ChangeListener<TitledPane>() {
			public void changed(ObservableValue<? extends TitledPane> ov,
					TitledPane old_val, TitledPane new_val) {
				if (new_val != null) {
					selectedName = ordersAccrdn.getExpandedPane().getText();
					for (Order o : allOrders) {
						if (o.getCustomerName() == selectedName)
							currOrder = o;
					}
				}
			}
		});

		UserType type = Authentication.getTypeFromString(Main.authen);
		allOrders.clear();
		allOrders = Server.getServerOrders(Main.username, type);
		ordersAccrdn.getPanes().clear();

		for (Order order : allOrders) {
			Label attributes = new Label();
			attributes.setText(order.toString());
			TitledPane orderNum = new TitledPane(order.getCustomerName(), attributes);
			ordersAccrdn.getPanes().add(orderNum);
		}
	}

	public void serveClick() {
		TitledPane temp = null;
		for (TitledPane tp : ordersAccrdn.getPanes()) {
			if (tp.getText() == selectedName)
				temp = tp;
		}
		ordersAccrdn.getPanes().remove(temp);
		currOrder.serveOrder();
		Server.removeOrder(currOrder.getOrderId());
	}

	public void addClick() throws IOException {
		// System.out.println("Server --> Cart");
		addBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("cart.fxml")));
	}

	public void backClick() throws IOException {
		// System.out.println("Server --> Home");
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
	}
}
