package app.requests;

import java.util.ArrayList;
import java.util.UUID;

import app.model.Item;

public class createOrderRequest {
	public String customerName;
	public UUID serverId;
    public ArrayList<Item> items;

	public createOrderRequest(String customerName, UUID serverId, ArrayList<Item> items) {
		this.customerName = customerName; 
		this.serverId = serverId;
		this.items = new ArrayList<>(items);
	}
}
