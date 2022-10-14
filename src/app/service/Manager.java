package app.service;

import java.util.ArrayList;

import app.model.Ingredient;
import app.model.Item;
import app.repository.dbExec;
import javafx.util.Pair;

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
	public void getTrends() {

	}
}
