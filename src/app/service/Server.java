package app.service;

import java.util.ArrayList;
import java.util.UUID;

import app.Main;
import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.model.User;
import app.model.UserType;
import app.repository.dbExec;
import app.requests.createOrderRequest;
import javafx.util.Pair;

public class Server {

	private static ArrayList<Pair<String, Integer>> cart;

	public static void initializeCart() {
		cart = new ArrayList<Pair<String, Integer>>();
	}

	public static void addToCart(String itemName, int amount) {
		cart.add(new Pair<String, Integer>(itemName, amount));
	}

	public static void clearCart() {
		cart.clear();
	}

	public static ArrayList<Pair<String, Integer>> getCart() {
		return cart;
	}

	public static Order createOrder(createOrderRequest request) {
		
		UserType type = Authentication.getTypeFromString(Main.authen);
		User server = dbExec.findUserByUserName(request.serverName, type);
		Order order = new Order(request.customerName, server.getUserId());

		for (Pair<String, Integer> pair: request.items) {
			String itemName = pair.getKey();
			int amount = pair.getValue();

			Item item = dbExec.getMenuByItem(itemName);
			ArrayList<Ingredient> ingredients = dbExec.getItemIngredients(item.getItemId());

			item.setIngredients(ingredients);
			item.setAmount(amount);
			item.setOrderId(order.getOrderId());
			order.addItem(item);
		}

		dbExec.addOrder(order);
		for (Item item : order.getItems()) {

			dbExec.addItemToOrder(item);
			for (Ingredient ingredient : item.getIngredients()) {
				ingredient.setOrderId(order.getOrderId());
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
