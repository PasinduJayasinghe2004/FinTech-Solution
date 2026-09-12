-- RIA PostgreSQL Database Schema Initialization

-- 1. Create ENUM types
CREATE TYPE user_role AS ENUM ('ROLE_TEACHER', 'ROLE_STUDENT', 'ROLE_ADMIN');
CREATE TYPE student_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE fee_status AS ENUM ('PAID', 'PENDING', 'OVERDUE');
CREATE TYPE payment_method_type AS ENUM ('Card', 'Bank Transfer', 'QR Payment', 'Cash');

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);

-- 4. Students Table
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    teacher_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_unique_id VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(20),
    status student_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Monthly Fees Table
CREATE TABLE IF NOT EXISTS monthly_fees (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id VARCHAR(36) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    status fee_status DEFAULT 'PENDING'
);

-- 6. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id VARCHAR(36) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    monthly_fee_id VARCHAR(36) REFERENCES monthly_fees(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method payment_method_type NOT NULL,
    status fee_status DEFAULT 'PAID',
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Demo Data
INSERT INTO users (id, name, email, password, role) VALUES
('usr_tch_1', 'Dr. Wickramasinghe', 'teacher@ria.com', '$2b$10$e8w3u...', 'ROLE_TEACHER'),
('usr_stu_1', 'Pasindu Jayasinghe', 'pasindu@example.com', '$2b$10$e8w3u...', 'ROLE_STUDENT')
ON CONFLICT (email) DO NOTHING;

INSERT INTO teachers (id, user_id, subject, phone) VALUES
('tch_1', 'usr_tch_1', 'Combined Mathematics', '+94 77 000 1122')
ON CONFLICT DO NOTHING;

INSERT INTO students (id, user_id, teacher_id, student_unique_id, phone, status) VALUES
('stu_1', 'usr_stu_1', 'usr_tch_1', 'STU-001', '+94 77 123 4567', 'ACTIVE')
ON CONFLICT (student_unique_id) DO NOTHING;

INSERT INTO monthly_fees (id, student_id, month, year, amount, due_date, status) VALUES
('fee_sep', 'stu_1', 'September', 2026, 3000.00, '2026-09-15', 'PENDING'),
('fee_aug', 'stu_1', 'August', 2026, 3000.00, '2026-08-15', 'PAID')
ON CONFLICT DO NOTHING;

INSERT INTO payments (id, student_id, monthly_fee_id, amount, payment_method, status, transaction_id) VALUES
('pay_aug', 'stu_1', 'fee_aug', 3000.00, 'Card', 'PAID', 'TP-8241')
ON CONFLICT (transaction_id) DO NOTHING;

