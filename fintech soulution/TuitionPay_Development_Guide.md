# RIA -- Development Guide

## Teacher-Centric Tuition Payment & Monitoring Platform

**Project Type:** FinTech + EdTech SaaS Platform\
**Target Users:** Private tuition teachers and students\
**Recommended Stack:** react + node js + PostgreSQL

------------------------------------------------------------------------

# 1. Project Overview

RIA is a digital platform designed to help private tuition
teachers manage students and monitor tuition payments.

The system allows:

-   Teachers to manage students
-   Students to log in using a unique Student ID
-   Students to view current tuition fees
-   Students to track pending and overdue payments
-   Students to make payments
-   Teachers to monitor payments in real time
-   Teachers to view outstanding balances
-   The system to send payment notifications
-   Teachers to view payment analytics

## Main Goal

Replace manual payment tracking using notebooks, spreadsheets, and
messaging applications with one centralized digital platform.

------------------------------------------------------------------------

# 2. User Roles

## 2.1 Teacher

Teachers can:

-   Register and manage students
-   Create student accounts
-   Assign unique Student IDs
-   Create monthly payment records
-   View paid, pending, and overdue payments
-   Monitor total income
-   View payment analytics
-   Receive payment notifications

## 2.2 Student

Students can:

-   Log in securely
-   View current tuition fees
-   View outstanding balances
-   View payment history
-   Select a payment method
-   Make a payment
-   Receive payment notifications

------------------------------------------------------------------------

# 3. Core System Modules

## Module 1: Authentication

Features:

-   Student login
-   Teacher login
-   JWT authentication
-   Password encryption
-   Role-based authorization
-   Logout
-   Forgot password

Roles:

``` text
ROLE_TEACHER
ROLE_STUDENT
ROLE_ADMIN
```

------------------------------------------------------------------------

# 4. Student Management Module

The teacher can manage all students.

Features:

-   Add student
-   Edit student
-   Delete student
-   View student details
-   Generate unique Student ID
-   Activate/deactivate student account

Example Student ID:

``` text
STU-001
STU-002
STU-003
```

Student information:

``` text
Student ID
Full Name
Email
Phone Number
Class/Subject
Registration Date
Account Status
```

------------------------------------------------------------------------

# 5. Student Payment Dashboard

After login, the student should immediately understand their payment
situation.

## Dashboard Components

### Payment Summary

Display:

-   Current monthly payment
-   Outstanding balance
-   Payment status

Example:

``` text
Current Payment: Rs. 3,000
Outstanding Balance: Rs. 6,000
Status: Pending
```

### Current Payment Card

Display:

``` text
September Tuition Fee

Amount: Rs. 3,000
Due Date: September 15, 2026

Status: PENDING

[ PAY NOW ]
```

### Payment Reminder

Example:

> Your September tuition payment is due in 5 days.

### Recent Payment History

Display:

  Month         Amount Method          Status
  -------- ----------- --------------- ---------
  August     Rs. 3,000 Card            Paid
  July       Rs. 3,000 Bank Transfer   Paid
  June       Rs. 3,000 QR Payment      Paid
  May        Rs. 3,000 \-              Overdue

------------------------------------------------------------------------

# 6. Payment Module

## Payment Flow

``` text
Student Dashboard
        ↓
Click "Pay Now"
        ↓
Select Payment Method
        ↓
Payment Gateway
        ↓
Payment Processing
        ↓
Payment Verification
        ↓
Payment Successful
        ↓
Database Updated
        ↓
Teacher Notification
```

## Payment Methods

Initially support:

-   Card Payment
-   Bank Transfer
-   QR Payment

For development and testing, use a payment provider's sandbox/test
environment.

## Payment Status

``` text
PENDING
PROCESSING
PAID
FAILED
OVERDUE
```

------------------------------------------------------------------------

# 7. Teacher Dashboard

The Teacher Dashboard is the main monitoring center.

## Summary Cards

Display:

``` text
Total Students
32

Paid This Month
Rs. 28,500

Outstanding
Rs. 9,800

Pending Payments
4
```

## Dashboard Features

-   Total students
-   Monthly income
-   Outstanding balances
-   Pending payments
-   Recent transactions
-   Payment charts
-   Student payment table

------------------------------------------------------------------------

# 8. Notification Module

Notifications should be generated when important events occur.

## Student Notifications

Examples:

-   Your payment is due soon
-   Your payment was successful
-   Your payment is overdue

## Teacher Notifications

Examples:

