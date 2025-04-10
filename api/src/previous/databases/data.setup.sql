-- USER MYSQL CREATION AND 
CREATE USER 'lionel_sublime_world'@'localhost' IDENTIFIED BY 'sublime_world_20024';
GRANT ALL PRIVILEGES ON sublime_world_database.* TO 'lionel_sublime_world'@'localhost';
FLUSH PRIVILEGES;
-- DONNER JUSTE LES PERMISSIONS DE LECTURE
GRANT SELECT ON sublime_world_database.* TO 'lionel_sublime_world'@'localhost';
FLUSH PRIVILEGES;




-- USE POSTGRES CREATION 
CREATE USER lionel_sublime_world WITH PASSWORD 'sublime_world_20024';
GRANT ALL PRIVILEGES ON DATABASE sublime_world_database TO lionel_sublime_world;
-- DONNER JUSTE LES PERMISSIONS DE LECTURE
GRANT CONNECT ON DATABASE ma_base_pgsql TO mon_user_pgsql;
GRANT USAGE ON SCHEMA public TO mon_user_pgsql;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mon_user_pgsql;
