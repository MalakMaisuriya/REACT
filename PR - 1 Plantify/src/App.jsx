import "./App.css";
import { useState } from "react";

import HoverButton from "./components/HoverButton";

import hero from "./assets/images/hero.png";
import bonsai from "./assets/images/bonsai.png";
import peacelily from "./assets/images/peacelily.png";
import maple from "./assets/images/maple.png";
import plum from "./assets/images/plum.png";
import ivy from "./assets/images/ivy.png";
import howea from "./assets/images/howea.png";
import areca from "./assets/images/areca.png";
import wreath from "./assets/images/wreath.png";
import insta1 from "./assets/images/plant_image_1.png";
import insta2 from "./assets/images/plant_image_2.png";
import insta3 from "./assets/images/plant_image_3.png";

function App() {
  const [plants, setPlants] = useState([
    {
      name: "Indoor bonsai",
      price: 1499,
      img: bonsai,
      rating: 4.8,
      discount: 20,
      liked: false,
    },
    {
      name: "Peace lily",
      price: 800,
      img: peacelily,
      rating: 4.6,
      discount: 15,
      liked: false,
    },
    {
      name: "Japanese Maple",
      price: 1499,
      img: maple,
      rating: 4.7,
      discount: 25,
      liked: false,
    },
    {
      name: "Chinese sweet plum",
      price: 1499,
      img: plum,
      rating: 4.5,
      discount: 18,
      liked: false,
    },
    {
      name: "IVY Houseplant",
      price: 1499,
      img: ivy,
      rating: 4.9,
      discount: 22,
      liked: false,
    },
    {
      name: "Howea forsteriana",
      price: 2800,
      img: howea,
      rating: 4.8,
      discount: 12,
      liked: false,
    },
    {
      name: "Areca Palm",
      price: 1499,
      img: areca,
      rating: 4.7,
      discount: 19,
      liked: false,
    },
    {
      name: "Wreath",
      price: 1499,
      img: wreath,
      rating: 4.6,
      discount: 17,
      liked: false,
    },
  ]);

  function toggleLike(index) {
    const updatedPlants = [...plants];
    updatedPlants[index].liked = !updatedPlants[index].liked;
    setPlants(updatedPlants);
  }

  function handleScroll(e, id) {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const yOffset = -100; 
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="logo">🌿 Plantify</div>
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={(e) => handleScroll(e, "#home")}>
                Home
              </a>
            </li>
            <li>
              <a href="#shop" onClick={(e) => handleScroll(e, "#shop")}>
                Shop
              </a>
            </li>
            <li>
              <a href="#shop" onClick={(e) => handleScroll(e, "#shop")}>
                Plants
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleScroll(e, "#about")}>
                About
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => handleScroll(e, "#testimonials")}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#newsletter"
                onClick={(e) => handleScroll(e, "#newsletter")}
              >
                Newsletter
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                Contact
              </a>
            </li>
          </ul>
          <HoverButton text="Browse Plants" />
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Bring Nature Closer to Home</h1>
            <p>Carefully grown indoor plants designed to refresh your space.</p>
            <div className="hero-btns">
              <HoverButton text="Shop Now" />
              <HoverButton text="View Collection" />
            </div>
          </div>
          <div>
            <img src={hero} alt="Hero Plant" />
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>3,200+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-card">
            <h3>150+</h3>
            <p>Plant Varieties</p>
          </div>
          <div className="stat-card">
            <h3>48hr</h3>
            <p>Fast Dispatch</p>
          </div>
          <div className="stat-card">
            <h3>4.8★</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </section>

      <section id="shop" className="plants">
        <h2>Our Favorite Plants</h2>
        <div className="plant-grid">
          {plants.map((plant, index) => {
            const newPrice = Math.floor(
              plant.price * (1 - plant.discount / 100),
            );
            return (
              <div className="card" key={index}>
                <div className="badge">{plant.discount}% OFF</div>
                <img src={plant.img} alt={plant.name} />
                <div className="title-row">
                  <h4>{plant.name}</h4>
                  <span className="rating">⭐ {plant.rating}</span>
                </div>
                <p className="price">
                  ₹{newPrice} <span className="old-price">₹{plant.price}</span>
                </p>
                <HoverButton text="Buy Now" />
              </div>
            );
          })}
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Plantify</h2>
        <p>
          Plantify is dedicated to bringing greenery into your home. Our
          carefully selected indoor plants not only beautify your space but also
          improve air quality and well-being.
        </p>
        <p>
          Our mission is to make indoor gardening simple, enjoyable, and
          accessible for everyone. Whether you're a beginner or an experienced
          plant parent, Plantify has something for you.
        </p>

        <div className="about-features">
          <div className="feature-card">
            <i className="fas fa-seedling"></i>
            <h4>High Quality Plants</h4>
            <p>
              Healthy, thriving plants handpicked by our experts for your home.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-leaf"></i>
            <h4>Eco-Friendly</h4>
            <p>
              We focus on sustainable and environmentally friendly practices.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-smile"></i>
            <h4>Customer Satisfaction</h4>
            <p>
              We ensure happy plant parents with our reliable service and
              support.
            </p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2>Happy Customers Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Customer 1"
              />
              <h4>Priya Sharma</h4>
              <div className="rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <p>
                "Plantify’s plants transformed my living room! Super fresh and
                healthy."
              </p>
            </div>
            <div className="testimonial-card">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Customer 2"
              />
              <h4>Rohit Mehta</h4>
              <div className="rating">⭐ ⭐ ⭐ ⭐</div>
              <p>
                "Fast delivery and the plants arrived in perfect condition.
                Highly recommend!"
              </p>
            </div>
            <div className="testimonial-card">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Customer 3"
              />
              <h4>Neha Patel</h4>
              <div className="rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <p>
                "Beautiful selection of indoor plants. Love how fresh and
                vibrant they are."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              {
                q: "How do I care for indoor plants?",
                a: "Water them regularly, provide enough sunlight, and use proper soil for each plant type.",
              },
              {
                q: "Do you deliver plants nationwide?",
                a: "Yes, we deliver plants all over India with proper packaging to keep them safe.",
              },
              {
                q: "Can I return a plant if it's damaged?",
                a: "Absolutely, contact us within 48 hours of delivery and we’ll arrange a replacement.",
              },
              {
                q: "Do you provide plant care tips?",
                a: "Yes, each plant comes with care instructions and you can subscribe to our newsletter for tips.",
              },
            ].map((item, index) => (
              <div
                className="faq-item"
                key={index}
                onClick={(e) => {
                  const el = e.currentTarget;
                  el.classList.toggle("open");
                }}
              >
                <div className="faq-question">{item.q}</div>
                <div className="faq-answer">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="newsletter">
        <div className="container">
          <h2>Subscribe for Plant care Tips & Offers</h2>
          <p>
            Get exclusive updates, care tips, and special discounts delivered to
            your inbox.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <HoverButton text="Subscribe" />
          </div>
        </div>
      </section>

      <section id="instagram" className="instagram-section">
        <div className="container">
          <h2>Our Green Community</h2>
          <p>See how our customers style their plants at home!</p>

          <div className="instagram-grid">
            <div className="instagram-card">
              <img src={insta1} alt="Plant 1" />
            </div>
            <div className="instagram-card">
              <img src={insta2} alt="Plant 2" />
            </div>
            <div className="instagram-card">
              <img src={insta3} alt="Plant 3" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-inner">
          <h2>Get Your Green Space Today</h2>
          <p>
            Bring home fresh, vibrant plants and refresh your space instantly.
          </p>
          <HoverButton
            text="Shop Now"
            onClick={(e) => handleScroll(e, "#shop")}
          />
        </div>
      </section>

      <section id="contact" className="contact-map">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Reach out to us or find us at our location!</p>

          <div className="contact-grid">
            <div className="contact-card">
              <h4>Email</h4>
              <p>support@plantify.com</p>
            </div>
            <div className="contact-card">
              <h4>Phone</h4>
              <p>+91 12345 67890</p>
            </div>
            <div className="contact-card">
              <h4>Address</h4>
              <p>Anand Park, Althan, Surat, Gujarat 395007</p>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.4678439249166!2d72.82340407506553!3d21.209265384012204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f12f3e7027f1b%3A0xa1f5c68e1d79b812!2sAnand%20Park%2C%20Althan%2C%20Surat%2C%20Gujarat%20395007!5e0!3m2!1sen!2sin!4v1678300000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Plantify Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;