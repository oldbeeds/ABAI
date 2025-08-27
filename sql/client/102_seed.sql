-- 102_seed.sql
INSERT INTO dbo.Defects (status, priority, problem, [date], lat, lng) VALUES
('Open', 'High', 'Water leak in tunnel', GETDATE(), 38.8977, -77.0365),
('Open', 'Low', 'Loose panel', DATEADD(day, -1, GETDATE()), NULL, NULL),
('Closed', 'Medium', 'Signal glitch', DATEADD(day, -2, GETDATE()), 38.8895, -77.0353);
