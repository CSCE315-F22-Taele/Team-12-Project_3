package app.model;

import java.util.ArrayList;
import java.util.UUID;

import java.sql.Timestamp;

/**
 * Store all information about an order
 */
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
		this.price += item.getTotalPrice();
	}

	/**
	 * Remove an item from the order
	 * 
	 * @param itemId: item to remove
	 */
	public void removeItem(UUID itemId) {
		Item itemToRemove = findItem(itemId);
		items.remove(itemToRemove);

		this.price -= itemToRemove.getTotalPrice();
	}

	/**
	 * Find existing item in the order, else throw an exception
	 * 
	 * @param itemId: item to find
	 * @return: relevant item if found, otherwise throw exception
	 */
	public Item findItem(UUID itemId) {
		for (Item item : items) {
			if (item.getItemId().toString().equals(itemId.toString())) {
				return item;
			}
		}

		throw new RuntimeException("Item not found: " + itemId);
	}

	/**
	 * Set order's ID
	 * 
	 * @param orderId: new ID to set
	 */
	public void setOrderId(UUID orderId) {
		this.orderId = orderId;
	}

	/**
	 * Get order's ID
	 * 
	 * @return: order's unique ID
	 */
	public UUID getOrderId() {
		return orderId;
	}

	/**
	 * Get customer's name that placed the order
	 * 
	 * @return: unique customer name
	 */
	public String getCustomerName() {
		return customerName;
	}

	/**
	 * Set customer's name
	 * 
	 * @param customerName: new customer name
	 */
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * Get server who is responsible for order
	 * 
	 * @return: server's ID
	 */
	public UUID getServerId() {
		return serverId;
	}

	/**
	 * Set server who is responsible for order
	 * 
	 * @param serverId: new server ID
	 */
	public void setServerId(UUID serverId) {
		this.serverId = serverId;
	}

	/**
	 * Get time that order was placed
	 * 
	 * @return: timestamp when order was placed
	 */
	public Timestamp getTimeOrdered() {
		return timeOrdered;
	}

	/**
	 * Set time order was placed
	 * 
	 * @param timeOrdered: new timestamp to set to
	 */
	public void setTimeOrdered(Timestamp timeOrdered) {
		this.timeOrdered = timeOrdered;
	}

	/**
	 * Get whether order has been served or not
	 * 
	 * @return: whether order has been served
	 */
	public boolean isServed() {
		return isServed;
	}

	public void setServed(boolean isServed) {
		this.isServed = isServed;
	}

	/**
	 * Get total price of order
	 * 
	 * @return: order's price
	 */
	public double getPrice() {
		return price;
	}

	/**
	 * Set total price of order
	 * 
	 * @param price: new price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}

	/**
	 * Set list of items in order
	 * 
	 * @param newItems: new list of items
	 */
	public void setItems(ArrayList<Item> newItems) {
		for (Item item : newItems) {
			this.addItem(item);
		}
	}

	/**
	 * Get total list of items in order
	 * 
	 * @return: order's item lists
	 */
	public ArrayList<Item> getItems() {
		return items;
	}

	@Override
	public String toString() {
		return String.format("orderId: %s\ncustomerName: %s\nitems: %s\ntimeOrdered: %s\nprice: $%.2f", 
		this.orderId, this.customerName, this.items.toString(), this.timeOrdered.toString(), this.price);
	}
}
