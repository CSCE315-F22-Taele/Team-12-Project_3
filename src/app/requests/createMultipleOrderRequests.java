package app.requests;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;
import java.util.Random;

import app.Main;
import app.model.Item;
import app.model.Order;
import app.repository.dbExec;
import app.service.Server;
import javafx.util.Pair;

public class createMultipleOrderRequests {
	/**
	 * generates a given number of random orders and populates database
	 * @param amountOfOrders number of orders to randomly generate
	 */
	public static void createMultipleOrders(long amountOfOrders) {
		Main.authen = "server.fxml";
		Random randInt = new Random();
		ArrayList<Item> menuItems = dbExec.getMenuItemsNoDescription();
		ArrayList<String> serverNameSet = new ArrayList<>();
		serverNameSet.add("akash_jothi");
		serverNameSet.add("chris_anand");
		serverNameSet.add("senhe_hao");
		int randomIndex;

		for (long i = 0; i < amountOfOrders; i++) {

			String customerName = UUID.randomUUID().toString();
			String serverName = serverNameSet.get(randInt.nextInt(3));

			int amountOfItems = randInt.nextInt(3) + 1;
			ArrayList<Pair<String, Integer>> items = new ArrayList<>();
			for (int itemI = 0; itemI < amountOfItems; itemI++) {
				randomIndex = randInt.nextInt(menuItems.size());
				String itemToAdd = menuItems.get(randomIndex).getName();
				Integer quantity = randInt.nextInt(4) + 1;

				// Add generated thing to items
				items.add(new Pair<String, Integer>(itemToAdd, quantity));
			}

			createOrderRequest request = new createOrderRequest(customerName, serverName, items);

			Order order = Server.createOrder(request, true);

			// generate random date somewhere in the last 6 months, down to the millisecond
			Timestamp now = Timestamp.valueOf(LocalDate.now().atStartOfDay());
			Timestamp sixMonthsAgo = Timestamp.valueOf(LocalDate.now().minusMonths(6).atStartOfDay());
			long millNow = now.getTime();
			long millThen = sixMonthsAgo.getTime();
			long millRand = (long)((Math.random() * (millNow - millThen)) + millThen);
			Timestamp newTime = new Timestamp(millRand);
			order.setTimeOrdered(newTime);
			dbExec.updateTimeStamp(order.getOrderId(), newTime);
		}
	}
}
