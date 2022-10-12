package app.repository;

import app.model.Ingredient;
import app.model.Order;
import app.model.User;

public class queries {
	/**
	 * Get info about inventory item by name
	 * 
	 * @param: name of inventory item
	 * @return: SQL query to get inventory information
	 */
	public static String getInventoryByItem(String name) {
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
				order.getOrderId(), order.getCustomerName(), order.getServerId(), order.getTimeOrdered(),
				order.isServed(), order.getPrice());
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
				user.getUserId(), user.getUsername(), user.getType().toString());
	}

	/**
	 * add an ingredient to the inventory
	 * 
	 * @param: ingredient's name and quantity
	 * @return: SQL query to insert an ingredient to the inventory
	 */
	public static String addIngredientToInventory(String ingredientName, int quantity) {
		return String.format("INSERT INTO inventory (ingredient_name, quantity) VALUES ('%s', '%s')",
				ingredientName, quantity);
	}

	/**
	 * Add ingredient to an order
	 * 
	 * @param: New Ingredient object to be added
	 * @return: SQL query to insert ingredient
	 */
	public static String addIngredient(Ingredient ingredient) {
		return String.format(
				"INSERT INTO ingredients (item_id, order_id, amount) VALUES ('%s', '%s', '%s', '%s', '%s')",
				null);
		// String sqlStatement = String.format("INSERT INTO ingredients (item_id,
		// order_id, quantity) VALUES(" +
		// getAttributes.get(i)[0] + ", " + getAttributes.get(i)[1] + ", "
		// getAttributes.get(i)[2] + ");");
	}

	/**
	 * add a user's credentials to the database
	 * 
	 * @param: user's hashed password
	 * @return: SQL query to insert user's credentials
	 */
	public static String insertCredentials(/* */) {
		return String.format(
				"INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES ('%s', '%s', '%s', '%s', '%s')",
				null);
		/*
		 * * // for credentials insertions
		 * String sqlStatement = String
		 * .format("INSERT INTO credentials (password) VALUES('" +
		 * getAttributes.get(i)[0] + "');");
		 */
	}

	/**
	 * Create a new item on the menu
	 * 
	 * @param: New Item object to be created
	 * @return: SQL query to add item to menu
	 */
	public static String insertItemToMenu(/* */) {
		return String.format(
				"INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES ('%s', '%s', '%s', '%s', '%s')",
				null);
		/*
		 * // for menu insertions
		 * String sqlStatement =
		 * String.format("INSERT INTO menu (item_name, description, price) VALUES('" +
		 * getAttributes.get(i)[0] + "', '" + getAttributes.get(i)[1] + "', "
		 * getAttributes.get(i)[2] + ");");
		 */
	}

	/**
	 * insert an item to an order
	 * 
	 * @param: New Item object to be inserted
	 * @return: SQL query to insert item to an order
	 */
	public static String addItemsToOrder(/* */) {
		return String.format(
				"INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES ('%s', '%s', '%s', '%s', '%s')",
				null);
		/*
		 * String sqlStatement =
		 * String.o"INSERT INTO items () VALUES('"+getAttributes.get(i)[0]+"', "
		 * +getAttributes.get(i)[1]+", "getAttributes.get(i)[2]+");";
		 */
	}
}
