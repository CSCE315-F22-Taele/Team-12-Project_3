package auth;

import java.sql.Timestamp;

class Ingredient {
	private int ingredientId;
	private String name;
	private int orderId;
	private int amount;
}

class Item {
	private int itemId;
	private String name;
	private int orderId;
	private int amount;
	private Ingredient[] ingredients;
}

class Order {
	private int orderId;
	private String customerName;
	private int serverId;
	private Timestamp timeOrdered;
	private boolean isServed;
	private float price;
	private Item[] items;

	public Order(String customerName, int serverId, Timestamp timeOrdered, boolean isServed, float price) {
		this.customerName = customerName;
		this.serverId = serverId;
		this.timeOrdered = timeOrdered;
		this.isServed = isServed;
		this.price = price;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public int getServerId() {
		return serverId;
	}

	public void setServerId(int serverId) {
		this.serverId = serverId;
	}

	public Timestamp getTimeOrdered() {
		return timeOrdered;
	}

	public void setTimeOrdered(Timestamp timeOrdered) {
		this.timeOrdered = timeOrdered;
	}

	public boolean isServed() {
		return isServed;
	}

	public void setServed(boolean isServed) {
		this.isServed = isServed;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}
}
