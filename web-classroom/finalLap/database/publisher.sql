-- สร้างตาราง Publisher
CREATE TABLE Publisher (
    PublisherID INT PRIMARY KEY AUTO_INCREMENT,
    PublisherName VARCHAR(255) NOT NULL,
    Province VARCHAR(255) NOT NULL
);

-- เพิ่มข้อมูลตัวอย่าง 10 ตัวอย่าง
INSERT INTO Publisher (PublisherName, Province) VALUES
('Nanmee Books', 'Bangkok'),
('Se-Education', 'Bangkok'),
('Amarin Printing and Publishing', 'Bangkok'),
('Matichon Publishing', 'Bangkok'),
('Siam Inter Multimedia', 'Bangkok'),
('Praphansarn Publishing', 'Bangkok'),
('Sarakadee Press', 'Bangkok'),
('B2S', 'Bangkok'),
('Plan for Kids', 'Bangkok'),
('Naiin Publishing', 'Bangkok');