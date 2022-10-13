package app.service;

import java.util.ArrayList;

import app.model.Ingredient;
import app.model.Item;
import app.repository.dbExec;
import javafx.util.Pair;

public class Manager {
	public ArrayList<Pair<Item, String>> getMenuItems() {
		return dbExec.getMenuItems();
	}

	public void addItemToMenu(Item item) {
		dbExec.addItemToMenu(item);
	}

	public void removeItemFromMenu(Item item) {
		dbExec.removeItemFromMenu(item);
	}

	public void updateMenuItem(Item item) {
		dbExec.updateItemToMenu(item);
	}

	public ArrayList<Ingredient> getAllInventory() {
		return dbExec.getAllInventory();
	}

	public void restockAll(int amount) {
		dbExec.restockAll(amount);
	}

	public void restockIngredient(int amount, Ingredient ingredient) {
		dbExec.restockIngredient(amount, ingredient);
	}

	// phase 4
	public void getTrends() {

	}
}
