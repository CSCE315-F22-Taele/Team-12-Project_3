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
import javafx.scene.control.TextArea;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;

/**
 * Handles user actions on server page (adding new orders)
 */
public class ServerController {
	ArrayList<Order> allOrders = new ArrayList<Order>();
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

	/**
	 * Initializes that with any existing orders if not served
	 */
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
			if (!order.isServed()) {
				TextArea attributes = new TextArea();
				attributes.setEditable(false);
				attributes.setMaxHeight(90);
				attributes.setMinHeight(90);
				attributes.setText(order.toString());
				TitledPane orderNum = new TitledPane(order.getCustomerName(), attributes);
				ordersAccrdn.getPanes().add(orderNum);
			}
		}
	}

	/**
	 * Mark selected order as served and remove corresponding UI elements
	 */
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

	/**
	 * Changes to the cart scene to add new order
	 *
	 * @throws IOException
	 */
	public void addClick() throws IOException {
		addBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("cart.fxml")));
	}

	/**
	 * Returns to the starting page
	 *
	 * @throws IOException
	 */
	public void backClick() throws IOException {
		backBtn.getScene().setRoot(FXMLLoader.load(getClass().getResource("starting_page.fxml")));
	}
}
