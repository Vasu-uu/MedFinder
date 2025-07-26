<div align="center">
  <img src="logo.png" alt="MedFinder Logo" width="150"/>
  <h1>MedFinder - Medicine Availability</h1>
  <p>
    <strong>A responsive web application to find nearby pharmacies and check for available medicines in real-time.</strong>
  </p>
  <p>
    <a href="https://vasu-uu.github.io/MedFinder/"><strong>View Live Demo</strong></a>
  </p>
</div>

![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

---

## 🎯 The Goal

In many rural and underserved areas, finding a pharmacy with a specific medicine in stock can be a time-consuming and frustrating process. **MedFinder** was developed to solve this problem by providing a simple, real-time platform to check medicine availability in nearby pharmacies. By leveraging geolocation, the app saves users valuable time and effort, ensuring they can find the healthcare products they need, when they need them.

This project was built to address the "Transform the Future of Rural Commerce" challenge.

## ✨ Key Features

-   **Geolocation-Based Search**: Instantly finds pharmacies closest to your current location using the browser's Geolocation API.
-   **Real-Time Medicine Search**: Filter pharmacies based on the availability of a specific medicine you're looking for.
-   **Dynamic Pharmacy Information**: Displays a list of pharmacies with their name, address, and distance from the user.
-   **Simulated Stock & Pricing**: Each pharmacy shows a list of available medicines with simulated stock levels (In Stock, Low Stock, Out of Stock) and prices.
-   **Responsive & User-Friendly UI**: A clean, intuitive interface built with Tailwind CSS that works seamlessly on both desktop and mobile devices.

## 📸 Demo

- **Full Demo Video**: [Watch on Google Drive](https://drive.google.com/file/d/11p7JAyGUybrzpJwIbGhmDsDgWK8Gmbby/view?usp=sharing)

## 🛠️ Tech Stack & Tools

The project is built entirely on front-end technologies, focusing on a lightweight and accessible user experience.

| Category      | Technology / Tool                                                                                                  |
| :------------ | :----------------------------------------------------------------------------------------------------------------- |
| **Frontend** | `HTML5`, `CSS3`, `JavaScript (ES6)`                                                                            |
| **Styling** | `Tailwind CSS`, Custom CSS for animations and card styling                                     |
| **APIs** | `Browser Geolocation API`                                                                                         |
| **Data** | Simulated (dynamic data generated via JavaScript to mimic a real backend)                                        |
| **Icons** | `Font Awesome`                                                                                                   |
| **Hosting** | `GitHub Pages`                                                                                                 |

## 🧠 Development Insights

-   **Motivation**: The project was inspired by the real-world challenge of accessing essential medicines in non-urban areas, aiming to provide a digital solution that bridges this information gap.
-   **Key Challenge**: The primary challenge was creating a realistic and performant real-time search experience without a backend. This was overcome by designing a robust client-side simulation for pharmacy and medicine data, which is generated dynamically based on the user's location.
-   **Breakthrough**: Integrating the Geolocation API and then using trigonometry (`Math.cos`, `Math.sin`) to generate randomized pharmacy coordinates within a realistic radius of the user was a key breakthrough. This made the simulation feel dynamic and personalized.

## 👤 Author

-   **Vasudev V**
    -   [GitHub](https://github.com/Vasu-uu)
    -   [LinkedIn](https://www.linkedin.com/in/vasudev-/)
