package app.service;

import app.model.Ingredient;
import app.model.Item;
import app.model.Order;
import app.repository.dbExec;
import app.requests.createOrderRequest;

public class Server {
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
