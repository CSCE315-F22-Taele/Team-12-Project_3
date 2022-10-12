CREATE TABLE user_types (
	id INTEGER PRIMARY KEY,
	type VARCHAR(30) NOT NULL UNIQUE
);
-- static table mapping user type to role
INSERT INTO user_types
	(id, type)
VALUES 
	(0, 'SERVER'),
	(1, 'MANAGER');

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE,
	user_type INTEGER NOT NULL REFERENCES user_types(id) DEFAULT 0,
);

CREATE TABLE credentials (	
	id SERIAL PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE inventory (
	ingredient_id SERIAL PRIMARY KEY,
	ingredient_name VARCHAR(255) NOT NULL UNIQUE,
	quantity INTEGER NOT NULL DEFAULT 0
);

INSERT INTO inventory 
	(ingredient_name, quantity) 
VALUES
	-- ingredients for 'Classic Hamburger'
	('Beef patty', 100),
	('Buns', 100),
	('Avocado', 100),
	-- cheese
	
	-- ingredients for 'Black Bean Burger'
	('Black Bean Patty', 100),
	-- buns
	-- cheese 
	
	-- ingredients for 'Bacon Burger'
	-- buns
	-- cheese
	('Bacon', 100),
	
	-- ingredients for 'Chicken Sandwich'
	-- buns
	('Chicken Breast', 100),

	-- ingredients for 'Gig Em Patty Melt'
	-- buns
	-- beef patty
	('Gig em Sauce', 100),
	('Onion', 100),
	('Swiss-American Cheese', 100),
	
	-- ingredients for 'Chicken Tenders'
	('Chicken tenders', 100),
	('French Fries', 100),
	-- a sauce

	-- sauces
	('Ranch Sauce', 100),
	('BBQ Sauce', 100),
	('Honey Mustard Sauce', 100),
	('Spicy Ranch Sauce', 100),
	('Gle em Sauce', 100),

	-- ingredients for 'Caesar Salad'
	('Lettuce', 100),
	('Grilled Chicken', 100),
	('Parmesan', 100),
	('Garlic', 100),
	('Butter', 100),
	('Croutons', 100),
	('Caesar dressing', 100),
	
	-- ingredients for 'Aggie Shakes'
	-- covered by ingredients for ice cream below
	
	-- ingredients for 'Cookie Sandwich'
	('Chocolate Chip Cookies', 100),

	-- ingredients for 'Fountain Drink'
	('Pepsi', 100),
	('Diet Pepsi', 100),
	
	-- ingredients for 'Ice Cream Cup'
	('Vanilla Ice Cream', 100),
	('Chocolate Ice Cream', 100),
	('Strawberry Ice Cream', 100),

	-- ingredients for 'Utensils'
	('Spoons', 100),
	('Forks', 100),
	('Knives', 100),
	('Plates', 100),
	('Cups', 100),
	('Tissues', 100);

CREATE TABLE menu (
	item_id SERIAL PRIMARY KEY,
	item_name VARCHAR(255) NOT NULL,
	description VARCHAR(1000),
	price FLOAT NOT NULL DEFAULT 0
);

-- Classic Hamburger, Black Bean Burger, Bacon Burger, Chicken Sandwich, Gig Em Patty Melt, Chicken Tenders, Caesar Salad, French Fries, Aggie Shakes, Cookie Sandwich, Fountain Drink, Ice Cream Cup
-- 6.49, 7.29, 7.89, 7.49, 7.09, 7.49, 8.29, 2.69, 4.49, 4.69, 2.45, 3.29

/* 
	name == 'Classic Hamburger'
	name == 'Black Bean Burger'
	name == 'Bacon Burger'
	name == 'Chicken Sandwich'
	name == 'Gig Em Patty Melt'
	name == 'Chicken Tenders'
	name == 'Caesar Salad'
	name == 'French Fries'	
	name == 'Aggie Shakes'
	name == 'Cookie Sandwich'
	name == 'Fountain Drink'
	name == 'Ice Cream Cup'
 */

INSERT INTO menu 
	(item_name, description, price)
VALUES
	('Classic Hamburger', 'Single beef patty topped your way and served on a toasted bun.', 6.49),
	('Black Bean Burger', 'Vegetarian black bean patty topped your way and served on a toasted bun.', 7.29),
	('Bacon Burger', 'Single beet patty topped with smoked bacon and American cheese.', 7.89),
	('Chicken Sandwich', 'Marinated grilled chicken breast topped your way and served on a toasted bun.', 7.49),
	('Gig Em Patty Melt', 'Grilled beef patty topped with gig em sauce, grilled onions, and Swiss-American cheese.', 7.09),
	('Chicken Tenders', '3-piece chicken tenders served with fries and choice of dipping sauce,', 7.49),
	('Caesar Salad', 'Topped with grilled chicken strips and Caesar salad', 8.29),
	('French Fries', 'The perfect side to any meal or shake.', 2.69),
	('Aggie Shakes', 'Chocolate, vanilla, or strawberry milkshake. Made with Hersheys ice cream.', 4.49),
	('Cookie Sandwich', 'Hersheys vanilla ice cream packed between 2 chocolate chip cookies.', 4.69),
	('Fountain Drink', 'Choice of your favorite Pepsi product', 2.45),
	('Ice Cream Cup', 'Double scoop of vanilla, chocolate, or strawberry Hersheys Ice Cream.' , 3.29);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	customerName VARCHAR(255) NOT NULL,
	server_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
	time_ordered TIMESTAMP WITHOUT time zone NOT NULL DEFAULT now(),
	is_served BOOLEAN NOT NULL DEFAULT false,
	price FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE items (
	item_name VARCHAR(255) NOT NULL,
	id SERIAL REFERENCES menu(item_id) ON DELETE CASCADE,
	order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
	quantity INTEGER NOT NULL DEFAULT 0,

	PRIMARY KEY(id, order_id)
);

CREATE TABLE ingredients (
	ingredient_name varchar(255) NOT NULL,
	ingredient_id SERIAL REFERENCES inventory(ingredient_id) ON DELETE CASCADE,
	item_id SERIAL REFERENCES items(id) ON DELETE CASCADE,
	order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
	amount_per_order INTEGER NOT NULL DEFAULT 0,

	PRIMARY KEY(ingredient_id, item_id, order_id)
);

-- grant privileges to all users for all tables
GRANT ALL ON TABLE user_types to public;
GRANT ALL ON TABLE users to public;
GRANT ALL ON TABLE credentials to public;
GRANT ALL ON TABLE orders to public;
GRANT ALL ON TABLE inventory to public;
GRANT ALL ON TABLE menu to public;
GRANT ALL ON TABLE items to public;
GRANT ALL ON TABLE ingredients to public;