-   Student STU-001 completed a payment
-   5 students have overdue payments
-   A new payment has been received

## Recommended Implementation

Phase 1:

-   In-app notifications
-   Email notifications

Phase 2:

-   Push notifications
-   WhatsApp integration (if appropriate and supported)

------------------------------------------------------------------------

# 9. Recommended Technology Stack

## Frontend

``` text
Next.js
TypeScript
Tailwind CSS
shadcn/ui or reusable UI components
React Query / TanStack Query
Chart library
```

## Backend

``` text
Java
Spring Boot
Spring Security
Spring Data JPA
JWT
REST APIs
```

## Database

``` text
PostgreSQL
```

## Development Tools

``` text
Git
GitHub
Postman
Docker
Docker Compose
```

------------------------------------------------------------------------

# 10. System Architecture

``` text
┌───────────────────────────┐
│       Next.js Frontend     │
│                           │
│ Student + Teacher Portal  │
└─────────────┬─────────────┘
              │
              │ HTTPS / REST API
              ▼
┌───────────────────────────┐
│     Spring Boot Backend    │
│                           │
│ Authentication             │
│ Student Management         │
│ Payment Management         │
│ Notifications              │
│ Analytics                  │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│        PostgreSQL          │
└───────────────────────────┘
```

------------------------------------------------------------------------

# 11. Database Design

## Users Table

``` text
users
-----
id
name
email
password
role
created_at
updated_at
```

## Teachers Table

``` text
teachers
--------
id
user_id
subject
phone
```

## Students Table

``` text
students
--------
id
user_id
teacher_id
student_unique_id
phone
status
created_at
```

## Payments Table

``` text
payments
--------
id
student_id
amount
payment_method
status
transaction_id
payment_date
created_at
```

## Monthly Fees Table

``` text
monthly_fees
------------
id
student_id
month
year
amount
due_date
status
```

## Notifications Table

``` text
notifications
-------------
id
user_id
title
message
type
is_read
created_at
```

------------------------------------------------------------------------

# 12. Database Relationships

``` text
Teacher
   │
   │ 1
   │
   └─────────── *
               Students
                  │
                  │ 1
                  │
                  └─────────── *
                              Payments
```

A teacher can have many students.

A student can have many payments.

------------------------------------------------------------------------

# 13. Backend Development Structure

Recommended Spring Boot package structure:

``` text
com.ria

├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
└── util
```

## Example Entities

``` text
User
Teacher
Student
Payment
MonthlyFee
Notification
```

------------------------------------------------------------------------

# 14. REST API Design

## Authentication APIs

``` http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
```

## Student APIs

``` http
GET    /api/students
GET    /api/students/{id}
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
```

## Payment APIs

``` http
GET  /api/payments
GET  /api/payments/{id}
POST /api/payments
POST /api/payments/{id}/confirm
```

## Student Dashboard APIs

``` http
GET /api/student/dashboard
GET /api/student/payments
GET /api/student/payments/history
GET /api/student/notifications
```

## Teacher Dashboard APIs

``` http
GET /api/teacher/dashboard
GET /api/teacher/analytics
GET /api/teacher/students
GET /api/teacher/payments
```

------------------------------------------------------------------------

# 15. Frontend Development Structure

Recommended Next.js structure:

``` text
src
├── app
│   ├── login
│   ├── student
│   │   ├── dashboard
│   │   ├── payments
│   │   ├── history
│   │   └── profile
│   │
│   └── teacher
│       ├── dashboard
│       ├── students
│       ├── payments
│       ├── analytics
│       └── notifications
│
├── components
│   ├── ui
│   ├── dashboard
│   ├── payment
│   └── layout
│
├── services
├── hooks
├── types
└── lib
```

------------------------------------------------------------------------

# 16. Student Dashboard Development Plan

## Step 1: Create Layout

Create:

-   Sidebar
-   Top navigation
-   Main content area

## Step 2: Create Summary Cards

Components:

``` text
CurrentPaymentCard
OutstandingBalanceCard
PaymentStatusCard
```

## Step 3: Create Current Payment Component

Display:

-   Fee name
-   Amount
-   Due date
-   Status
-   Pay Now button

## Step 4: Create Payment History

Create:

``` text
PaymentHistoryTable
```

Include:

-   Month
-   Amount
-   Date
-   Payment method
-   Status

## Step 5: Connect Backend APIs

Use API services to retrieve:

``` text
Student information
Current payment
Outstanding payments
Payment history
Notifications
```

------------------------------------------------------------------------

