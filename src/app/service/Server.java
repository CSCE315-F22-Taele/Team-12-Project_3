package app.service;

import java.util.ArrayList;

import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.repository.dbExec;
import app.requests.createOrderRequest;
import javafx.util.Pair;

public class Server {

	private static ArrayList<Pair<String, Integer>> cart;

	public static void initializeCart(){
		cart = new ArrayList<Pair<String, Integer>>();
	}

	public static void addToCart(String itemName, int amount){
		cart.add(new Pair<String, Integer>(itemName, amount));
	}

	public static void clearCart(){
		cart.clear();
	}

	public static ArrayList<Pair<String, Integer>> getCart(){
		return cart;
	}

	public Order createOrder(createOrderRequest request) {
		Order order = new Order(request.customerName, request.serverId);
		order.setItems(request.items);

		dbExec.addOrder(order);
		for (Item item : order.getItems()) {
			
			dbExec.addItemToOrder(item);
			for (Ingredient ingredient: item.getIngredients()) {
				dbExec.addIngredientToItem(ingredient);

				Ingredient curr = dbExec.getInventoryByIngredient(ingredient.getName());
				int leftAmount = curr.getAmount() - ingredient.getAmount();

				dbExec.updateIngredientInInventory(ingredient.getIngredientId(), leftAmount);
			}
		}
		return order;
	}
}
