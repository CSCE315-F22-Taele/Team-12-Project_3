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

/**
 * Store all functionality a server is capable of performing from their screen
 */
public class Server {

	private static ArrayList<Pair<String, Integer>> cart;

	/**
	 * Initialize cart to be empty
	 */
	public static void initializeCart() {
		cart = new ArrayList<Pair<String, Integer>>();
	}

	/**
	 * Add a new "pseudo-item" to the current cart
	 * 
	 * @param itemName: name of the item
	 * @param amount: quantity of particular item in order
	 */
	public static void addToCart(String itemName, int amount) {
		cart.add(new Pair<String, Integer>(itemName, amount));
	}

	/**
	 * Empty out current cart
	 */
	public static void clearCart() {
		cart.clear();
	}

	/**
	 * Get current state of cart
	 * 
	 * @return: list of String,Integer pairs, where first element is item's name and second element is item's count
	 */
	public static ArrayList<Pair<String, Integer>> getCart() {
		return cart;
	}

	/**
	 * Create order, add it to database, and ensure other tables are updated to match
	 * 
	 * @param request: information about new order
	 * @return: new Order object, after being added to database and all relevant dependencies handled
	 */
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
			item.setTotalPrice(item.getTotalPrice() * item.getAmount());
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

	/**
	 * Get all orders served by particular server
	 * 
	 * @param serverName: server's name
	 * @param type: user's type, should be UserType.SERVER
	 * @return: list of orders associated with server
	 */
	public static ArrayList<Order> getServerOrders(String serverName, UserType type) {
		User user = dbExec.findUserByUserName(serverName, type);
		return dbExec.getServerOrders(user.getUserId());
	}

	/**
	 * Denote order as served
	 * 
	 * @param orderId: order to be served
	 */
	public static void removeOrder(UUID orderId) {
		dbExec.removeOrder(orderId);
	}
}
