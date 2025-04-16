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

### 1. **Incremental Static Regeneration (ISR) with Nextjs**

- **What is ISR**: Incremental Static Regeneration allows the application to update static pages without needing a full rebuild of the site. This ensures that content, such as the menu, is regularly updated while keeping the page load time fast.
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

## Technologies of Restaurant Management System

- **Frontend**:

  - Next.js (React Framework)
  - Tailwind CSS
  - ShadCNUI (for advanced UI components)
  - Tanstack Table
  - Socket.io (for real-time communication)
  - TypeScript (for type safety and maintainability)
  - React Tanstack, Zustand

- **Performance Optimization with Nextjs**:
  - **Static Site Generation (SSG)**
  - **Incremental Static Regeneration (ISR)**
  - **Server-Side Rendering (SSR)**
  - **Code Splitting & Lazy Loading**
  - **Next.js Image Optimization**

---

Optimizing for Static Generation (SSG - Static Site Generation)

![image](https://github.com/user-attachments/assets/91cd472d-a8e4-483f-9e65-209450973197)

The application supports a **Dark Mode / Light Mode toggle**, providing users with a customizable viewing experience to match their preferences. This feature enhances usability and accessibility, offering a more comfortable interface depending on lighting conditions or user choice.
![image](https://github.com/user-attachments/assets/a8cdd62b-0991-4414-ac03-93eea8e66376) ![image](https://github.com/user-attachments/assets/ab397c96-7e7c-431c-b067-f6bc486a7b3e)

The interface of the Delicious Food restaurant website, showcasing various dishes like Banh mi, Pho, Spaghetti, and other items. The website uses Next.js with Server-side Rendering (SSR) to call an API and load product data from the server. The data is returned from the API but is not immediately visible in the "Network" section of the browser, helping improve page load performance and SEO. The website might use React Query to manage and optimize data fetching, and images of dishes enhance the visual appeal of the site for users.

![image](https://github.com/user-attachments/assets/5dc5cc8d-a344-44f6-b93c-b17bbb795bce)

The **Employee Management page** allows administrators to view, add, edit, and delete employee information. The page uses **React Query (TanStack)** to efficiently call the API for fetching employee data and managing async states. This approach optimizes the web performance by automatically handling the loading and error states for asynchronous operations like fetching employee details, updating records, or deleting employees. The dynamic employee list allows real-time updates without requiring full page reloads, improving the user experience.

![image](https://github.com/user-attachments/assets/f3da0b5f-4909-4f34-8cad-5eaa7941eb40)

![image](https://github.com/user-attachments/assets/10532cd2-cf1f-4964-8af2-4683d870d5bb)

The **Employee Management page** features a powerful search and filter functionality implemented entirely on the frontend using **ShadcnUI** and **TanStack Table**. This approach allows users to filter employee data seamlessly in real-time without triggering requests to the backend, significantly improving page responsiveness and reducing server load. By performing all filtering operations on the client side, the system ensures faster data retrieval and enhances the overall user experience, especially as the number of records grows.

![image](https://github.com/user-attachments/assets/8f76720a-db66-4740-9b07-f3acf395faf9)

![image](https://github.com/user-attachments/assets/6b6c32c9-7994-4fc0-9be6-3c1dd9c20d47)

The **Table Management page** provides an intuitive interface for restaurant staff to manage tables and assign QR codes for each table. Each table is displayed with essential information like its number, seating capacity, and availability status. The **QR code** for each table allows customers to scan and view the menu or place orders directly from their smartphones, enhancing convenience and reducing wait times. The page efficiently uses **React Query (TanStack)** to fetch and manage table data in real time, ensuring that the latest table status is always available to staff and customers. This system streamlines table management while integrating modern technology to improve the overall dining experience.

![image](https://github.com/user-attachments/assets/3bb35475-3a87-4624-9cd0-be8cac86fece)
