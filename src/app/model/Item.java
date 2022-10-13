package app.model;

import java.util.ArrayList;
import java.util.UUID;

public class Item {
	private UUID itemId;
	private String name;
	private UUID orderId;
	private int amount;
	private double totalPrice;
	private ArrayList<Ingredient> ingredients;

	/**
	 * Initializes a new Item object
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
	}

	/**
	 * Add ingredients used in this item
	 * @param ingredient
	 */
	public void addIngredient(Ingredient ingredient) {
		ingredients.add(ingredient);
	}

	/**
	 * Increase the amount of this item in the order
	 * @param amount
	 */
	public void addAmount(int amount) {
		this.amount += amount;
	}

	public UUID getItemId() {
		return itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public ArrayList<Ingredient> getIngredients() {
		return ingredients;
	}
}
