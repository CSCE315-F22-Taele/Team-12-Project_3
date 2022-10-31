package app.repository;

import java.sql.Timestamp;
import java.util.UUID;

import app.model.Credentials;
import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.model.User;

public class queries {
	
	/**
	 * Formats the query to see if the inventory is empty
	 * @return SQL query in string format to be executed 
	 */
	public static String isInventoryEmpty() {
		return String.format("SELECT count(*) AS count FROM inventory");
	}
	
	/**
	 * Formats the query to see if the menu is empty
	 * @return SQL query in string format to be executed 
	 */
	public static String isMenuEmpty() {
		return String.format("SELECT count(*) AS count FROM menu");
	}
	
	/**
	 * Formats the query to retrieve everything from the inventory
	 * @return SQL query in string format to be executed 
	 */
	public static String getAllInventory() {
		return String.format("SELECT * FROM inventory;");
	}
	
	/**
	 * Get info about inventory item by name
	 * 
	 * @param name name of inventory item
	 * @return SQL query to get inventory information
	 */
	public static String getInventoryByIngredient(String name) {
		return String.format("SELECT * FROM inventory WHERE inventory.ingredient_name = '%s'", name);
	}

	/**
	 * Get info about menu item by name
	 * 
	 * @param name name of menu item
	 * @return SQL query to get menu information
	 */
	public static String getMenuByItem(String name) {
		return String.format("SELECT * FROM menu WHERE menu.item_name = '%s'", name);
	}

	/**
	 * Add Order object to database
	 * 
	 * @param order New Order object
	 * @return SQL query to insert Object
	 */
	public static String addOrder(Order order) {
		return String.format(
				"INSERT INTO orders (id, customerName, server_id, time_ordered, is_served, price) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')",
				order.getOrderId().toString(), order.getCustomerName(), order.getServerId(), order.getTimeOrdered(),
				order.isServed(), order.getPrice());
	}

	/**
	 * insert an item to an order
	 * 
	 * @param item New Item object to be inserted
	 * @return SQL query to insert item to an order
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
	 * @param user New user's name and type
	 * @return SQL query to add add a user
	 */
	public static String addUser(User user) {
		return String.format(
				"INSERT INTO users (id, username, user_type) VALUES ('%s', '%s', (SELECT id FROM user_types WHERE type = '%s'))",
				user.getUserId().toString(), user.getUsername(), user.getType().toString());
	}

	/**
	 * add user credentials
	 * 
	 * @param user New credentials to be added
	 * @return SQL query to add user credentials
	 */
	public static String addUserCredentials(Credentials user) {
		return String.format(
				"INSERT INTO credentials (id, password) VALUES ('%s', '%s')", user.getUserId().toString(),
				user.getHashedPassword());
	}

	/**
	 * Formats the query to get the User info based on user's name
	 * @param userName the user's name
	 * @return SQL query in string format to be executed 
	 */
	public static String findUserByUserName(String userName) {
		return String.format(
				"SELECT id, username FROM users WHERE username = '%s'", userName);

	}

	/**
	 * Formats the query to get the UserType based on user's name
	 * @param userName user's name
	 * @return SQL query in string format to be executed
	 */
	public static String findUserTypeByName(String userName) {
		return String.format("SELECT user_type FROM users WHERE username = '%s'", userName);
	}

	/**
	 * Formats the query to get user's credentials
	 * @param userId user's id
	 * @return SQL query in string format to be executed
	 */
	public static String getUserCredentials(UUID userId) {
		return String.format(
				"SELECT password FROM credentials WHERE id = '%s'", userId.toString());
	}

	/**
	 * add an ingredient to the inventory
	 * 
	 * @param ingredient ingredient's name and quantity
	 * @return SQL query to insert an ingredient to the inventory
	 */
	public static String addIngredientToInventory(Ingredient ingredient) {
		return String.format(
				"INSERT INTO inventory (ingredient_id, ingredient_name, quantity, threshold) VALUES ('%s', '%s', '%s', '%s')",
				ingredient.getIngredientId().toString(), ingredient.getName(), ingredient.getAmount(), ingredient.getThreshold());
	}

	/**
	 * Add ingredient to an order
	 * 
	 * @param ingredient new Ingredient object to be added
	 * @return SQL query to insert ingredient
	 */
	public static String addIngredientToItem(Ingredient ingredient) {
		return String.format(
				"INSERT INTO ingredients (ingredient_id, ingredient_name, item_id, order_id, amount) VALUES ('%s', '%s', '%s', '%s', '%s')",
				ingredient.getIngredientId().toString(), ingredient.getName(), ingredient.getItemId().toString(),
				(ingredient.getOrderId() != null) ? ingredient.getOrderId().toString() : null, ingredient.getAmount());
	}

	/**
	 * Formats the query to get all ingredients that match the order_id and item_id
	 * @param orderId order_id to look for
	 * @param itemId item_id to look for
	 * @return SQL query in string format to be executed
	 */
	public static String getItemIngredients(UUID orderId, UUID itemId) {
		return String.format(
				"SELECT * FROM ingredients WHERE order_id = '%s' AND item_id = '%s'", orderId, itemId);
	}

	/**
	 * add a user's credentials to the database
	 * 
	 * @param credential user's hashed password
	 * @return SQL query to insert user's credentials
	 */
	public static String addCredentials(Credentials credential) {
		return String.format(
				"INSERT INTO credentials (id, password) VALUES ('%s', '%s')", credential.getUserId().toString(),
				credential.getHashedPassword());
	}

