package app.requests;

import java.util.ArrayList;
import java.util.UUID;

import app.model.Item;
import javafx.util.Pair;

public class createOrderRequest {
	public String customerName;
	public String serverName;
    public ArrayList<Pair<String, Integer>> items;

	public createOrderRequest(String customerName, String serverName, ArrayList<Pair<String, Integer>> items) {
		this.customerName = customerName; 
		this.serverName = serverName;
		this.items = new ArrayList<>(items);
	}
}
