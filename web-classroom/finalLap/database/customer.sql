-- สร้างตาราง Customer
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(255) NOT NULL,
    CustomerType ENUM('ทั่วไป', 'Premium') NOT NULL
);

-- เพิ่มข้อมูลตัวอย่าง
INSERT INTO Customer (FullName, CustomerType) VALUES
('John Doe', 'ทั่วไป'),
('Jane Smith', 'Premium'),
('Alice Johnson', 'ทั่วไป'),
('Bob Brown', 'Premium'),
('Charlie Davis', 'ทั่วไป'),
('Diana Evans', 'Premium'),
('Ethan Harris', 'ทั่วไป'),
('Fiona Green', 'Premium'),
('George Hill', 'ทั่วไป'),
('Hannah King', 'Premium');