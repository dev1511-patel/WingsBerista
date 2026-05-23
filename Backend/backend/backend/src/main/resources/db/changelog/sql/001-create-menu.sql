--liquibase formatted sql

--changeset wingsberista:001-create-menu

CREATE TABLE menu (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price DOUBLE PRECISION,
    description TEXT,
    available BOOLEAN
);