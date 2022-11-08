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
    menu.item_name,
    sum(order_menu.quantity) as sales, 
    sum(order_menu.total_price) as revenue
FROM menu 
LEFT OUTER JOIN order_menu ON menu.item_id = order_menu.item_id
LEFT OUTER JOIN orders ON 
    orders.id = order_menu.order_id AND 
    orders.time_ordered >= timestamp '2022-10-30' AND 
    orders.time_ordered <= timestamp '2022-11-07'
GROUP BY menu.item_id
ORDER BY menu.item_name
;

-- Excess Report
SELECT 
    DISTINCT(m.item_id),
    m.item_name, 
    COALESCE(SUM(omAfterTime.quantity), 0) item_sales
FROM menu m
LEFT JOIN 
    (
        SELECT * FROM orders o
        LEFT JOIN order_menu om ON
            o.id = om.order_id
        WHERE o.time_ordered >= timestamp '2022-11-01'
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
    SUM(omAfterTime.quantity) < i.quantity*.1 OR
    SUM(omAfterTime.quantity) IS NULL
ORDER BY
    m.item_name ASC
;

-- Query inventory
UPDATE inventory i
SET quantity = quantity - 5
WHERE 
    i.ingredient_id IN (
        SELECT i.ingredient_id 
        FROM orders o
        LEFT JOIN order_menu om
        ON o.id = om.order_id
            AND o.id = '1'
        LEFT JOIN menu_inventory mi
        ON om.item_id = mi.item_id
        LEFT JOIN inventory i
        ON mi.ingredient_id = i.ingredient_id
    )
;
