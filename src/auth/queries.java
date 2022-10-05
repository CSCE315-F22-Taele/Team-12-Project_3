package auth;

import java.sql.*;

public class queries {
	public static String getInventoryByItem(String name) {
		return String.format("SELECT * FROM inventory WHERE inventory.ingredient_name = '%s'", name);
	}

	public static String getMenuByItem(String name) {
		return String.format("SELECT * FROM menu WHERE menu.item_name = '%s'", name);
	}

	public static String addOrder(/*  */) {
		return String.format("INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES (%s, %s, %s, %s, %s)", null);
	}

	public static String addUser(/*  */) {
		return String.format("INSERT INTO users (user_type, username) VALUES (%s, %s)", null);
	}

	public static String addItems(/*  */) {
		return String.format("INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES (%s, %s, %s, %s, %s)", null);
	}

	public static String addIngredients(/*  */) {
		return String.format("INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES (%s, %s, %s, %s, %s)", null);
	}

	public static String addOrder(/*  */) {
		return String.format("INSERT INTO orders (name, server_id, time_ordered, is_ordered, price) VALUES (%s, %s, %s, %s, %s)", null);
	}
}
