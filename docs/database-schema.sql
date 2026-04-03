CREATE DATABASE IF NOT EXISTS dress
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE dress;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT NULL,
  bio VARCHAR(255) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_username (username),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS clothes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  color VARCHAR(30) NOT NULL,
  season VARCHAR(30) NOT NULL,
  brand VARCHAR(50) DEFAULT NULL,
  scene VARCHAR(50) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_clothes_user_id (user_id),
  KEY idx_clothes_category (category),
  KEY idx_clothes_color (color),
  KEY idx_clothes_season (season),
  CONSTRAINT fk_clothes_user_id
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS outfits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  scene VARCHAR(50) DEFAULT NULL,
  season VARCHAR(30) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  cover_image_url VARCHAR(255) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_outfits_user_id (user_id),
  KEY idx_outfits_scene (scene),
  KEY idx_outfits_season (season),
  CONSTRAINT fk_outfits_user_id
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS outfit_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  outfit_id BIGINT UNSIGNED NOT NULL,
  clothes_id BIGINT UNSIGNED NOT NULL,
  item_type VARCHAR(30) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_outfit_items_unique (outfit_id, clothes_id),
  KEY idx_outfit_items_outfit_id (outfit_id),
  KEY idx_outfit_items_clothes_id (clothes_id),
  CONSTRAINT fk_outfit_items_outfit_id
    FOREIGN KEY (outfit_id) REFERENCES outfits (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_outfit_items_clothes_id
    FOREIGN KEY (clothes_id) REFERENCES clothes (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  outfit_id BIGINT UNSIGNED DEFAULT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  cover_image_url VARCHAR(255) DEFAULT NULL,
  visibility ENUM('public', 'private', 'friends') NOT NULL DEFAULT 'public',
  share_token VARCHAR(64) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_posts_share_token (share_token),
  KEY idx_posts_user_id (user_id),
  KEY idx_posts_outfit_id (outfit_id),
  KEY idx_posts_visibility (visibility),
  CONSTRAINT fk_posts_user_id
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_posts_outfit_id
    FOREIGN KEY (outfit_id) REFERENCES outfits (id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS comments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  content VARCHAR(500) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_comments_post_id (post_id),
  KEY idx_comments_user_id (user_id),
  CONSTRAINT fk_comments_post_id
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_comments_user_id
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS post_likes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_post_likes_unique (post_id, user_id),
  KEY idx_post_likes_post_id (post_id),
  KEY idx_post_likes_user_id (user_id),
  CONSTRAINT fk_post_likes_post_id
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_post_likes_user_id
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS post_favorites (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_post_favorites_unique (post_id, user_id),
  KEY idx_post_favorites_post_id (post_id),
  KEY idx_post_favorites_user_id (user_id),
  CONSTRAINT fk_post_favorites_post_id
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_post_favorites_user_id
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS inspiration_outfits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  style VARCHAR(50) DEFAULT NULL,
  scene VARCHAR(50) DEFAULT NULL,
  season VARCHAR(30) DEFAULT NULL,
  cover_image_url VARCHAR(255) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  is_ad TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inspiration_outfits_style (style),
  KEY idx_inspiration_outfits_scene (scene),
  KEY idx_inspiration_outfits_season (season)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS inspiration_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  inspiration_outfit_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) DEFAULT NULL,
  price DECIMAL(10, 2) DEFAULT NULL,
  product_url VARCHAR(255) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inspiration_items_outfit_id (inspiration_outfit_id),
  CONSTRAINT fk_inspiration_items_outfit_id
    FOREIGN KEY (inspiration_outfit_id) REFERENCES inspiration_outfits (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
