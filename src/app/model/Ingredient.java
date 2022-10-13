package app.model;

import java.util.UUID;

public class Ingredient {
	private UUID ingredientId;
	private String name;
	private UUID itemId;
	private UUID orderId;
	private int amount;

	public Ingredient(UUID ingredientId, String name, UUID itemId, UUID orderId, int amount) {
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

	public UUID getItemId() {
		return itemId;
	}

	public void setItemId(UUID itemId) {
		this.itemId = itemId;
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
	}
}
