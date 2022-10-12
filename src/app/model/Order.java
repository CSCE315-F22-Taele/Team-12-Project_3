package app.model;

import java.util.UUID;
import java.sql.Timestamp;

public class Order {
	private UUID orderId;
	private String customerName;
	private int serverId;
	private Timestamp timeOrdered;
	private boolean isServed;
	private float price;
	private Item[] items;

	public Order(String customerName, int serverId) {
		orderId = UUID.randomUUID();
		this.customerName = customerName;
		this.serverId = serverId;
		this.timeOrdered = new Timestamp(System.currentTimeMillis());
		this.isServed = false;
	}

	public UUID getOrderId() {
		return orderId;
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

	public Item[] getItems() {
		return items;
	}

	public void setItems(Item[] items) {
		this.items = items;
	}
}
