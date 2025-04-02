import React, { useEffect, useState } from "react";
import "./FirstPage.css";
import WA from "../images/icons8-whatsapp-50.png";
import GM from "../images/gmail.png";
import IG from "../images/ig.png";
import FB from "../images/fb.png";
import LI from "../images/linkedin.png";
import X from "../images/x.png";
import Logo from "../images/logo-removebg-preview.png";
import ag from "./images/aanya-gupta.jpg";
import ap from "./images/arjun-patel.jpg";
import nj from "./images/neha-joshi.jpg";
import ps from "./images/priya-sharma.jpg";
import ri from "./images/rohan-iyer.jpg";
import vs from "./images/vikram-singh.jpg";

interface PackageProps {
  name: string;
  price: string;
  features: string[];
}

interface ReviewProps {
  name: string;
  review: string;
  rating: number;
  img: string;
}

const FirstPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolledPastHome, setScrolledPastHome] = useState(false);
  const [isServicesSection, setIsServicesSection] = useState(false);
  const [showWhatsAppText, setShowWhatsAppText] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;
      setIsScrollingUp(isScrollingUp);
      setPrevScrollPos(currentScrollPos);

      const sections = ["home", "services", "reviews", "about", "careers"];
      const scrollPosition = currentScrollPos + 100;
      const homeElement = document.getElementById("home");
      const servicesElement = document.getElementById("services");
      const footerElement = document.querySelector(".site-footer");

      // Check if we're at the bottom of the page
      if (footerElement) {
        const footerTop = footerElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const isAtBottom = footerTop <= windowHeight * 0.5;
        setHideNav(isAtBottom && !isScrollingUp);
      }

      if (homeElement) {
        const homeHeight = homeElement.offsetHeight;
        setScrolledPastHome(currentScrollPos > homeHeight * 0.7);
      }

      if (servicesElement) {
        const servicesTop = servicesElement.offsetTop;
        const servicesHeight = servicesElement.offsetHeight;
        const isInServices =
          scrollPosition >= servicesTop &&
          scrollPosition < servicesTop + servicesHeight;
        setIsServicesSection(isInServices);
        setShowWhatsAppText(
          isInServices ||
            (isScrollingUp && currentScrollPos < servicesTop + servicesHeight)
        );
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const fadeInElements = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 150) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", fadeInElements);
    handleScroll();
    fadeInElements();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", fadeInElements);
    };
  }, [prevScrollPos]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-container">
      <WhatsAppButton
        scrolledPastHome={scrolledPastHome}
        isServicesSection={isServicesSection}
        activeSection={activeSection}
        showText={showWhatsAppText}
      />
      <div id="home" className="home-section">
        <Socials />
        <Header />
        <Body />
      </div>
      <div id="services" className="section-wrapper">
        <Services />
      </div>
      <div id="reviews" className="section-wrapper">
        <Reviews />
      </div>
      <div id="about" className="section-wrapper">
        <AboutUs />
      </div>
      <div id="careers" className="section-wrapper">
        <Careers />
      </div>
      <Navigation
        activeSection={activeSection}
        scrollToTop={scrollToTop}
        hideNav={hideNav}
        isScrollingUp={isScrollingUp}
      />
      <Footer />
    </div>
  );
};

interface WhatsAppButtonProps {
  scrolledPastHome: boolean;
  isServicesSection: boolean;
  activeSection: string;
  showText: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  scrolledPastHome,
  isServicesSection,
  activeSection,
  showText,
}) => {
  return (
    <a
      href="https://wa.me/yournumber"
      className={`wa-contact ${scrolledPastHome ? "scrolled" : ""} ${
        activeSection !== "home" ? "expanded" : ""
      }`}
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={`whatsapp-info ${scrolledPastHome ? "scrolled" : ""} ${
          activeSection !== "home" ? "expanded" : ""
        }`}
      >
        <img src={WA} alt="WhatsApp" className="whatsapp-icon" />
        {showText && <p className="inquire-wa">Contact for more info</p>}
      </div>
    </a>
  );
};

const Socials: React.FC = () => {
  return (
    <div className="socials">
      <div className="contact-us">
        <a href="mailto:contact@soulnotes.com" aria-label="Email">
          <img src={GM} alt="Email" />
        </a>
      </div>
      <div className="media">
        <a href="#" aria-label="Instagram">
          <img src={IG} alt="Instagram" />
        </a>
        <a href="#" aria-label="Facebook">
          <img src={FB} alt="Facebook" />
        </a>
        <a href="#" aria-label="LinkedIn">
          <img src={LI} alt="LinkedIn" />
        </a>
        <a href="#" aria-label="Twitter">
          <img src={X} alt="Twitter" />
        </a>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="welcome fade-in">
      <h1 className="header felipa-regular">
        Welcome to SoulNotes – Your Feelings, Our Melody
      </h1>
    </div>
  );
};

