-- Getting items and their associated ingredients
SELECT menu.item_name, inventory.ingredient_name FROM menu
LEFT JOIN menu_inventory ON menu.item_id = menu_inventory.item_id
LEFT JOIN inventory ON menu_inventory.ingredient_id = inventory.ingredient_id
;

