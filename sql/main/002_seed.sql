-- 002_seed.sql
INSERT INTO dbo.Tenant (Name) VALUES ('WMATA');
INSERT INTO dbo.Users (Email, PasswordHash) VALUES 
('admin@ncg.com', '$2a$11$Ttq4o1t7oYwR9H2Zt6T4eOa5f7l4p4G8m0ZpZ5tQXvPj7xQkA3R9a'); -- bcrypt('Password1!') placeholder
