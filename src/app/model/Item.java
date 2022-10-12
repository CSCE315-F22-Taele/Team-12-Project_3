package app.model;

import java.util.UUID;

public class Item {
	private UUID itemId;
	private String name;
	private int orderId;
	private int amount;
	private Ingredient[] ingredients;

	public Item(UUID itemId, String name, int orderId, int amount, Ingredient[] ingredients) {
		this.itemId = itemId;
		this.name = name;
		this.orderId = orderId;
		this.amount = amount;
		this.ingredients = ingredients;
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

	public Ingredient[] getIngredients() {
		return ingredients;
	}

	public void setIngredients(Ingredient[] ingredients) {
		this.ingredients = ingredients;
	}
}
