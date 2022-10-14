package app.requests;

import java.util.ArrayList;
import java.util.UUID;

import app.model.Item;
import javafx.util.Pair;

public class createOrderRequest {
	public String customerName;
	public int serverId;
    public ArrayList<Pair<String, Integer>> items;

	public createOrderRequest(String customerName, int serverId, ArrayList<Pair<String, Integer>> items) {
		this.customerName = customerName; 
		this.serverId = serverId;
		this.items = new ArrayList<>(items);
	}
}