# 17. Security Requirements

Important security features:

-   Hash passwords using BCrypt
-   JWT authentication
-   Role-based authorization
-   HTTPS in production
-   Input validation
-   Secure payment gateway integration
-   Never store raw card details
-   Protect API endpoints
-   Validate payment callbacks/webhooks

------------------------------------------------------------------------

# 18. Development Roadmap

## Phase 1: Planning & UI/UX

-   [ ] Define requirements
-   [ ] Create user flows
-   [ ] Design landing page
-   [ ] Design student login
-   [ ] Design student dashboard
-   [ ] Design teacher dashboard
-   [ ] Create design system

## Phase 2: Backend Foundation

-   [ ] Create Spring Boot project
-   [ ] Configure PostgreSQL
-   [ ] Create database entities
-   [ ] Create repositories
-   [ ] Create services
-   [ ] Create REST controllers

## Phase 3: Authentication

-   [ ] User registration
-   [ ] Login
-   [ ] JWT generation
-   [ ] JWT validation
-   [ ] Role-based authorization

## Phase 4: Student Management

-   [ ] Create students
-   [ ] Generate Student IDs
-   [ ] Update students
-   [ ] Delete students
-   [ ] View students

## Phase 5: Payment Management

-   [ ] Create monthly fees
-   [ ] Track payment status
-   [ ] Create payment records
-   [ ] Payment history
-   [ ] Outstanding payment detection

## Phase 6: Frontend Development

-   [ ] Next.js setup
-   [ ] Authentication UI
-   [ ] Student dashboard
-   [ ] Teacher dashboard
-   [ ] Payment screens
-   [ ] API integration

## Phase 7: Notifications

-   [ ] In-app notifications
-   [ ] Email notifications
-   [ ] Payment reminders

## Phase 8: Testing

-   [ ] Backend unit tests
-   [ ] API testing with Postman
-   [ ] Frontend testing
-   [ ] Authentication testing
-   [ ] Error handling

## Phase 9: Deployment

-   [ ] Dockerize backend
-   [ ] Dockerize frontend
-   [ ] Configure PostgreSQL
-   [ ] Deploy application
-   [ ] Configure environment variables

------------------------------------------------------------------------

# 19. Suggested MVP

Build these features first:

1.  Teacher authentication
2.  Student authentication
3.  Student management
4.  Unique Student IDs
5.  Monthly fee creation
6.  Payment status tracking
7.  Student payment dashboard
8.  Teacher dashboard
9.  Payment history
10. Basic notifications

Do not start with AI or advanced analytics.

First build a stable working MVP.

------------------------------------------------------------------------

# 20. Future Advanced Features

After the MVP, add:

## AI Payment Insights

Examples:

-   Predict students likely to pay late
-   Automatically summarize monthly payment performance
-   Identify unusual payment patterns

## Smart Reports

Generate:

-   Monthly revenue reports
-   Outstanding payment reports
-   Student payment reports

## Mobile Application

Develop using:

``` text
React Native
or
Flutter
```

## Multi-Teacher Platform

Future SaaS version:

``` text
Platform
   ├── Teacher A
   │      └── Students
   │
   ├── Teacher B
   │      └── Students
   │
   └── Teacher C
          └── Students
```

This can transform RIA into a scalable SaaS platform.

------------------------------------------------------------------------

# 21. Recommended Development Order

Follow this exact order:

``` text
1. UI/UX Design
        ↓
2. Database Design
        ↓
3. Spring Boot Setup
        ↓
4. Authentication
        ↓
5. Student Management
        ↓
6. Payment Management
        ↓
7. Teacher Dashboard APIs
        ↓
8. Next.js Frontend
        ↓
9. Student Dashboard
        ↓
10. Payment Integration
        ↓
11. Notifications
        ↓
12. Testing
        ↓
13. Docker & Deployment
```

------------------------------------------------------------------------

# Final Vision

**RIA** should become a simple but powerful platform where:

> Teachers can manage their tuition business.

> Students can easily understand and complete their payments.

> Both users receive real-time payment information.

The goal is to build a real-world, production-style FinTech + EdTech
application that demonstrates skills in:

-   Full-stack development
-   System design
-   Database design
-   Authentication and security
-   REST APIs
-   Payment workflows
-   UI/UX
-   Docker and deployment

------------------------------------------------------------------------

## Next Development Step

Start with:

# Student Payment Dashboard → Frontend UI Components

Then connect the dashboard to the Spring Boot backend using REST APIs.
