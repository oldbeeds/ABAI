-- 101_client_schema.sql
CREATE TABLE dbo.Defects (
  defect_id INT IDENTITY(1,1) PRIMARY KEY,
  status NVARCHAR(50) NULL,
  priority NVARCHAR(50) NULL,
  problem NVARCHAR(400) NULL,
  [date] DATE NULL,
  lat FLOAT NULL,
  lng FLOAT NULL
);
