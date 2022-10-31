package app.requests;

import java.util.ArrayList;

import javafx.util.Pair;

/**
 * Class to store information about new order
 */
public class createOrderRequest {
public String customerName;
	public String serverName;
    public ArrayList<Pair<String, Integer>> items;

	/**
	 * Create new order request
	 * 
	 * @param customerName: name of customer that placed order
	 * @param serverName: name of server associated with order
	 * @param items: list of item names and quantities present in quantity
	 */
	public createOrderRequest(String customerName, String serverName, ArrayList<Pair<String, Integer>> items) {
		this.customerName = customerName; 
		this.serverName = serverName;
		this.items = new ArrayList<>(items);
	}
}