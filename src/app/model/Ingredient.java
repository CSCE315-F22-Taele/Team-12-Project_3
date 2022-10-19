package app.model;

import java.util.UUID;

public class Ingredient implements Comparable {
	private UUID ingredientId;
	private String name;
	private UUID itemId;
	private UUID orderId;
	private int amount;
	private int threshold;

	public Ingredient(UUID ingredientId, String name, UUID itemId, UUID orderId, int amount) {
		this.ingredientId = ingredientId;
		this.name = name;
		this.itemId = itemId;
		this.orderId = orderId;
		this.amount = amount;
		this.threshold = 100; // Default amt
	}

	public Ingredient(UUID ingredientId, String name, UUID itemId, UUID orderId, int amount, int threshold) {
		this(ingredientId, name, itemId, orderId, amount);
		this.threshold = threshold;
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

	public int getThreshold() {
		return this.threshold;
	}

	public void setThreshold(int threshold) {
		this.threshold = threshold;
	}

	@Override
	public int compareTo(Object o) {
		Ingredient other = (Ingredient)o;
		return this.name.compareTo(other.getName());
	}
}
