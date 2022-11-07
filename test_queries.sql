-- Getting items and their associated ingredients
SELECT menu.item_name, inventory.ingredient_name FROM menu
LEFT JOIN menu_inventory ON menu.item_id = menu_inventory.item_id
LEFT JOIN inventory ON menu_inventory.ingredient_id = inventory.ingredient_id
;

-- Getting orders and their associated ingredients
SELECT order.id, order.customer_name, menu.item_name FROM menu
LEFT JOIN order_menu ON order_menu.order_id = order.id
LEFT JOIN menu ON order_menu.item_id = menu.item_id
-- LEFT JOIN menu_inventory ON menu_inventory.ingredient_id = menu.item_id
-- LEFT JOIN inventory ON inventory.ingredient_id = menu_inventory.ingredient_id
;


-- Sales Report
SELECT 
    om.item_id, 
    m.item_name, 
    SUM(om.quantity) sales, 
    SUM(om.total_price) profit 
FROM order_menu om
LEFT JOIN 
    menu m 
ON 
    om.item_id = m.item_id
GROUP BY 
    om.item_id, 
    m.item_name
;


-- Excess Report
SELECT 
    DISTINCT(m.item_id), m.item_name
FROM 
    orders o
LEFT JOIN order_menu om ON 
    o.id = om.order_id AND
    o.time_ordered > '2020-09-05'
LEFT JOIN menu m ON 
    om.item_id = m.item_id
LEFT JOIN menu_inventory mi ON 
    m.item_id = mi.item_id
LEFT JOIN inventory i ON 
    mi.ingredient_id = i.ingredient_id
GROUP BY 
    i.ingredient_id, 
    m.item_id
HAVING SUM(om.quantity) < i.quantity
;


SELECT 
    i.ingredient_name, 
    m.item_name, 
    SUM(omAfterTime.quantity) item_sales
FROM menu m
LEFT JOIN 
    (
        SELECT * FROM orders o
        LEFT JOIN order_menu om ON
            o.id = om.order_id
        WHERE o.time_ordered > timestamp '2022-11-01'
    ) omAfterTime
ON
    m.item_id = omAfterTime.item_id
LEFT JOIN menu_inventory mi ON 
    m.item_id = mi.item_id
LEFT JOIN inventory i ON
    mi.ingredient_id = i.ingredient_id
GROUP BY
    i.ingredient_id,
    m.item_id
HAVING
    SUM(omAfterTime.quantity) < i.quantity OR
    SUM(omAfterTime.quantity) IS NULL
;