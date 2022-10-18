package app.model;

import java.util.ArrayList;
import java.util.UUID;

import javafx.util.Pair;

import java.sql.Timestamp;

public class Order {
	private UUID orderId;
	private String customerName;
	private UUID serverId;
	private Timestamp timeOrdered;
	private boolean isServed;
	private double price;
	private ArrayList<Item> items;

	/**
	 * Initializes a new Order
	 * 
	 * @param customerName
	 * @param serverId
	 */
	public Order(String customerName, UUID serverId) {
		orderId = UUID.randomUUID();
		this.customerName = customerName;
		this.serverId = serverId;
		this.timeOrdered = new Timestamp(System.currentTimeMillis());
		this.isServed = false;
		this.items = new ArrayList<>();
		this.price = 0.0;
	}

	/**
	 * Mark order as served
	 */
	public void serveOrder() {
		this.isServed = true;
	}

	/**
	 * Add a new item to the order or increase item amount if already in the order
	 * 
	 * @param item
	 */
	public void addItem(Item item) {
		Item existingItem;
		try {
			existingItem = findItem(item.getItemId());
			existingItem.setAmount(existingItem.getAmount() + item.getAmount());
			existingItem.setTotalPrice(existingItem.getTotalPrice() + item.getTotalPrice());

			item = existingItem;
		} catch (Exception e) {
			items.add(item);
		}

		this.price = item.getTotalPrice();
	}

	/**
	 * Remove an item from the order
	 * 
	 * @param itemId
	 */
	public void removeItem(UUID itemId) {
		Item itemToRemove = findItem(itemId);
		items.remove(itemToRemove);

		this.price -= itemToRemove.getTotalPrice();
	}

	/**
	 * Find existing item in the order, else throw an exception
	 * 
	 * @param itemId
	 * @return
	 */
	public Item findItem(UUID itemId) {
		for (Item item : items) {
			if (item.getItemId().toString().equals(itemId.toString())) {
				return item;
			}
		}

		throw new RuntimeException("Item not found: " + itemId);
	}

	public void setOrderId(UUID orderId) {
		this.orderId = orderId;
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

	public UUID getServerId() {
		return serverId;
	}

	public void setServerId(UUID serverId) {
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public void setItems(ArrayList<Item> newItems) {
		for (Item item : newItems) {
			this.addItem(item);
		}
	}

	public ArrayList<Item> getItems() {
		return items;
	}

	@Override
	public String toString() {
		return "orderId: " + orderId + "\ncustomerName: " + customerName
				+ "\nitems: " + items.toString() + "\ntimeOrdered: " + timeOrdered + "\nprice: $" + this.price;
	}
}
