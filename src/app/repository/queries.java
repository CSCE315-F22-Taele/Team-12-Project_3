package app.repository;

import java.util.UUID;

import app.model.Credentials;
import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.model.User;
import app.model.UserType;

public class queries {
	/**
	 * Get info about inventory item by name
	 * 
	 * @param: name of inventory item
	 * @return: SQL query to get inventory information
	 */

	public static String isInventoryEmpty() {
		return String.format("SELECT count(*) FROM (SELECT ingredient_id FROM inventory LIMIT 1) AS count");
	}

	public static String isMenuEmpty() {
		return String.format("SELECT count(*) FROM (SELECT item_id FROM menu LIMIT 1) AS count");
	}
	
	public static String getAllInventory() {
		return String.format("SELECT * FROM inventory;");
	}

	public static String getInventoryByIngredient(String name) {
		return String.format("SELECT * FROM inventory WHERE inventory.ingredient_name = '%s'", name);
	}

	/**
	 * Get info about menu item by name
	 * 
	 * @param: name of menu item
	 * @return: SQL query to get menu information
	 */
	public static String getMenuByItem(String name) {
		return String.format("SELECT * FROM menu WHERE menu.item_name = '%s'", name);
	}

	/**
	 * Add Order object to database
	 * 
	 * @param: New Order object
	 * @return: SQL query to insert Object
	 */
	public static String addOrder(Order order) {
		return String.format(
				"INSERT INTO orders (id, name, server_id, time_ordered, is_served, price) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')",
				order.getOrderId().toString(), order.getCustomerName(), order.getServerId(), order.getTimeOrdered(),
				order.isServed(), order.getPrice());
	}

	/**
	 * insert an item to an order
	 * 
	 * @param: New Item object to be inserted
	 * @return: SQL query to insert item to an order
	 */
	public static String addItemToOrder(Item item) {
		return String.format(
				"INSERT INTO items (id, item_name, order_id, quantity, total_price) VALUES ('%s', '%s', '%s', '%s', '%s')",
				item.getItemId().toString(), item.getName(), item.getOrderId().toString(), item.getAmount(),
				item.getTotalPrice());
	}

	/**
	 * add a new server or manager to database
	 * 
	 * @param: New user's name and type
	 * @return: SQL query to add add a user
	 */
	public static String addUser(User user) {
		return String.format(
				"INSERT INTO users (id, username, user_type) VALUES ('%s', '%s', (SELECT id FROM user_types WHERE type = '%s'))",
				user.getUserId().toString(), user.getUsername(), user.getType().toString());
	}

	/**
	 * add user credentials
	 * 
	 * @param: New credentials to be added
	 * @return: SQL query to add user credentials
	 */
	public static String addUserCredentials(Credentials user) {
		return String.format(
				"INSERT INTO credentials (id, password) VALUES ('%s', '%s')", user.getUserId().toString(),
				user.getHashedPassword());
	}

	public static String findUserByUserName(String userName) {
		return String.format(
				"SELECT id, username FROM users WHERE username = '%s'", userName);

	}

	public static String getUserCredentials(UUID userId) {
		return String.format(
				"SELECT password FROM credentials WHERE id = '%s'", userId.toString());
	}

	/**
	 * add an ingredient to the inventory
	 * 
	 * @param: ingredient's name and quantity
	 * @return: SQL query to insert an ingredient to the inventory
	 */
	public static String addIngredientToInventory(Ingredient ingredient) {
		return String.format("INSERT INTO inventory (ingredient_id, ingredient_name, quantity) VALUES ('%s', '%s', '%s')",
				ingredient.getIngredientId().toString(), ingredient.getName(), ingredient.getAmount());
	}

	public static String loadInventory(UUID ingredientId) {
		return String.format("UPDATE inventory SET is_loaded = true WHERE ingredient_id = '%s'",
				ingredientId.toString());
	}

	/**
	 * Add ingredient to an order
	 * 
	 * @param: New Ingredient object to be added
	 * @return: SQL query to insert ingredient
	 */
	public static String addIngredientToItem(Ingredient ingredient) {
		return String.format(
				"INSERT INTO ingredients (item_id, order_id, amount) VALUES ('%s', '%s', '%s', '%s', '%s')",
				ingredient.getItemId().toString(), ingredient.getOrderId().toString(), ingredient.getAmount());
	}

	/**
	 * add a user's credentials to the database
	 * 
	 * @param: user's hashed password
	 * @return: SQL query to insert user's credentials
	 */
	public static String addCredentials(Credentials credential) {
		return String.format(
				"INSERT INTO credentials (id, password) VALUES ('%s', '%s')", credential.getUserId().toString(),
				credential.getHashedPassword());
	}

	/**
	 * Create a new item on the menu
	 * 
	 * @param: New Item object to be created
	 * @return: SQL query to add item to menu
	 */
	public static String addItemToMenu(Item newItem) {
		// String temp;
		// if (newItem.getOrderId() == null) {
		// 	temp = null;
		// } else {
		// 	temp = newItem.getOrderId().toString();
		// }
		return String.format(
				"INSERT INTO menu (item_id, item_name, price) VALUES ('%s', '%s', '%s')",
				newItem.getItemId().toString(), newItem.getName(), 
				newItem.getTotalPrice());
	}

	public static String removeItemFromMenu(Item item) {
		return String.format("DELETE FROM menu WHERE item_id = '%s'", item.getItemId().toString());
	}

	public static String updateItemToMenu(Item newItem) {
		return String.format(
				"UPDATE menu SET price = '%s' WHERE name = '%s'",
				newItem.getTotalPrice(), newItem.getName());
	}

	public static String updateIngredientInInventory(UUID id, int amount) {
		return String.format("UPDATE inventory SET quantity = '%s' WHERE ingredient_id = '%s'", amount, id);
	}

	public static String restockAll(int amount) {
		return String.format("UPDATE inventory SET quantity = '%s'", amount);
	}

	public static String getMenuItems() {
		return String.format("SELECT * FROM menu");
	}

	public static String getServerOrders(UUID userId) {
		System.out.println("in queries" + userId);
		return String.format("SELECT * from orders WHERE server_id = '%s'", userId.toString());
	}

	public static String getOrderItems(UUID orderId) {
		return String.format("SELECT * FROM items WHERE order_id = '%s'", orderId.toString());
	}

	public static String removeOrder(UUID orderId) {
		return String.format("DELETE FROM orders WHERE order_id = '%s'", orderId.toString());
	}
}
