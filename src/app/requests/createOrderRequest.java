package app.requests;

import java.util.ArrayList;

import app.model.Item;

public class createOrderRequest {
	public String customerName;
	public int serverId;
    public ArrayList<Item> items;

	public createOrderRequest(String customerName, int serverId, ArrayList<Item> items) {
		this.customerName = customerName; 
		this.serverId = serverId;
		this.items = new ArrayList<>(items);
	}
}
