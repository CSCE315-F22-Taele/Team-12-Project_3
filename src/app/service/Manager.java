package app.service;

import java.util.ArrayList;

import app.model.Ingredient;
import app.model.Item;
import app.repository.dbExec;
import javafx.util.Pair;
import java.util.HashMap;
import java.util.HashSet;
import java.sql.Timestamp;

/**
 * Store all functionality that a manager can do, and would ever want to do from their screen
 */
public class Manager {
	/**
	 * Get all menu items
	 * 
	 * @return: ArrayList of Item,String Pairs, where Item is the item object, and String is the description of the item
	 */
	public static ArrayList<Pair<Item, String>> getMenuItems() {
		return dbExec.getMenuItems();
	}

	/**
	 * Add a new item to the menu
	 * 
	 * @param item: new item to add
	 */
	public static void addItemToMenu(Item item) {
		dbExec.addItemToMenu(item);
	}

	/**
	 * Remove item from menu
	 * 
	 * @param name: name of item to remove
	 */
	public static void removeItemFromMenu(String name) {
		dbExec.removeItemFromMenu(name);
	}

	/**
	 * Update item's price in the database to the item's currently stored price
	 * 
	 * @param item: newly updated item object to be reflected in the database
	 */
	public static void updateMenuItem(Item item) {
		dbExec.updateItemToMenu(item);
	}

	/**
	 * Get entire list of ingredients in inventory
	 * 
	 * @return: list of inventory ingredients
	 */
	public static ArrayList<Ingredient> getAllInventory() {
		return dbExec.getAllInventory();
	}

	/**
	 * Restock all items in inventory, adding amount to all quantities
	 * 
	 * @param amount: amount to be added to each quantity
	 */
	public static void restockAll(int amount) {
		dbExec.restockAll(amount);
	}

	/**
	 * Restock particular ingredient given by name, by a particular amount
	 * 
	 * @param amount: amount to add to ingredient's quantity
	 * @param ingredientName: name of ingredient to be restocked
	 */
	public static void restockIngredient(int amount, String ingredientName) {
		Ingredient ingredient = dbExec.getInventoryByIngredient(ingredientName);
		int newAmount = amount + ingredient.getAmount();
		dbExec.restockIngredient(newAmount, ingredient);
	}

	/**
	 * Set ingredient's minimum threshold
	 * 
	 * @param threshold: new value of lower bound
	 * @param name: name of ingredient to change
	 */
	public static void changeIngredientThreshold(int threshold, String name){
		Ingredient ingredient = dbExec.getInventoryByIngredient(name);
		dbExec.changeIngredientThresh(threshold, ingredient);
	}

	/**
	 * Get sales report for the timeframe between start and end
	 * Sales report is the amount of each item sold over a given window in time
	 * 
	 * @param start: start date of consideration window
	 * @param end: end date of consideration window
	 * @return: mapping between item name and quantity sold over the time period
	 */
	public static HashMap<String, Integer> getSalesReport(Timestamp start, Timestamp end) {
		return dbExec.getCountByMenuItem(start, end);
	}

	/**
	 * Get excess report for timeframe between start and end
	 * Excess report gives the items that sold less than 10% of their current inventory over a given time window
	 * 
	 * @param start: start date of consideration window
	 * @param end: end date of consideration window
	 * @return: set of ingredient names having excess inventory
	 */
	public static HashSet<String> getExcessReport(Timestamp start, Timestamp end) {
		return dbExec.getExcessCountByMenuItem(start, end);
	}

	/**
	 * Get restock report, which is all ingredients below their minimum threshold, thus requiring restocking
	 * 
	 * @return: list of all ingredient names whose quantity is below threshold
	 */
	public static ArrayList<String> getRestockReport() {
		return dbExec.getMinimumReport();
	}
}
