package app.model;

import java.util.ArrayList;
import java.util.UUID;

/**
 * Store items present per order
 */
public class Item {
	private UUID itemId;
	private String name;
	private UUID orderId;
	private int amount;
	private double totalPrice;
	private ArrayList<Ingredient> ingredients;

	/**
	 * Initializes a new Item object
	 * 
	 * @param itemId
	 * @param name
	 * @param orderId
	 * @param amount
	 * @param price
	 */
	public Item(UUID itemId, String name, UUID orderId, int amount, double price) {
		this.itemId = itemId;
		this.name = name;
		this.orderId = orderId;
		this.amount = amount;
		this.totalPrice = price * amount;
		ingredients = new ArrayList<>();
	}

	/**
	 * Add ingredients used in this item
	 * 
	 * @param ingredient
	 */
	public void addIngredient(Ingredient ingredient) {
		System.out.println(itemId);
		ingredient.setItemId(itemId);
		ingredient.setOrderId(orderId);
		this.ingredients.add(ingredient);
	}

	/**
	 * Increase the amount of this item in the order
	 * 
	 * @param amount
	 */
	public void addAmount(int amount) {
		this.amount += amount;
	}

	/**
	 * Get item's ID
	 * 
	 * @return: item's unique ID
	 */
	public UUID getItemId() {
		return itemId;
	}

	/**
	 * Get item's name
	 * 
	 * @return: item's unique name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set item's name
	 * 
	 * @param name: name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Get item's order
	 * 
	 * @return: order to which this item belongs
	 */
	public UUID getOrderId() {
		return orderId;
	}

	/**
	 * Set item's order
	 * 
	 * @param orderId: order to set item ownership to
	 */
	public void setOrderId(UUID orderId) {
		this.orderId = orderId;
	}

	/**
	 * Get amount of this item present in order
	 * 
	 * @return: amount of item in order
	 */
	public int getAmount() {
		return amount;
	}

	/**
	 * Set amount of this item present in order
	 * Also handle changing ingredient amounts correspondingly
	 * 
	 * @param amount: amount to be set to
	 */
	public void setAmount(int amount) {
		this.amount = amount;
		for (int i = 0; i < this.ingredients.size(); i++) {
			Ingredient newIngredient = ingredients.get(i);
			newIngredient.setAmount(amount);
			this.ingredients.set(i, newIngredient);
		}
		System.out.println("Total price in item.java: " + this.totalPrice);
		// setTotalPrice(this.totalPrice * this.amount);
	}

	/**
	 * Get total price of item in order, considering quantity and individual price
	 * 
	 * @return: total price
	 */
	public double getTotalPrice() {
		return totalPrice;
	}

	/**
	 * Set total price of item
	 * 
	 * @param totalPrice: new price to set to
	 */
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	/**
	 * Get full list of ingredients
	 * 
	 * @return: ingredient list
	 */
	public ArrayList<Ingredient> getIngredients() {
		return this.ingredients;
	}

	/**
	 * Set list of ingredients
	 * 
	 * @param ingredients: new ingredient list
	 */
	public void setIngredients(ArrayList<Ingredient> ingredients) {
		this.ingredients = new ArrayList<>(ingredients);
	}

	@Override
	public String toString() {
		return name + " x" + (amount + 1);
	}

}