const Body: React.FC = () => {
  return (
    <div className="description fade-in">
      <p className="body felipa-regular">
        "Welcome to SoulNotes – Where Your Emotions Become Music" At SoulNotes,
        we transform your emotions into unforgettable melodies. Whether it's a
        heartfelt love song for your partner, a tribute to a dear friend, or a
        meaningful gift for someone special, we craft custom songs that bring
        your story to life.
      </p>
    </div>
  );
};

const Services: React.FC = () => {
  const packages: PackageProps[] = [
    {
      name: "Raaga Mini - Basic Package",
      price: "₹2,999",
      features: [
        "30-45 second personalized jingle",
        "AI-generated music using SoulNotes' exclusive in-house AI",
        "Human-crafted lyrics for a personal touch",
        "Limited customization options",
        "Delivered in MP3 format",
        "Best for short dedications, birthdays, or social media clips",
      ],
    },
    {
      name: "Thaalam - Story-Driven Custom Package",
      price: "₹3,999",
      features: [
        "1.5 - 2 minute fully customized song",
        "Customers can provide their full story, and we will craft lyrics based entirely on it",
        "AI + human collaboration for a unique and high-quality composition",
        "More flexibility in customization",
        "Optional video creation for reels at an additional reasonable price",
        "Delivered in MP3",
        "Best for deeper emotional connections, love stories, and special memories",
        "Delivered within 4 to 7 days",
      ],
    },
    {
      name: "Swara - Premium Personalized Composition",
      price: "₹5,999",
      features: [
        "3-4 minute fully customized, high-quality song",
        "Deep storytelling: We craft lyrics and melody to match emotions perfectly",
        "AI-enhanced music with human refinement for a professional touch",
        "Unlimited customization options",
        "Studio-quality production with multiple instruments",
        "Custom artwork for the song cover",
        "Video included",
        "Delivered in MP3 and video formats",
        "Best for anniversaries, proposals, heartfelt dedications, and life's biggest moments",
      ],
    },
  ];

  return (
    <section className="services-section fade-in">
      <div className="services-container">
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div key={index} className="package-card">
              <div className="package-header">
                <h3>{pkg.name}</h3>
                <span className="package-price">{pkg.price}</span>
              </div>
              <ul className="package-features">
                {pkg.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="make-btn-container">
          <a href="#" className="make-now-btn">
            MAKE NOW
          </a>
        </div>
      </div>
    </section>
  );
};

interface NavigationProps {
  activeSection: string;
  scrollToTop: () => void;
  hideNav: boolean;
  isScrollingUp: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  scrollToTop,
  hideNav,
  isScrollingUp,
}) => {
  return (
    <>
      <a
        href="#"
        className={`logo-home ${activeSection === "home" ? "active" : ""} ${
          hideNav ? "hidden" : ""
        } ${isScrollingUp ? "scrolling-up" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
      >
        <img src={Logo} alt="SoulNotes Logo" />
      </a>
      <nav
        className={`footer-index konkhmer-sleokchher-regular ${
          hideNav ? "hidden" : ""
        } ${isScrollingUp ? "scrolling-up" : ""}`}
      >
        <a
          href="#services"
          className={activeSection === "services" ? "active" : ""}
        >
          SERVICES
        </a>
        <a
          href="#reviews"
          className={activeSection === "reviews" ? "active" : ""}
        >
          REVIEWS
        </a>
        <a href="#about" className={activeSection === "about" ? "active" : ""}>
          ABOUT US
        </a>
        <a
          href="#careers"
          className={activeSection === "careers" ? "active" : ""}
        >
          CAREERS
        </a>
      </nav>
    </>
  );
};

const Reviews: React.FC = () => {
  const fiveStarReviews: ReviewProps[] = [
    {
      name: "Priya Sharma",
      review:
        "This service transformed my grandmother's folk tales into beautiful melodies! The AI perfectly captured the emotions of our family stories. 100% worth it!",
      rating: 5,
      img: ps,
    },
    {
      name: "Arjun Patel",
      review:
        "As a songwriter, I'm amazed! Turned my childhood memories into a full musical composition. The Carnatic fusion style option was perfect for my Kerala stories.",
      rating: 5,
      img: ap,
    },
    {
      name: "Aanya Gupta",
      review:
        "Created a lullaby from my mother's bedtime stories. My baby now sleeps listening to our family legacy. The voice modulation options are incredible!",
      rating: 5,
      img: ag,
    },
    {
      name: "Rohan Iyer",
      review:
        "Converted our Diwali family anecdotes into a peppy Bollywood-style track. The whole family danced to it at the reunion! Excellent customization options.",
      rating: 5,
      img: ri,
    },
    {
      name: "Neha Joshi",
      review:
        "Turned my grandfather's freedom struggle stories into patriotic anthems. The AI understood the historical context and created moving background scores.",
      rating: 5,
      img: nj,
    },
    {
      name: "Vikram Singh",
      review:
        "Made wedding vows into a romantic ghazal. My wife cried happy tears when she heard it! The Urdu poetry adaptation was surprisingly accurate.",
      rating: 5,
      img: vs,
    },
  ];

  return (
    <section className="reviews-container fade-in">
      <div className="reviews-header">
        <h2 className="reviews-title">Read Our Customer's Satisfaction</h2>
      </div>
      <div className="reviews-grid">
        {fiveStarReviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.img} alt={review.name} />
            <div className="review-header">
              <h3>{review.name}</h3>
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
            <blockquote className="review-text">"{review.review}"</blockquote>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutUs: React.FC = () => {
  return (
    <section className="about-us fade-in">
      <h2>Who We Are</h2>
      <p>
        SoulNotes is an Australia-based company dedicated to making music deeply
        personal. With over 1,000 satisfied customers, we take pride in crafting
        custom songs that capture emotions, stories, and special moments.
      </p>
      <p>
        Now, we're thrilled to launch our services in India, offering
        personalized songs in four major languages: Hindi, Malayalam, Tamil, and
        English. No matter where you are, we bring music to life in a language
        that speaks to your heart.
      </p>
      <h2>What We Do</h2>
      <p>
        We specialize in creating custom songs for any occasion—whether it's a
        romantic gift, a wedding anthem, a heartfelt tribute, or background
        music for personal and professional use. Every song is 100% written and
        composed by our expert human team to ensure authenticity and emotional
        depth.
      </p>
      <p>
        Additionally, we've developed our very own AI-assisted singing
        technology, which allows us to deliver high-quality, customizable vocals
        with different pricing options based on whether you prefer AI-sung or
        human-recorded vocals.
      </p>
      <h2>Meet Our Team</h2>
      <p>Our team consists of passionate musicians and technologists...</p>
    </section>
  );
};

const Careers: React.FC = () => {
  return (
    <section className="careers-page fade-in">
      <h1 className="careers-title">Careers at SoulNotes</h1>
      <h2>Join Our Team – Let's Create Music Together</h2>
      <p>
        At SoulNotes, we believe in the power of music to tell stories, express
        emotions, and create lasting memories. As we expand our services in
        Australia and India, we are looking for passionate individuals to be
        part of our growing team.
      </p>
      <h3>Who We Are Looking For</h3>
      <p>We welcome applications from:</p>
      <ul>
        <li>
          Lyricists and Songwriters – Craft meaningful lyrics for custom songs
          in Hindi, Malayalam, Tamil, and English.
        </li>
        <li>
          Music Composers and Producers – Bring melodies to life with creative
          compositions.
        </li>
        <li>
          Vocalists and Singers – Perform soulful renditions of personalized
          songs.
        </li>
        <li>Sound Engineers – Mix, master, and refine tracks to perfection.</li>
        <li>Freelancers who want to collaborate with us on a project basis.</li>
      </ul>
      <h3>Why Work With Us</h3>
      <ul>
        <li>Flexible work opportunities with remote options</li>
        <li>Collaborate with a talented and professional team</li>
        <li>Your work will reach audiences in Australia and India</li>
        <li>Fair compensation for your skills and creativity</li>
      </ul>
      <h3>How to Apply</h3>
      <p>
        Email us at careers@soulnotes.com with your portfolio, demo, or samples.
        Contact us at +91 1234567890 for more details.
      </p>
      <p>Let's make music that truly connects.</p>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content-wrapper">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: contact@soulnotes.com</p>
            <p>Phone: +91 1234567890</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <img src={IG} alt="Instagram" />
              </a>
              <a href="#" aria-label="Facebook">
                <img src={FB} alt="Facebook" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={LI} alt="LinkedIn" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src={X} alt="Twitter" />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#reviews">Reviews</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <img src={Logo} alt="SoulNotes Logo" className="footer-logo" />
            <p>© 2025 SoulNotes. All rights reserved.</p>
            <p>Transforming emotions into melodies since 2023</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Made with ❤️ in India & Australia</p>
        </div>
      </div>
    </footer>
  );
};

export default FirstPage;
