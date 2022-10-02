package auth;

import java.sql.*;

public class queries {
	public static String getInventoryByItem(String name) {
		return String.format("SELECT * FROM inventory WHERE inventory.ingredient_name = '%s'", name);
	}

	public static String getMenuByItem(String name) {
		return String.format("SELECT * FROM menu WHERE menu.item_name = '%s'", name")
	}
}
