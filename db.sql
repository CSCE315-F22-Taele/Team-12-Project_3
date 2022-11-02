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

INSERT INTO users (id, username, user_type)
VALUES
	('74bfa9a8-7c52-4eaf-b7de-107c980751c4', 'akash_jothi', 0),
	('297a3fb9-05b5-44a0-8aca-2b6accefb80f', 'chris_anand', 0),
	('f73967b2-b0e7-4701-bfb9-52431c958058', 'senhe_hao', 0),
	('c478e89b-4dfe-4896-a019-87dfea248bc8', 'paul_taele', 1),
	('e0b64984-c4d7-401e-beaf-1f72d9591f8a', 'a', 1);

CREATE TABLE credentials (	
	id VARCHAR(36) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
	password VARCHAR(255) NOT NULL
);

INSERT INTO credentials (id, password)
VALUES
	('74bfa9a8-7c52-4eaf-b7de-107c980751c4', 'communication'),
	('297a3fb9-05b5-44a0-8aca-2b6accefb80f', 'refactoring'),
	('f73967b2-b0e7-4701-bfb9-52431c958058', 'accessibility'),
	('c478e89b-4dfe-4896-a019-87dfea248bc8', 'documentation'),
	('e0b64984-c4d7-401e-beaf-1f72d9591f8a', 'a');

CREATE TABLE inventory (
	ingredient_id VARCHAR(36) PRIMARY KEY,
	ingredient_name VARCHAR(255) NOT NULL UNIQUE,
	quantity INTEGER NOT NULL DEFAULT 0,
	threshold INTEGER DEFAULT 100
);

CREATE TABLE menu (
	item_id VARCHAR(36) PRIMARY KEY,
	item_name VARCHAR(255) NOT NULL UNIQUE,
	description VARCHAR(1000),
	price FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE orders (
	id VARCHAR(36) PRIMARY KEY,
	customer_name VARCHAR(255) NOT NULL,
	server_id VARCHAR(36) REFERENCES users(id),
	time_ordered TIMESTAMP WITHOUT time zone NOT NULL DEFAULT now(),
	is_served BOOLEAN NOT NULL DEFAULT false,
	price FLOAT NOT NULL DEFAULT 0
);

-- Linking Tables

-- If item_id or ingredient_id updated in main tables, linking table updated accordingly
-- If menu item deleted, related ingredient links die BUT inventory still holds ingredients
-- Replaces ingredients
CREATE TABLE menu_inventory (
	item_id VARCHAR(36) REFERENCES menu(item_id) ON UPDATE CASCADE ON DELETE CASCADE,
	ingredient_id VARCHAR(36) REFERENCES inventory(ingredient_id) ON UPDATE CASCADE,

	PRIMARY KEY(item_id, ingredient_id)
);

-- Replaces Items
CREATE TABLE order_menu (
	order_id VARCHAR(36) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	item_id VARCHAR(36) REFERENCES menu(item_id) ON UPDATE CASCADE,
	quantity INTEGER NOT NULL DEFAULT 0,
	total_price FLOAT NOT NULL DEFAULT 0

	PRIMARY KEY(order_id, item_id)
);

-- grant privileges to all users for all tables
GRANT ALL ON TABLE user_types to public;
GRANT ALL ON TABLE users to public;
GRANT ALL ON TABLE credentials to public;
GRANT ALL ON TABLE orders to public;
GRANT ALL ON TABLE inventory to public;
GRANT ALL ON TABLE menu to public;
GRANT ALL ON TABLE menu_inventory to public; -- previously ingredients
GRANT ALL ON TABLE order_menu to public; -- previously items