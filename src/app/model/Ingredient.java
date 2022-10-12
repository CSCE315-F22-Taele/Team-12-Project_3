package app.model;

import java.util.UUID;

public class Ingredient {
	private UUID ingredientId;
	private String name;
	private int itemId;
	private int orderId;
	private int amount;

	public Ingredient(UUID ingredientId, String name, int itemId, int orderId, int amount) {
		this.ingredientId = ingredientId;
		this.name = name;
		this.itemId = itemId;
		this.orderId = orderId;
		this.amount = amount;
	}

	public UUID getIngredientId() {
		return ingredientId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
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
}
