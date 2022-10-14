package app.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

import app.Main;
import app.db.jdbcpostgreSQL;
import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.model.User;
import app.model.UserType;
import javafx.util.Pair;

public class dbExec {
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

	public static void addOrder(Order order) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addOrder(order));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void addItemToOrder(Item item) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addItemToOrder(item));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void addIngredientToItem(Ingredient ingredient) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addIngredientToItem(ingredient));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void addItemToMenu(Item newItem) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addItemToMenu(newItem));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateItemToMenu(Item item) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.updateItemToMenu(item));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void updateIngredientInInventory(UUID id, int amount) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.updateIngredientInInventory(id, amount));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static Ingredient getInventoryByIngredient(String name) {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getInventoryByIngredient(name));
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		}

		UUID id = null;
		UUID itemId = null;
		int amount = 0;
		UUID orderId = null;
		try {
			id = UUID.fromString(result.getString("id"));
			itemId = UUID.fromString(result.getString("item_id"));
			orderId = UUID.fromString(result.getString("order_id"));
			amount = Integer.parseInt(result.getString("quantity"));
		} catch (SQLException e) {
			e.printStackTrace();
		}

		Ingredient ingredient = new Ingredient(id, name, itemId, orderId, amount);
		return ingredient;
	}

	public static void addIngredientToInventory(Ingredient ingredient) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.addIngredientToInventory(ingredient));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static boolean isInventoryEmpty() {
		ResultSet result;
		try {
			System.out.println("in try");
			result = jdbcpostgreSQL.stmt.executeQuery(queries.isInventoryEmpty());
			System.out.println("leaving try");
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		}

		boolean isEmpty = false;
		try {
			// result.next();
			isEmpty = Integer.parseInt(result.getString("count")) == 0;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return isEmpty;
	}

	public static boolean isMenuEmpty() {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.isMenuEmpty());
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		}

		boolean isEmpty = false;
		try {
			// result.next();
			isEmpty = Integer.parseInt(result.getString("count")) == 0;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return isEmpty;
	}

	public static void removeItemFromMenu(String name) {
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.removeItemFromMenu(name));

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

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

	public static ArrayList<Ingredient> getAllInventory() {
		ArrayList<Ingredient> inventory = new ArrayList<Ingredient>();

		String name = "";
		ResultSet result;
		try {
			result = jdbcpostgreSQL.stmt.executeQuery(queries.getAllInventory());
			while (result.next()) {
				UUID itemId = null;
				UUID orderId = null;
				UUID ingredientId = UUID.fromString(result.getString("ingredient_id"));
				int amount = Integer.parseInt(result.getString("quantity"));
				name = result.getString("ingredient_name");

				Ingredient ingredient = new Ingredient(ingredientId, name, itemId, orderId, amount);
				inventory.add(ingredient);
			}

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage() + name);
		}
		System.out.println(inventory);
		return inventory;
	}

	public static void restockAll(int amount) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.restockAll(amount));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	public static void restockIngredient(int amount, Ingredient ingredient) {
		try {
			int result = jdbcpostgreSQL.stmt
					.executeUpdate(queries.updateIngredientInInventory(ingredient.getIngredientId(), amount));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());

		}
	}

	public static ArrayList<Order> getServerOrders(UUID userId) {
		ArrayList<Order> ordersByServer = new ArrayList<>();
		try {
			ResultSet result = jdbcpostgreSQL.stmt.executeQuery(queries.getServerOrders(userId));
			System.out.println("past initial query");

			while (result.next()) {
				UUID id = UUID.fromString(result.getString("id"));
				String customerName = result.getString("customerName");
				UUID serverId = UUID.fromString(result.getString("server_id"));
				Timestamp t = result.getTimestamp("time_ordered");
				boolean isServed = Boolean.valueOf(result.getString("is_served"));
				double price = Double.parseDouble(result.getString("price"));
				System.out.println("past first assignments");

				Order addNewOrder = new Order(customerName, serverId);
				addNewOrder.setPrice(price);
				addNewOrder.setServed(isServed);
				addNewOrder.setTimeOrdered(t);
				addNewOrder.setOrderId(id);
				System.out.println("past second assignments");

				ResultSet itemRows = jdbcpostgreSQL.stmt.executeQuery(queries.getOrderItems(addNewOrder.getOrderId()));
				System.out.println("past SQL query");

				ArrayList<Item> allItems = new ArrayList<>();
				while (itemRows.next()) {
					UUID itemId = UUID.fromString(itemRows.getString("item_id"));
					String name = itemRows.getString("item_name");
					UUID orderId = addNewOrder.getOrderId();
					int amount = Integer.parseInt(result.getString("quantity"));
					double priceItem = Double.parseDouble(itemRows.getString("total_price"));

					Item item = new Item(itemId, name, orderId, amount, priceItem);
					allItems.add(item);
				}
				System.out.println("past while loop");

				addNewOrder.setItems(allItems);

				ordersByServer.add(addNewOrder);
				System.out.println("past last things");
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage() + userId);
		}

		return ordersByServer;
	}

	public static void removeOrder(UUID orderId) {
		try {
			int result = jdbcpostgreSQL.stmt.executeUpdate(queries.removeOrder(orderId));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

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
			itemId = UUID.fromString(result.getString("item_id"));
			price = Double.parseDouble(result.getString("price"));
		} catch (SQLException e) {
			e.printStackTrace();
		}

		Item item = new Item(itemId, itemName, null, 0, price); // amount to be updated later
		return item;
	}
}
