package app.model;

import java.util.UUID;

public class Menu {
    public static final Item classicHamburger = 
                    new Item(UUID.randomUUID(), "Classic Hamburger", UUID.fromString(""), 100, 6.49);

    classicHamburger.addIngredient(Inventory.beefPatty);
    classicHamburger.addIngredient(Inventory.buns);
    classicHamburger.addIngredient(Inventory.avocado);


    public static final Item blackBeanBurger = 
                    new Item(UUID.randomUUID(), "Black Bean Hamburger", UUID.fromString(""), 100, 7.29);

    blackBeanBurger.addIngredient(Inventory.blackBeanPatty);

    public static final Item baconBurger = 
                    new Item(UUID.randomUUID(), "Bacon Burger", UUID.fromString(""), 100, 7.89);

    baconBurger.addIngredient(Inventory.bacon);
    
    public static final Item chickenSandwich = 
                    new Item(UUID.randomUUID(), "Chicken Sanndwich", UUID.fromString(""), 100, 7.49);

    chickenSandwich.addIngredient(Inventory.chickenBreast);

    public static final Item gigEmPattyMelt = 
                    new Item(UUID.randomUUID(), "Gig Em Patty Melt", UUID.fromString(""), 100, 7.09);
        
    gigEmPattyMelt.addIngredient(Inventory.gigEmSauce);
    gigEmPattyMelt.addIngredient(Inventory.swissChess);
    gigEmPattyMelt.addIngredient(Inventory.onion);


    public static final Item chickenTenders = 
                    new Item(UUID.randomUUID(), "Chicken Tenders", UUID.fromString(""), 100, 7.49);
    
    chickenTenders.addIngredient(Inventory.chickenTenders);
    chickenTenders.addIngredient(Inventory.frenchFries);


    public static final Item caesarSalad = 
                    new Item(UUID.randomUUID(), "Caesar Salad", UUID.fromString(""), 100, 8.29);

    caesarSalad.addIngredient(Inventory.lettuce);
    caesarSalad.addIngredient(Inventory.grilledChicken);
    caesarSalad.addIngredient(Inventory.parmesan);
    caesarSalad.addIngredient(Inventory.garlic);
    caesarSalad.addIngredient(Inventory.butter);
    caesarSalad.addIngredient(Inventory.croutons);
    caesarSalad.addIngredient(Inventory.caesarDressing);


    public static final Item frenchFries = 
                    new Item(UUID.randomUUID(), "French Fries", UUID.fromString(""), 100, 2.69);

    frenchFries.addIngredient(Inventory.frenchFries);

    public static final Item vanillaAggieShake = 
                    new Item(UUID.randomUUID(), "Vanilla Aggie Shake", UUID.fromString(""), 100, 4.49);

    vanillaAggieShake.addIngredient(vanillaIce);

    public static final Item chocolateAggieShake = 
                    new Item(UUID.randomUUID(), "Chocolate Aggie Shake", UUID.fromString(""), 100, 4.49);

    chocolateAggieShake.addIngredient(chocolateIce);

    public static final Item strwaberryAggieShake = 
                    new Item(UUID.randomUUID(), "Strawberry Aggie Shake", UUID.fromString(""), 100, 4.49);

    strwaberryAggieShake.addIngredient(strawberryIce);
    


    public static final Item cookieSandwich = 
                    new Item(UUID.randomUUID(), "Cookie Sandwich", UUID.fromString(""), 100, 4.69);
    
    cookieSandwich.addIngredient(Inventory.chocolateChipCookies);
                    
    public static final Item pepsi = 
                    new Item(UUID.randomUUID(), "Pepsi", UUID.fromString(""), 100, 2.45);

    pepsi.addIngredient(Inventory.pepsi);

    public static final Item dietPepsi = 
                    new Item(UUID.randomUUID(), "Diet Pepsi", UUID.fromString(""), 100, 2.45);

    dietPepsi.addIngredient(Inventory.dietPepsi);
                
    public static final Item vanillaIce = 
                    new Item(UUID.randomUUID(), "Vanilla Ice Cream Cup", UUID.fromString(""), 100, 3.29);
    
    vanillaIce.addIngredient(Inventory.vanillaIce);
    
    public static final Item chocolateIce = 
    new Item(UUID.randomUUID(), "Chocolate Ice Cream Cup", UUID.fromString(""), 100, 3.29);

    chocolateIce.addIngredient(Inventory.chocolateIce);
    
    public static final Item strawberryIce = 
    new Item(UUID.randomUUID(), "Strawberry Ice Cream Cup", UUID.fromString(""), 100, 3.29);

    strawberryIce.addIngredient(Inventory.strawberryIce);

    public static final Item ranchSauce = 
    new Item(UUID.randomUUID(), "Ranch Sauce", UUID.fromString(""), 100, 0);

    ranchSauce.addIngredient(Inventory.ranchSauce);

    public static final Item bbqSauce = 
    new Item(UUID.randomUUID(), "BBQ Sauce", UUID.fromString(""), 100, 0);

    bbqSauce.addIngredient(Inventory.bbqSauce);

    public static final Item honeyMustardSauce = 
    new Item(UUID.randomUUID(), "Honey Mustard Sauce", UUID.fromString(""), 100, 0);

    honeyMustardSauce.addIngredient(Inventory.honeyMustardSauce);

    public static final Item spicyRanchSauce = 
    new Item(UUID.randomUUID(), "Spicy Ranch Sauce", UUID.fromString(""), 100, 0);

    spicyRanchSauce.addIngredient(Inventory.spicyRanchSauce);
    
    public static final Item gleEmSauce = 
    new Item(UUID.randomUUID(), "Gle em Sauce", UUID.fromString(""), 100, 0);

    gleEmSauce.addIngredient(Inventory.gleEmSauce);
}
