package app.service;

import java.util.ArrayList;

import app.model.Ingredient;
import app.model.Item;
import app.repository.dbExec;
import javafx.util.Pair;
import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashSet;

public class Manager {
	public static ArrayList<Pair<Item, String>> getMenuItems() {
		return dbExec.getMenuItems();
	}

	public static void addItemToMenu(Item item) {
		dbExec.addItemToMenu(item);
	}

	public static void removeItemFromMenu(String name) {
		dbExec.removeItemFromMenu(name);
	}

	public static void updateMenuItem(Item item) {
		dbExec.updateItemToMenu(item);
	}

	public static ArrayList<Ingredient> getAllInventory() {
		return dbExec.getAllInventory();
	}

	public static void restockAll(int amount) {
		dbExec.restockAll(amount);
	}

	public static void restockIngredient(int amount, String ingredientName) {
		Ingredient ingredient = dbExec.getInventoryByIngredient(ingredientName);
		int newAmount = amount + ingredient.getAmount();
		dbExec.restockIngredient(newAmount, ingredient);
	}

	// phase 4
	public static HashMap<String, Integer> getSalesReport(Timestamp start, Timestamp end) {
		return dbExec.getCountByMenuItem(start, end);
	}

	public static HashSet<String> getExcessReport(Timestamp start, Timestamp end) {
		return dbExec.getExcessCountByMenuItem(start, end);
	}

	public static ArrayList<String> getRestockReport() {
		return dbExec.getMinimumReport();
	}
}
