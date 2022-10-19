package app.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

import app.db.jdbcpostgreSQL;
import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.model.User;
import app.model.UserType;
import javafx.util.Pair;

import java.util.HashSet;

/**
 * This class is used to make requests to the database and send results
 * back to the front-end to show the results.
 */
public class dbExec {
	/**
	 * Using the userName, it returns a User object with the ID, userName, and user_type defined.
	 * @param userName user's name
	 * @param type user's type
	 * @return desired user
	 */
	public static User findUserByUserName(String userName, UserType type) {
		UUID userId = null;
		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.findUserByUserName(userName));
			result.next();
			String id = result.getString("id");
			userId = UUID.fromString(id);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		User user = new User(userName, type);
		user.setUserId(userId);
		return user;
	}

	/**
	 * Checks if a user exists in the database
	 * @param userName User's name to check
	 * @return boolean signifying user's existence
	 */
	public static boolean checkUserExistence(String userName) {
		boolean res = false;
		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.findUserTypeByName(userName));
			res = result.next();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return res;
	}

	/**
	 * Return type of user
	 * @param userName username to check type
	 * @return User's type (server or manager)
	 */
	public static UserType findUserTypeByName(String userName) {
		UserType t = null;
		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.findUserTypeByName(userName));
			if (result.next() == false) {

			}
			int res = Integer.parseInt(result.getString("user_type"));
			t = (res == 0) ? UserType.SERVER : UserType.MANAGER;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return t;
	}

	/**
	 * Using the Order that is passed in, it updates the orders table in the database
	 * by adding this order to it.
	 * @param order current order to add
	 */
	public static void addOrder(Order order) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addOrder(order));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * An order can have multiple items, so this adds the Item object to the items
	 * database to keep it updated
	 * @param item current item to add
	 */
	public static void addItemToOrder(Item item) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addItemToOrder(item));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * An item can have multiple ingredients, so this adds the ingredients for an item
	 * to the ingredients database to keep it updated 
	 * @param ingredient current ingredient to add
	 */
	public static void addIngredientToItem(Ingredient ingredient) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addIngredientToItem(ingredient));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * An item can have multiple ingredients, so it takes the item's ingredients list
	 * and adds all of them at once.
	 * @param newItem current item to view and get the ingredients list from
	 */
	public static void linkIngredientsToItem(Item newItem){
		try{
			for (Ingredient ingredient : newItem.getIngredients()) {
				int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addIngredientToItem(ingredient));
			}
		} catch (SQLException e){
			e.printStackTrace();
		}
	}

	/**
	 * Adds newItem to the database menu
	 * @param newItem item to add to the menu database
	 */
	public static void addItemToMenu(Item newItem) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addItemToMenu(newItem));
			linkIngredientsToItem(newItem);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * This takes in a new Item object to be added to the database
	 * and adds it to both the menu and items table
	 * @param newItem new item to be added to restaurant's catalog
	 */
	public static void addItemToTwoTables(Item newItem){
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addItemToMenu(newItem));
			int result2 = jdbcpostgreSQL.stmt.executeUpdate(queries.addItemToTable(newItem));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Given the item, this will update the item's price if a change was made
	 * @param item the current item to look at
	 */
	public static void updateItemToMenu(Item item) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.updateItemToMenu(item));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Using the id sent in, which is in ingredient_id, it will set the 
	 * quantity for this ingredient in the inventory table
	 * @param id ingredient_id to look for
	 * @param amount quantity to set to
	 */
	public static void updateIngredientInInventory(UUID id, int amount) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.updateIngredientInInventory(id, amount));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Given the name of the ingredient, it returns an Ingredient object
	 * with the inventory information stored in the object
	 * @param name name of ingredient
	 * @return the ingredient object with inventory info of this ingredient stored
	 */
	public static Ingredient getInventoryByIngredient(String name) {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getInventoryByIngredient(name));
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		}

		UUID id = null;
		int amount = 0;
		int threshold = 100;
		try {
			result.next();
			id = UUID.fromString(result.getString("ingredient_id"));
			amount = Integer.parseInt(result.getString("quantity"));
			threshold = Integer.parseInt(result.getString("threshold"));
		} catch (SQLException e) {
			e.printStackTrace();
		}

		Ingredient ingredient = new Ingredient(id, name, null, null, amount, threshold);
		return ingredient;
	}

	/**
	 * Given the ingredient, this will insert the ingredient into the inventory
	 * table in the database
	 * @param ingredient ingredient to add
	 */
	public static void addIngredientToInventory(Ingredient ingredient) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addIngredientToInventory(ingredient));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Checks to see if the inventory is empty
	 * @return true if inventory is empty; otherwise false
	 */
	public static boolean isInventoryEmpty() {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.isInventoryEmpty());
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		}

		boolean isEmpty = false;
		try {
			result.next();
			isEmpty = Integer.parseInt(result.getString("count")) == 0;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return isEmpty;
	}

	/**
	 * Checks to see if the menu is empty
	 * @return true if menu is empty; otherwise false
	 */
	public static boolean isMenuEmpty() {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.isMenuEmpty());
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		}

		boolean isEmpty = false;
		try {
			result.next();
			isEmpty = Integer.parseInt(result.getString("count")) == 0;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return isEmpty;
	}

	/**
	 * Given the name of the menu item name, it will search
	 * and delete that item from the menu table
	 * @param name menu item to remove
	 */
	public static void removeItemFromMenu(String name) {
		int result;
		try {
			result = jdbcpostgreSQL.stmt.executeUpdate(queries.removeItemFromMenu(name));

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	/**
	 * This gets all of the menu items and pairs up an Item object referring
	 * that menu item and a string for its description. Note that the Item's
	 * orderID will not be initialized because this is just to get all menu items
	 * on the restaurant's catalog
	 * @return an arraylist of pairs, where key = menu item of type Item and value = description
	 */
	public static ArrayList<Pair<Item, String>> getMenuItems() {
		ArrayList<Pair<Item, String>> items = new ArrayList<>();

		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getMenuItems());
			while (result.next()) {
				UUID itemId = UUID.fromString(result.getString("item_id"));
				String name = result.getString("item_name");
				UUID orderId = null;
				int amount = 1;
				double price = Double.parseDouble(result.getString("price"));
				String description = result.getString("description");

				Item item = new Item(itemId, name, orderId, amount, price);
				items.add(new Pair<Item, String>(item, description));
			}

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		return items;
	}

	/**
	 * This gets all of the ingredients in the inventory table in the database
	 * @return HashMap with key = ingredient name and value = Ingredient object
	 */
	public static HashMap<String, Ingredient> getAllIngredients(){
		HashMap<String, Ingredient> ingredients = new HashMap<String, Ingredient>();

		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getAllInventory());
			while (result.next()) {
				UUID ingredId = UUID.fromString(result.getString("ingredient_id"));
				String name = result.getString("ingredient_name");
				UUID itemId = null;
				UUID orderId = null;
				int amount = result.getInt("quantity");
				int threshold = result.getInt("threshold");

				Ingredient ingred = new Ingredient(ingredId, name, itemId, orderId, amount, threshold);

				ingredients.put(name, ingred);
			}

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		return ingredients;
	}

	/**
	 * This gets all of the ingredients in the inventory table in the database
	 * @return Arraylist of all ingredients
	 */
	public static ArrayList<Ingredient> getAllInventory() {
		return new ArrayList<Ingredient>(getAllIngredients().values());
	}
	
	/**
	 * This restocks all of the inventory's quantity to whatever the amount is
	 * @param amount quantity to set to for each ingredient
	 */
	public static void restockAll(int amount) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.restockAll(amount));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	/**
	 * This restocks a specfic ingredient's quantity in inventory to whatever the 
	 * amount is
	 * @param amount quantity to set to for each ingredient
	 * @param ingredient specific ingredient to edit
	 */
	public static void restockIngredient(int amount, Ingredient ingredient) {
		try {
			int result = jdbcpostgreSQL.stmt
					.executeUpdate(queries.updateIngredientInInventory(ingredient.getIngredientId(), amount));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());

		}
	}

	/**
	 * Update's ingredient's max threshold to given threshold
	 * @param thresh threshold to update to
	 * @param ingredient ingredient to update threshold with
	 */
	public static void changeIngredientThresh(int thresh, Ingredient ingredient){
		try {
			int result = jdbcpostgreSQL.stmt
					.executeUpdate(queries.updateIngredientThreshold(ingredient.getIngredientId(), thresh));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	/**
	 * Get all orders associated with a particular server
	 * 
	 * @param userId ID of desired server for which to get orders
	 * @return list of all orders served by that server
	 */
	public static ArrayList<Order> getServerOrders(UUID userId) {
		ArrayList<Order> ordersByServer = new ArrayList<>();
		ArrayList<Double> orderPriceList = new ArrayList<>();
		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getServerOrders(userId));

			while (result.next()) {
				UUID id = UUID.fromString(result.getString("id"));
				String customerName = result.getString("customerName");
				UUID serverId = UUID.fromString(result.getString("server_id"));
				Timestamp t = result.getTimestamp("time_ordered");
				boolean isServed = result.getBoolean("is_served");
				double price = Double.parseDouble(result.getString("price"));
				Order addNewOrder = new Order(customerName, serverId);
				addNewOrder.setPrice(price);
				addNewOrder.setServed(isServed);
				addNewOrder.setTimeOrdered(t);
				addNewOrder.setOrderId(id);

				orderPriceList.add(price);
				ordersByServer.add(addNewOrder);
			}

			for (int i = 0; i < ordersByServer.size(); i++) {
				Order currOrder = ordersByServer.get(i);
				Double price = orderPriceList.get(i);

				ResultSet itemRows = jdbcpostgreSQL.stmt.executeQuery(queries.getOrderItems(currOrder.getOrderId()));

				ArrayList<Item> orderItems = new ArrayList<>();

				while (itemRows.next()) {
					UUID itemId = UUID.fromString(itemRows.getString("id"));
					String name = itemRows.getString("item_name");
					UUID orderId = currOrder.getOrderId();
					int amount = Integer.parseInt(itemRows.getString("quantity"));
					double priceItem = Double.parseDouble(itemRows.getString("total_price"));
					Item item = new Item(itemId, name, orderId, amount, priceItem);
					orderItems.add(item);
				}

				currOrder.setItems(orderItems);
				currOrder.setPrice(price);
				ordersByServer.set(i, currOrder);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		return ordersByServer;
	}

	/**
	 * This sets the is_served attribute in the database to true indicating that
	 * this order has been served.
	 * @param orderId orderId of the served order
	 */
	public static void removeOrder(UUID orderId) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.removeOrder(orderId));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	/**
	 * Gets an item's ingredients from the ingredients table using order_id and item_id
	 * @param orderId orderId of the item
	 * @param itemId itemId of the item
	 * @return Arraylist of ingredients for this item
	 */
	public static ArrayList<Ingredient> getItemIngredients(UUID orderId, UUID itemId) {
		ArrayList<Ingredient> ingredients = new ArrayList<>();

		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getItemIngredients(orderId, itemId));

			while (result.next()) {
				UUID ingredientId = UUID.fromString(result.getString("ingredient_id"));
				String name = result.getString("ingredient_name");
				int amount = Integer.parseInt(result.getString("amount"));

				Ingredient ingredient = new Ingredient(ingredientId, name, itemId, orderId, amount);
				ingredients.add(ingredient);
			}

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		return ingredients;
	}

	/**
	 * Returns the menu item's information as an Item object by using the name
	 * of the menu item sent it.
	 * @param itemName menu item to look for
	 * @return Item object consisting of the menu item's information
	 */
	public static Item getMenuByItem(String itemName) {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getMenuByItem(itemName));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		UUID itemId = null;
		double price = 0;
		try {
			result.next();
			itemId = UUID.fromString(result.getString("item_id"));
			price = Double.parseDouble(result.getString("price"));
		} catch (SQLException e) {
			e.printStackTrace();
		}

		Item item = new Item(itemId, itemName, null, 1, price); // amount to be updated later

		return item;
	}

	/**
	 * Gets all of the order_ids from the orders table that happen in between start time 
	 * and end time
	 * @param start time to start the search
	 * @param end time to end the search
	 * @return arraylist of all orders that fall in the time range
	 */
	public static ArrayList<Order> getAllOrderIDsWithinTime(Timestamp start, Timestamp end) {
		ArrayList<Order> orders = new ArrayList<>();
		
		String name = "";
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getAllOrdersWithinTime(start, end));
			while (result.next()) {
				UUID orderID = UUID.fromString(result.getString("id"));
				String customerName = result.getString("customerName");
				UUID serverId = UUID.fromString(result.getString("server_id"));
				Timestamp timeOrdered = result.getTimestamp("time_ordered");
				Boolean is_served = result.getBoolean("is_served");
				double price = result.getDouble("price");

				Order order = new Order(customerName, serverId);
				order.setOrderId(orderID);
				order.setTimeOrdered(timeOrdered);
				order.serveOrder();
				order.setPrice(price);
				orders.add(order);
			}

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage() + name);
		}
		return orders;
	}
	
	/**
	 * This gets all of the order_ids within the time range (start, end) using the 
	 * getAllOrderIDsWithinTime() and gets the counts for each menu item
	 * sold in that time range
	 * @param start time to start the search
	 * @param end time to end the search
	 * @return HashMap where key = menu item name, value = how many of those sold
	 */
	public static HashMap<String, Integer> getCountByMenuItem(Timestamp start, Timestamp end) {
		HashMap<String, Integer> itemFrequencies = new HashMap<>();
		ArrayList<Order> allOrders = getAllOrderIDsWithinTime(start, end);

		try {
			// Period period = Period.between(start, end);
			// int numDays = period.getDays();
			
			for(int i = 0; i < allOrders.size(); i++) {
				ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getCountByMenuItem(allOrders.get(i).getOrderId()));
				while(result.next()) {
					String itemName = result.getString("item_name");
					int quantity = result.getInt("quantity");
					if(itemFrequencies.containsKey(itemName))
						itemFrequencies.put(itemName, itemFrequencies.get(itemName) + quantity);
					else
						itemFrequencies.put(itemName, quantity);
				}
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}

		return itemFrequencies;
	}

	/**
	 * This gets all of the menu item names without the description associated
	 * with it, so it return just an arraylist of menu items stored in item
	 * object
	 * @return arraylist of items, where each one specifies the menu item in the catalog
	 */
	public static ArrayList<Item> getMenuItemsNoDescription() {
		ArrayList<Item> items = new ArrayList<>();

		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getMenuItems());
			while (result.next()) {
				UUID itemId = UUID.fromString(result.getString("item_id"));
				String name = result.getString("item_name");
				UUID orderId = null;
				int amount = 1;
				double price = Double.parseDouble(result.getString("price"));
				// String description = result.getString("description");

				Item item = new Item(itemId, name, orderId, amount, price);
				items.add(item);
			}

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		return items;
	}

	/**
	 * This calculates how well a menu item sold within the time range (start, end)
	 * @param menuItemName menu item of interest
	 * @param start time to start the search for
	 * @param end time to end the search
	 * @return total quantity of this menu item sold in this time range
	 */
	public static int getOrdersQuantityByMenuItem(String menuItemName, Timestamp start, Timestamp end) {
		int totalQuantity = 0;
		try {
			ArrayList<Order> orders = getAllOrderIDsWithinTime(start, end);
			
			for(Order order : orders) {
				ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getOrderItems(order.getOrderId()));
				while(result.next()) {
					String menuItemInOrder = result.getString("item_name");
					if(menuItemInOrder.equals(menuItemName))
						totalQuantity += result.getInt("quantity");
				}
			}
			

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		return totalQuantity;
	}

	/**
	 * This is used the calculate the excess report, where it finds a list of items that  
	 * sold less than 10% of their inventory between the timestamp and the current time, 
	 * assuming no restocks have happened during the window.
	 * @param start time to start the search for
	 * @param end current time
	 * @return Hashset containing all ingredients that match the condition explained above
	 */
	public static HashSet<String> getExcessCountByMenuItem(Timestamp start, Timestamp end) {
		HashMap<String, Ingredient> inventory = getAllIngredients();
		ArrayList<Item> menuItems = getMenuItemsNoDescription();
		HashMap<String, Integer> itemCounts = new HashMap<>();
		HashSet<String> allItemsBelow10 = new HashSet<>();
		ArrayList<Order> allOrders = getAllOrderIDsWithinTime(start, end);

		for (Order order : allOrders) {
			for (Item item : order.getItems()) {
				if (itemCounts.containsKey(item.getName()))
					itemCounts.put(item.getName(), itemCounts.get(item.getName()) + item.getAmount());
				else
					itemCounts.put(item.getName(), item.getAmount());
			}
		}

		for (Item eachMenuItem : menuItems) {
			String itemName = eachMenuItem.getName();
			if (!itemCounts.containsKey(itemName))
				itemCounts.put(itemName, 0);

			// go through orders and get all orders with this menu item
			// count quantity used of menu item by using order_id
			// and going through items table, so ingredients would
			// follow the same count
			// add up to totalCounts
			int quantityOrderedForThisMenuItem = itemCounts.get(itemName);
			ArrayList<Ingredient> ingredients = getItemIngredients(eachMenuItem.getOrderId(), eachMenuItem.getItemId());

			// System.out.println(ingredients.size() + " " + menuItems.size());

			for (Ingredient i : ingredients) {
				int inventoryAmount = inventory.get(i.getName()).getAmount();
				// System.out.println(quantityOrderedForThisMenuItem + " " + inventoryAmount);
				if ((double) (quantityOrderedForThisMenuItem) / inventoryAmount < 0.1)
					allItemsBelow10.add(i.getName());
			}
		}

		if (allItemsBelow10.size() == 0)
			allItemsBelow10.add("None");
		return allItemsBelow10;
	}

	/**
	 * This is used to generate the restock report, where it displays a list of items
	 * whose current inventory is less than the item's minimum amount to have around before needing to restock.
	 * @return arraylist of all ingredients which have their quantity that is less than
	 * the threshold value set by the manager 
	 */
	public static ArrayList<String> getMinimumReport() {
		ArrayList<String> allMinInventoryItems = new ArrayList<>();

		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getMinimumReport());
			while(result.next()) {
				String inventoryItemName = result.getString("ingredient_name");
				allMinInventoryItems.add(inventoryItemName);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return allMinInventoryItems;
	}

	/**
	 * Update an order's timestamp
	 * @param newTimeStamp new timestamp to update to
	 */
	public static void updateTimeStamp(UUID orderId, Timestamp newTimeStamp) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.updateTimeStamp(orderId, newTimeStamp));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}
}
