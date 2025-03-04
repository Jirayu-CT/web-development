-- สร้างตาราง book
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    published_year INT, 
    isbn VARCHAR(20),
    pages INT,
    publisher VARCHAR(255),
    language VARCHAR(50), 
    description TEXT 
);

-- เพิ่มตัวอย่างข้อมูลหนังสือ 10 เล่ม
INSERT INTO books (title, author, genre, published_year, isbn, pages, publisher, language, description) VALUES
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 1960, '9780061120084', 281, 'J.B. Lippincott & Co.', 'English', 'A novel about the serious issues of rape and racial inequality.'),
('1984', 'George Orwell', 'Dystopian', 1949, '9780451524935', 328, 'Secker & Warburg', 'English', 'A novel that presents a dystopian future under a totalitarian regime.'),
('Pride and Prejudice', 'Jane Austen', 'Romance', 1813, '9781503290563', 279, 'T. Egerton', 'English', 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.'),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy', 1925, '9780743273565', 180, 'Charles Scribner\'s Sons', 'English', 'A novel about the American dream and the roaring twenties.'),
('Moby-Dick', 'Herman Melville', 'Adventure', 1851, '9781503280786', 635, 'Harper & Brothers', 'English', 'A novel about the voyage of the whaling ship Pequod.'),
('War and Peace', 'Leo Tolstoy', 'Historical', 1869, '9780199232765', 1225, 'The Russian Messenger', 'Russian', 'A novel that chronicles the history of the French invasion of Russia.'),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 1951, '9780316769488', 214, 'Little, Brown and Company', 'English', 'A novel about the events and circumstances that occur around a young man named Holden Caulfield.'),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 1937, '9780547928227', 310, 'George Allen & Unwin', 'English', 'A fantasy novel and children\'s book about the adventures of Bilbo Baggins.'),
('Crime and Punishment', 'Fyodor Dostoevsky', 'Philosophical', 1866, '9780140449136', 671, 'The Russian Messenger', 'Russian', 'A novel about the mental anguish and moral dilemmas of an impoverished ex-student.'),
('The Brothers Karamazov', 'Fyodor Dostoevsky', 'Philosophical', 1880, '9780374528379', 796, 'The Russian Messenger', 'Russian', 'A novel that explores deep philosophical and theological themes.');