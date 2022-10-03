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
	user_type INTEGER NOT NULL REFERENCES user_types(id) DEFAULT 0,
	username VARCHAR(50) UNIQUE
);

CREATE TABLE credentials (
	id SERIAL PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    server_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    time_ordered TIMESTAMP WITHOUT time zone NOT NULL DEFAULT now(),
    is_served BOOLEAN NOT NULL DEFAULT false,
	price FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE inventory (
	ingredient_id SERIAL PRIMARY KEY,
	ingredient_name VARCHAR(255) NOT NULL,
	quantity INTEGER NOT NULL DEFAULT 0
);

INSERT INTO inventory
	(ingredient_id, ingredient_name, quantity)
VALUES			-- TODO: finish inventory items
	();

CREATE TABLE menu (
	item_id SERIAL PRIMARY KEY,
	item_name VARCHAR(255) NOT NULL,
	description VARCHAR(200),
	price FLOAT NOT NULL DEFAULT 0
);

INSERT INTO menu 
	(item_name, description, price)
VALUES
	("Classic Hamburger", "Single beef patty topped your way and served on a toasted bun.", 6.49),
	("Cheeseburger", "Single beef patty topped with American cheese and served on a toasted bun.", 6.99),
	("Black Bean Burger", "Vegetarian black bean patty topped your way and served on a toasted bun.", 7.29)
	("Bacon Burger", "Single beet patty topped with smoked bacon and American cheese.", 7.89),
	("Chicken Sandwich", "Marinated grilled chicken breast topped your way and served on a toasted bun.", 7.49),
	("Gig 'Em Patty Melt", "Grilled beef patty topped with gig 'em sauce, grilled onions, and Swiss-American cheese.", 7.09),
	("Chicken Tenders", "3-piece chicken tenders served with fries and choice of dipping sauce,", 7.49),
	("Caesar Salad", "Topped with grilled chicken strips and Caesar salad", 8.29),
	("French Fries", "The perfect side to any meal or shake.", 2.69),
	("Aggie Shakes", "Chocolate, vanilla, or strawberry milkshake. Made with Hershey's ice cream.", 4.49),
	("Cookie Sandwich", "Hershey's vanilla ice cream packed between 2 chocolate chip cookies.", 4.69),
	("Fountain Drink", "Choice of your favorite Pepsi product", 2.45),
	("Ice Cream Cup", "Double scoop of vanilla, chocolate, or strawberry Hershey's Ice Cream." , 3.29);

CREATE TABLE items (
	id SERIAL UNIQUE REFERENCES menu(item_id) ON DELETE CASCADE,
	order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
	quantity INTEGER NOT NULL DEFAULT 0,

	PRIMARY KEY(id, order_id)
);

CREATE TABLE ingredients (
	ingredient_id SERIAL REFERENCES inventory(ingredient_id) ON DELETE CASCADE,
	item_id SERIAL REFERENCES items(id) ON DELETE CASCADE,
	order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
	quantity INTEGER NOT NULL DEFAULT 0,

	PRIMARY KEY(ingredient_id, item_id, order_id)
);

INSERT INTO inventory 
	(ingredient_name, quantity) 
VALUES 
	('whatever', 1),
	('whatever1', 1),
	('whatever2', 1),
	('whatever4', 1),
	('whatever3', 1);

-- grant privileges to all users for all tables
GRANT ALL ON TABLE user_types to public;
GRANT ALL ON TABLE users to public;
GRANT ALL ON TABLE credentials to public;
GRANT ALL ON TABLE orders to public;
GRANT ALL ON TABLE inventory to public;
GRANT ALL ON TABLE menu to public;
GRANT ALL ON TABLE items to public;
GRANT ALL ON TABLE ingredients to public;