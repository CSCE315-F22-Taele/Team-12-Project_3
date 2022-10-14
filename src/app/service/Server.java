package app.service;

import java.util.ArrayList;
import java.util.UUID;

import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.model.User;
import app.model.UserType;
import app.repository.dbExec;
import app.requests.createOrderRequest;

public class Server {
	public Order createOrder(createOrderRequest request) {
		Order order = new Order(request.customerName, request.serverId);
		order.setItems(request.items);

		dbExec.addOrder(order);
		for (Item item : order.getItems()) {
			
			dbExec.addItemToOrder(item);
			for (Ingredient ingredient: item.getIngredients()) {
				dbExec.addIngredientToItem(ingredient);

				Ingredient curr = dbExec.getInventoryByIngredient(ingredient.getName());
				int leftAmount = curr.getAmount() - ingredient.getAmount();

				dbExec.updateIngredientInInventory(ingredient.getIngredientId(), leftAmount);
			}
		}
		return order;
	}

	public static ArrayList<Order> getServerOrders(String serverName, UserType type) {
		User user = dbExec.findUserByUserName(serverName, type);
		return dbExec.getServerOrders(user.getUserId());
	}

	public static void removeOrder(UUID orderId) {
		dbExec.removeOrder(orderId);
	}
}
