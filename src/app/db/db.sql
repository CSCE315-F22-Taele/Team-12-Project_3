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
	id VARCHAR(36) PRIMARY KEY,
	username VARCHAR(50) UNIQUE,
	user_type INTEGER NOT NULL REFERENCES user_types(id) DEFAULT 0
);

CREATE TABLE credentials (	
	id VARCHAR(36) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE inventory (
	ingredient_id VARCHAR(36) PRIMARY KEY,
	ingredient_name VARCHAR(255) NOT NULL UNIQUE,
	quantity INTEGER NOT NULL DEFAULT 0,
);

CREATE TABLE menu (
	item_id VARCHAR(36) PRIMARY KEY,
	item_name VARCHAR(255) NOT NULL UNIQUE,
	description VARCHAR(1000),
	price FLOAT NOT NULL DEFAULT 0,
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

CREATE TABLE orders (
	id VARCHAR(36) PRIMARY KEY,
	customerName VARCHAR(255) NOT NULL,
	server_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
	time_ordered TIMESTAMP WITHOUT time zone NOT NULL DEFAULT now(),
	is_served BOOLEAN NOT NULL DEFAULT false,
	price FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE items (
	id VARCHAR(36) UNIQUE REFERENCES menu(item_id) ON DELETE CASCADE,
	item_name VARCHAR(255) NOT NULL,
	order_id VARCHAR(36) REFERENCES orders(id) ON DELETE CASCADE,
	quantity INTEGER NOT NULL DEFAULT 0,
	total_price FLAT NOT NULL DEFAULT 0,

	PRIMARY KEY(id, order_id)
);

CREATE TABLE ingredients (
	ingredient_id VARCHAR(36) REFERENCES inventory(ingredient_id) ON DELETE CASCADE,
	ingredient_name varchar(255) NOT NULL,
	item_id VARCHAR(36) REFERENCES items(id) ON DELETE CASCADE,
	order_id VARCHAR(36) REFERENCES orders(id) ON DELETE CASCADE,
	amount INTEGER NOT NULL DEFAULT 0,

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
