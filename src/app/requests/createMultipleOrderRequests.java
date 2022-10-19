package app.requests;

import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
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
				Integer amt = randInt.nextInt(4) + 1;

				// Add generated thing to items
				items.add(new Pair<String, Integer>(itemToAdd, amt));
			}

			createOrderRequest request = new createOrderRequest(customerName, serverName, items);

			Order order = Server.createOrder(request, (amountOfOrders-i) > 4); // Will display about 5 orders
		}
	}
}
