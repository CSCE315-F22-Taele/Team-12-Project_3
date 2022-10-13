package app.service;

import java.util.ArrayList;
import java.util.UUID;

import app.model.Ingredient;
import app.repository.dbExec;

public class Inventory {
	public static boolean isLoaded = false;
	public static final Ingredient beefPatty = new Ingredient(UUID.randomUUID(), "Beef patty", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient buns = new Ingredient(null, "Buns", UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient avocado = new Ingredient(UUID.randomUUID(), "Avocado", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient swissCheese = new Ingredient(UUID.randomUUID(), "Swiss-American Cheese",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient parmesan = new Ingredient(UUID.randomUUID(), "Parmesan", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient bacon = new Ingredient(UUID.randomUUID(), "Bacon", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient chickenBreast = new Ingredient(UUID.randomUUID(), "Chicken Breast",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient gigEmSauce = new Ingredient(UUID.randomUUID(), "Gig em Sauce", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient onion = new Ingredient(UUID.randomUUID(), "Onion", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient chickenTenders = new Ingredient(UUID.randomUUID(), "Chicken tenders",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient frenchFries = new Ingredient(UUID.randomUUID(), "French Fries", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient ranchSauce = new Ingredient(UUID.randomUUID(), "Ranch Sauce", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient bbqSauce = new Ingredient(UUID.randomUUID(), "BBQ Sauce", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient honeyMustardSauce = new Ingredient(UUID.randomUUID(), "Honey Mustard Sauce",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient spicyRanchSauce = new Ingredient(UUID.randomUUID(), "Spicy Ranch Sauce",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient gleEmSauce = new Ingredient(UUID.randomUUID(), "Gle Em Sauce", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient lettuce = new Ingredient(UUID.randomUUID(), "Lettuce", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient grilledChicken = new Ingredient(UUID.randomUUID(), "Lettuce", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient garlic = new Ingredient(UUID.randomUUID(), "Garlic", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient butter = new Ingredient(UUID.randomUUID(), "Butter", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient croutons = new Ingredient(UUID.randomUUID(), "Croutons", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient caesarDressing = new Ingredient(UUID.randomUUID(), "Caesar Dressing",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient chocolateChip = new Ingredient(UUID.randomUUID(), "Chocolate Chip Cookies",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient pepsi = new Ingredient(UUID.randomUUID(), "Pepsi", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient vanillaIce = new Ingredient(UUID.randomUUID(), "Vanilla Ice Cream",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient chocolateIce = new Ingredient(UUID.randomUUID(), "Chocolate Ice Cream",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient strawberryIce = new Ingredient(UUID.randomUUID(), "Strawberry Ice Cream",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient spoons = new Ingredient(UUID.randomUUID(), "Spoons", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient forks = new Ingredient(UUID.randomUUID(), "Forks", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient knives = new Ingredient(UUID.randomUUID(), "Knives", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient plates = new Ingredient(UUID.randomUUID(), "Plates", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient cups = new Ingredient(UUID.randomUUID(), "Cups", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient tissues = new Ingredient(UUID.randomUUID(), "Tissues", UUID.fromString(""),
			UUID.fromString(""), 100);
	public static final Ingredient blackBeanPatty = new Ingredient(UUID.randomUUID(), "Black Bean Patty",
			UUID.fromString(""), UUID.fromString(""), 100);
	public static final Ingredient dietPepsi = new Ingredient(UUID.randomUUID(), "Diet Pepsi", UUID.fromString(""),
			UUID.fromString(""), 100);

	public static final ArrayList<Ingredient> list = new ArrayList<Ingredient>();

	public static void addIngredients() {
	
		if(!dbExec.isInventoryEmpty()) {
			return;
		}
		list.add(beefPatty);
		list.add(buns);
		list.add(avocado);
		list.add(swissCheese);
		list.add(parmesan);
		list.add(bacon);
		list.add(chickenBreast);
		list.add(gigEmSauce);
		list.add(onion);
		list.add(chickenTenders);
		list.add(frenchFries);
		list.add(ranchSauce); 
		list.add(bbqSauce);
		list.add(honeyMustardSauce);
		list.add(spicyRanchSauce);
		list.add(gleEmSauce);
		list.add(lettuce);
		list.add(grilledChicken);
		list.add(garlic);
		list.add(butter);
		list.add(croutons);
		list.add(caesarDressing);
		list.add(chocolateChip);
		list.add(pepsi);
		list.add(vanillaIce);
		list.add(chocolateIce);
		list.add(strawberryIce);
		list.add(spoons);
		list.add(forks);
		list.add(knives);
		list.add(plates);
		list.add(cups);
		list.add(tissues);
		list.add(blackBeanPatty);
		list.add(dietPepsi);

		for(Ingredient ingredient : list) {
			dbExec.addIngredientToInventory(ingredient);
		}
	}
}