	/**
	 * Create a new item on the menu
	 * 
	 * @param newItem New Item object to be created
	 * @return SQL query to add item to menu
	 */
	public static String addItemToMenu(Item newItem) {
		return String.format(
				"INSERT INTO menu (item_id, item_name, price) VALUES ('%s', '%s', '%s')",
				newItem.getItemId().toString(), newItem.getName(),
				newItem.getTotalPrice());
	}

	/**
	 * Formats the query to add the new item to the items table in the database
	 * @param newItem new item to add
	 * @return SQL query in string format to be executed
	 */
	public static String addItemToTable(Item newItem){
		return String.format(
				"INSERT INTO items (id, item_name, order_id, quantity, total_price) VALUES ('%s', '%s', '%s', '%s', '%s')",
				newItem.getItemId().toString(), newItem.getName(), newItem.getOrderId(),
				newItem.getAmount(), newItem.getTotalPrice());
	}

	/**
	 * Formats the query to remove the specific menu item's name passed in.
	 * @param name menu item name to look for to remove
	 * @return SQL query in string format to be executed
	 */
	public static String removeItemFromMenu(String name) {
		return String.format("DELETE FROM menu WHERE item_name = '%s'", name);
	}

	/**
	 * Formats the query to update the price of a menu item on the restaurant's catalog
	 * @param newItem item to look for
	 * @return SQL query in string format to be executed
	 */
	public static String updateItemToMenu(Item newItem) {
		return String.format(
				"UPDATE menu SET price = %s WHERE item_name = '%s'",
				newItem.getTotalPrice(), newItem.getName());
	}

	/**
	 * Formats the query to update the quantity of the specific ingredient
	 * passed in with the ID to the amount sent in
	 * @param id ingredient's id in the inventory table
	 * @param amount what to set the quantity to
	 * @return SQL query in string format to be executed
	 */
	public static String updateIngredientInInventory(UUID id, int amount) {
		return String.format("UPDATE inventory SET quantity = '%s' WHERE ingredient_id = '%s'", amount, id);
	}

	/**
	 * Formats the query to restock all of the ingredients in the inventory
	 * table to the amount sent it.
	 * @param amount amount to set to for every ingredient's quantity attribute
	 * @return SQL query in string format to be executed
	 */
	public static String restockAll(int amount) {
		return String.format("UPDATE inventory SET quantity = inventory.quantity + '%s'", amount);
	}

	/**
	 * Formats the query to get all of the menu items in the menu table in the database
	 * @return SQL query in string format to be executed
	 */
	public static String getMenuItems() {
		return String.format("SELECT * FROM menu");
	}

	/**
	 * Formats the query to get all orders with the server_id sent it
	 * @param userId server_id to look for in orders
	 * @return SQL query in string format to be executed
	 */
	public static String getServerOrders(UUID userId) {
		return String.format("SELECT * from orders WHERE server_id = '%s'", userId.toString());
	}

	public static String getServerOrdersNotServed(UUID userId) {
		return String.format("SELECT * from orders WHERE server_id = '%s' AND is_served = false", userId.toString());
	}

	/**
	 * Formats the query to get all of the items in the items database
	 * with the order_id passed in
	 * @param orderId order_id to look for in items
	 * @return SQL query in string format to be executed
	 */
	public static String getOrderItems(UUID orderId) {
		return String.format("SELECT * FROM items WHERE order_id = '%s'", orderId.toString());
	}

	/**
	 * Formats the query to set is_served to true for all orders that have been
	 * served
	 * @param orderId order_id to look for
	 * @return SQL query in string format to be executed
	 */
	public static String removeOrder(UUID orderId) {
		return String.format("UPDATE orders SET is_served = TRUE WHERE id = '%s'", orderId.toString());
	}

	/**
	 * Formats the query to get all orders within the time range (start, range)
	 * @param start time to start the search for
	 * @param end time to end the search
	 * @return SQL query in string format to be executed
	 */
	public static String getAllOrdersWithinTime(Timestamp start, Timestamp end) {
		return String.format("SELECT * FROM orders WHERE time_ordered " + 
					"BETWEEN '%s' AND '%s'", 
					start.toString(), end.toString());
	}
	

	/**
	 * Formats the query to get the item_name and quantity of any item
	 * in the items database with the order_id sent in
	 * @param orderId order_id to look for
	 * @return SQL query in string format to be executed
	 */
	public static String getCountByMenuItem(UUID orderId) {
		return String.format(
			"SELECT item_name, quantity FROM items WHERE order_id = '%s'",orderId.toString());

		// return String.format("SELECT * FROM items");
	}

	/**
	 * Formats the query to get all of the ingredient names from the inventory
	 * table where the quantity is less than the threshold value
	 * @return SQL query in string format to be executed
	 */
	public static String getMinimumReport() {
		return String.format(
			"SELECT ingredient_name FROM inventory WHERE quantity < threshold");
	}

	/**
	 * Formats the query to update ingredient's max threshold to given threshold
	 * @param id     ID of ingredient to update
	 * @param thresh threshold to update to
	 * @return SQL query in string format to be executed
	 */
	public static String updateIngredientThreshold(UUID id, int thresh) {
		return String.format("UPDATE inventory SET threshold = '%s' WHERE ingredient_id = '%s'", thresh, id);
	}

	public static String updateTimeStamp(UUID orderId, Timestamp newTimeStamp) {
		return String.format("UPDATE orders SET time_ordered = '%s' WHERE id = '%s'", newTimeStamp, orderId);
	}
}
