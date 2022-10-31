package app.model;

import java.util.UUID;

/**
 * Store ingredients present per item per order
 */
public class Ingredient implements Comparable {
	private UUID ingredientId;
	private String name;
	private UUID itemId;
	private UUID orderId;
	private int amount;
	private int threshold;

	/**
	 * Create a new Ingredient object based on the parameters that define it
	 * Default constructor, instantiates threshold to 100
	 * 
	 * @param ingredientId
	 * @param name
	 * @param itemId
	 * @param orderId
	 * @param amount
	 */
	public Ingredient(UUID ingredientId, String name, UUID itemId, UUID orderId, int amount) {
		this.ingredientId = ingredientId;
		this.name = name;
		this.itemId = itemId;
		this.orderId = orderId;
		this.amount = amount;
		this.threshold = 100; // Default amt
	}

	/**
	 * Create a new Ingredient object, this time providing the threshold to create
	 * 
	 * @param ingredientId 
	 * @param name 
	 * @param itemId
	 * @param orderId
	 * @param amount
	 * @param threshold
	 */
	public Ingredient(UUID ingredientId, String name, UUID itemId, UUID orderId, int amount, int threshold) {
		this(ingredientId, name, itemId, orderId, amount);
		this.threshold = threshold;
	}

	/**
	 * Get ID of ingredient
	 * 
	 * @return ingredient's unique ID
	 */
	public UUID getIngredientId() {
		return ingredientId;
	}

	/**
	 * Get name of ingredient
	 * 
	 * @return ingredient's unique name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set name of ingredient
	 * 
	 * @param name name to set 
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Get ingredient's item
	 * 
	 * @return item to which this ingredient belongs
	 */
	public UUID getItemId() {
		return itemId;
	}

	/**
	 * Set ingredient's item
	 * 
	 * @param itemId item to set ingredient ownership to
	 */
	public void setItemId(UUID itemId) {
		this.itemId = itemId;
	}

	/**
	 * Get item's order
	 * 
	 * @return order to which the item belongs
	 */
	public UUID getOrderId() {
		return orderId;
	}

	/**
	 * Set item's order
	 * 
	 * @param orderId order to set item ownership to
	 */
	public void setOrderId(UUID orderId) {
		this.orderId = orderId;
	}

	/**
	 * Get amount of ingredient per item
	 * 
	 * @return quantity of this ingredient in the item
	 */
	public int getAmount() {
		return amount;
	}

	/**
	 * Set amount of ingredient per item
	 * 
	 * @param amount amount to which to set quantity of ingredient in item
	 */
	public void setAmount(int amount) {
		this.amount = amount;
	}

	/**
	 * Get value below which ingredient should be restocked
	 * 
	 * @return minimum amount of ingredient to be kept in inventory at all times
	 */
	public int getThreshold() {
		return this.threshold;
	}

	/**
	 * Set lower bound for ingredient quantity
	 * 
	 * @param threshold value to which to set minimum threshold
	 */
	public void setThreshold(int threshold) {
		this.threshold = threshold;
	}

	@Override
	public int compareTo(Object o) {
		Ingredient other = (Ingredient)o;
		return this.name.compareTo(other.getName());
	}
}
