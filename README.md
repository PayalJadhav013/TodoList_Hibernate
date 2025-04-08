ToDo List Application - Project Description

Overview

This is a full-stack web application for managing tasks, built with:

Frontend: HTML5, CSS3, JavaScript

Backend: Java Servlets (Jakarta EE)

Database: PostgreSQL with Hibernate ORM

Server: Apache Tomcat 10.1

Build Tool: Maven

Key Features
1. Task Management
Create new tasks with title, description, and due date

View all tasks in a clean table format

Mark tasks as complete/incomplete

Edit existing tasks

Delete tasks

2. Technical Implementation
RESTful API: JSON-based communication between frontend and backend

Database Persistence: Hibernate ORM with PostgreSQL

Modern Java: Uses Java 17 with Jakarta EE 10 (Tomcat 10)

Responsive Design: Clean CSS styling for better user experience

Technical Highlights
Backend Services:

ApiServlet: Handles all CRUD operations via REST endpoints

TaskServlet: Traditional form-based task handling (alternative flow)

HibernateUtil: Manages database sessions and transactions

Frontend:

Dynamic task rendering with JavaScript

Form validation and error handling

AJAX calls to backend API

Database:

PostgreSQL relational database

Hibernate ORM for object-relational mapping

Automatic schema generation via Hibernate

Development Environment
IDE: Spring Tool Suite 4

Java: Eclipse Adoptium JDK 21

Database: PostgreSQL running on localhost

Application Server: Apache Tomcat 10.1.39

How It Works
User interacts with the web interface

JavaScript makes API calls to Java servlets

Servlets process requests using Hibernate

Data is persisted in PostgreSQL

Results are returned as JSON to update the UI
