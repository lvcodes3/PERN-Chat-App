-- 1. Create the database --
CREATE DATABASE pern_chat_app
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- 2. Enable UUID extension --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create ENUM for gender --
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

-- 4. Users table --
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    fullname TEXT NOT NULL,
    password TEXT NOT NULL,
    gender gender_type NOT NULL,
    profile_picture TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_signed_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL
);

-- 5. Conversations table --
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. Conversation_participants table, junction table for many-to-many relationship --
-- each row represents a user participating in a specific conversation --
-- ON DELETE CASCADE is used, so if a conversation or user is deleted, related entries in the junction table are also deleted --
CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

-- 7. Messages table --
-- SET NULL ensures that if a user is deleted, the sender_id for past messages can be preserved as NULL --
-- rather than deleting the message itself --
CREATE TABLE messages(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- INFO --

-- Users and Conversations (Many-to-Many) --
-- Since a user can participate in multiple conversations and a conversation can have multiple users --
-- we create a junction table called conversation_participants to establish this many-to-many relationship --

-- Conversations and Messages (One-to-Many) --
-- Each conversation can have multiple messages, but each message belongs to a single conversation --
-- We'll use a foreign key on messages to reference conversations --

-- Users and Messages (Many-to-One) --
-- Each message is sent by a user, so we'll add a foreign key in the messages table that references the users table --