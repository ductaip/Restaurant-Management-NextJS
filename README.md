# Restaurant Management System

A modern, **performance-optimized restaurant management system** built with **Next.js**. This application includes essential features such as customer ordering via QR code, an admin dashboard for real-time monitoring, and role-based access control for managing staff permissions. The system also includes real-time features using **Socket.io** to place orders instantly and update the status.

---

## Key Features

### 1. **Customer Ordering via QR Code**
- **Easy Ordering**: Customers can scan a QR code at their table to view the restaurant’s menu and place orders directly from their device.
- **Real-time Updates**: As customers place their orders, they are sent instantly to the backend for processing and are reflected immediately on the admin dashboard.

### 2. **Admin Dashboard**
- **Monitor Orders**: Admins can see all orders in real-time and monitor their status.
- **Real-time Order Status**: Order statuses (e.g., pending, completed) are updated live using **Socket.io**, ensuring the admin dashboard is always in sync with customer activity.
- **Manage Staff Roles**: Admins can assign roles to staff members, control access, and manage permissions using role-based access control (RBAC).

### 3. **Role-based Access Control (RBAC)**
- **User Permissions**: Different levels of permissions are given to staff members, such as waiter, chef, and manager, to ensure appropriate access to various sections of the platform.

### 4. **Real-Time Communication with Socket.io**
- **Real-Time Order Updates**: Orders placed by customers are pushed to the admin dashboard in real-time using **Socket.io**. This allows the restaurant staff to track orders as they are made and update their status instantly.
- **Instant Notifications**: Staff and admins receive real-time notifications when an order is placed or updated, improving response times.

---

## Performance Optimization

### 1. **Incremental Static Regeneration (ISR)**
- **What is ISR**: **Incremental Static Regeneration** allows the application to update static pages without needing a full rebuild of the site. This ensures that content, such as the menu, is regularly updated while keeping the page load time fast.
- **Benefits**: By using ISR, the system can serve **fast static content** (like menus) while ensuring that updates are reflected automatically after a set interval, without sacrificing performance.
- **Example Use**: The **menu page** can be regenerated every 60 seconds to ensure that the menu items and prices remain up-to-date without requiring a complete page reload.

### 2. **Static Site Generation (SSG)**
- **Pre-rendered Pages**: Pages that don't require real-time data (e.g., static pages like "About Us", "Contact", etc.) are pre-rendered at build time. This drastically improves the website’s performance and SEO.
- **SEO Optimized**: Pre-rendering ensures that search engines can easily crawl the content, leading to better indexing and search engine ranking.

### 3. **Server-Side Rendering (SSR)**
- **Dynamic Data Rendering**: For pages that require dynamic data (e.g., order tracking), **SSR** is used to fetch data on each request, ensuring that users always see the most current data.
- **SEO for Dynamic Pages**: Server-side rendered pages are great for improving SEO for content that changes frequently and must be indexed properly.

### 4. **Image Optimization**
- **Next.js Image Component**: Utilized the **Next.js Image Component** for automatic image optimization, reducing image sizes without compromising quality and improving load times.
- **Optimized for Web Vitals**: Images are served in modern formats like WebP and automatically resized based on device needs, reducing page load times and improving the overall user experience.

### 5. **Code Splitting & Lazy Loading**
- **Code Splitting**: Next.js automatically splits JavaScript bundles for each page to ensure faster load times, preventing large JavaScript files from blocking the rendering of content.
- **Lazy Loading**: Used **React’s lazy loading** for certain components to ensure that only necessary components are loaded at first, speeding up the initial page load.

### 6. **Optimized Caching**
- **Static Caching**: For static pages, caching is utilized to serve pre-rendered pages quickly, reducing the time to first contentful paint (FCP).
- **Service Worker**: A service worker is set up to cache assets and content for offline use, making the application more resilient in low connectivity conditions.

---

## Technologies

- **Frontend**: 
  - Next.js (React Framework)
  - Tailwind CSS
  - ShadCNUI (for advanced UI components)
  - React (UI components)
  - Socket.io (for real-time communication)
  - TypeScript (for type safety and maintainability)

- **Backend**: 
  - Node.js (via Next.js API routes)
  - Socket.io (for real-time communication)

- **Performance Optimization**:
  - **Static Site Generation (SSG)**
  - **Incremental Static Regeneration (ISR)**
  - **Server-Side Rendering (SSR)**
  - **Code Splitting & Lazy Loading**
  - **Next.js Image Optimization**

---

## Getting Started

### Prerequisites
Make sure you have **Node.js** and **npm** (or **yarn**) installed. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/restaurant-management-system.git
   cd restaurant-management-system
