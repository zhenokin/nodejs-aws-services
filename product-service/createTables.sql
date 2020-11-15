create extension if not exists "uuid-ossp";

create table if not exists products (
	id uuid primary key default uuid_generate_v4(),
	title text not NULL,
	description text,
	img text,
	price real
);

create table if not exists stock (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid UNIQUE NOT NULL,
    count int,
    FOREIGN KEY ("product_id") references "products" ("id")
);





