package app.model;

import java.util.ArrayList;
import java.util.UUID;

import app.repository.dbExec;

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
	 * Overload the addIngredient, this adds 
	 * TODO: Look more into this, maybe dbExec should be default? ~ Dien
	 * @param ingredient
	 */
	public void addIngredient(Ingredient ingredient, boolean cond) {
		addIngredient(ingredient);
		dbExec.addIngredientToItem(ingredient);
	}

	/**
	 * Increase the amount of this item in the order
	 * 
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

	public UUID getOrderId() {
		return orderId;
	}

	public void setOrderId(UUID orderId) {
		this.orderId = orderId;
	}

	public int getAmount() {
		return amount;
	}

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

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public ArrayList<Ingredient> getIngredients() {
		return this.ingredients;
	}

	public void setIngredients(ArrayList<Ingredient> ingredients) {
		this.ingredients = new ArrayList<>(ingredients);
	}

	@Override
	public String toString() {
		return name + " x" + (amount + 1);
	}

}
