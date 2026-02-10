"use client";
import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import "./style.css";
import "swiper/css";
import TextType from "@/components/TextType";
import SplitText from "@/components/SplitText";
import "@/components/TextType.css";
import DomeGallery from "@/components/DomeGallery";
import { TOOL_IMAGES } from "@/data/tools";
import HyperspeedBackground from "@/components/Hyperspeed/HyperspeedBackground";
import ProfileCard from "@/components/Profilecard/ProfileCard";
import ScrollVelocity from "@/components/Scrollvelocity/ScrollVelocity";
import ElectricBorder from "@/components/Electric-border/ElectricBorder";
import ShinyText from "@/components/ShinyText";
import emailjs from "@emailjs/browser";

const sections = ["home", "about", "skills", "portfolio", "contact"];

export default function Page() {
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      )
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          formRef.current?.reset();
        },
        (error) => {
          console.error(error);
          setLoading(false);
          alert("Failed to send message 😢");
        }
      );
  };

  const closePortfolio = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedPortfolio(null);
  };

  useEffect(() => {
    if (!selectedPortfolio) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePortfolio();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPortfolio]);

  // === ScrollReveal (once) ===
  useEffect(() => {
    import("scrollreveal").then((ScrollReveal) => {
      ScrollReveal.default().reveal(".section", {
        delay: 100,
        distance: "40px",
        duration: 600,
        easing: "ease-out",
        reset: false,
      });
    });
  }, []);

  // === Sticky Header + ScrollSpy ===
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");

    if (!header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMenu(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3, // 🔥 lebih responsif
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const onScroll = () => {
      header.classList.toggle("sticky", window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // === Smooth Scroll with Header Offset ===
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 80; // tinggi header
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Health Hub",
      category: "Mobile App using Flutter",
      video: "/videos/healthub.mp4",
      images: [
        "/images/healthhub/1.png",
        "/images/healthhub/2.png",
        "/images/healthhub/3.png",
        "/images/healthhub/4.png",
        "/images/healthhub/5.png",
        "/images/healthhub/6.png",
        "/images/healthhub/7.png",
        "/images/healthhub/8.png",
        "/images/healthhub/9.png",
      ],
    },
    {
      id: 2,
      title: "SmartMed",
      category: "Mobile App using Kotlin",
      video: "/videos/smartmed.mp4",
      images: [
        "/images/smartmed/1.png",
        "/images/smartmed/2.png",
        "/images/smartmed/3.png",
        "/images/smartmed/4.png",
        "/images/smartmed/5.png",
        "/images/smartmed/6.png",
        "/images/smartmed/7.png",
        "/images/smartmed/8.png",
        "/images/smartmed/9.png",
        "/images/smartmed/10.png",
      ],
    },
    {
      id: 3,
      title: "Churn Analysis",
      category: "Dashboard Data Analysis using React",
      video: "/videos/analyze.mp4",
      images: [
        "/images/churn/1.png",
        "/images/churn/2.png",
        "/images/churn/3.png",
        "/images/churn/4.png",
        "/images/churn/5.png",
        "/images/churn/6.png",
        "/images/churn/7.png",
        "/images/churn/8.png",
        "/images/churn/9.png",
        "/images/churn/10.png",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Mywebsite</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* ======= HEADER ======= */}
      <header>
        <div className="nav-bar">
          <span className="logo" onClick={() => scrollToSection("home")}>
            Reyhan Aulia Rachman
          </span>

          <nav className="navigation">
            <div className="nav-items">
              {sections.map((item) => (
                <span
                  key={item}
                  className={activeMenu === item ? "active" : ""}
                  onClick={() => scrollToSection(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* ======= Home Section ======= */}
      <section
        className="home flex-center"
        id="home"
        style={{ position: "relative", zIndex: 10, background: "transparent" }}
      >
        {/* ===== Hyperspeed Background ===== */}
        <HyperspeedBackground
          length={400}
          roadWidth={10}
          lanesPerRoad={4}
          isHyper={true}
          className="hyperspeed-bg"
          style={{ pointerEvents: "none" }}
        />

        <div className="home-container">
          <div className="media-icons">
            <a href="https://www.linkedin.com/in/reyhan-aulia-rachman-48206922b">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/reyyrach_?igsh=MTYzNzZ4b2d4dzJqNA==">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://github.com/reyhanauliarachman">
              <i className="fab fa-github"></i>
            </a>
          </div>

          {/* === ProfileCard === */}
          <div className="profile-card-wrapper" style={{ marginTop: "40px" }}>
            <ProfileCard
              name="Reyhan"
              title="Android Mobile Developer"
              handle="reyhanaulia"
              status="Available for Projects"
              contactText="Contact Me"
              avatarUrl="/images/profile.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
          <div className="info">
            <div className="typing-container">
              <h2 className="typing-wrapper">
                {isMobile ? (
                  <span className="text-typing static-text">
                    Hi, I'm Reyhan Aulia Rachman
                  </span>
                ) : (
                  <TextType
                    text={["Hi, I'm Reyhan Aulia Rachman"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className="text-typing"
                  />
                )}
              </h2>

              <h3>
                <SplitText
                  text="Android Mobile Developer"
                  className="split-text job-title"
                />
              </h3>

              <div className="description">
                <SplitText
                  text="I build reliable and scalable Android applications with a strong focus on performance, clean architecture, and user experience. From idea to deployment, I turn complex requirements into elegant mobile solutions."
                  className="split-text"
                  textAlign="left"
                  tag="p"
                />
              </div>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-down">
          Scroll Down <i className="fas fa-arrow-down"></i>
        </a>
      </section>

      {/* ======= About Section ======= */}
      <section className="about section" id="about">
        <div className="container flex-center">
          <h1 className="section-title-01">
            <ShinyText
              text="About Me"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h1>

          <h2 className="section-title-02">
            <ShinyText
              text="About Me"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h2>

          <div className="content flex-center">
            <div className="about-img">
              <img src="/images/IMG_0263.jpg" alt="Profile Picture" />
            </div>
            <div className="about-info">
              <div className="description">
                <h3>
                  <SplitText text="Im, Reyhan" className="split-text" />
                </h3>
                <div className="shiny-border">
                  <div className="shiny-wrapper">
                    <ShinyText
                      text="I specialize in building modern, high-performance Android applications with a strong focus on clean architecture, scalability, and user experience. I enjoy transforming complex ideas into intuitive digital products that deliver real value for users and businesses."
                      disabled={false}
                      speed={3}
                      className="custom-class"
                    />

                    <ShinyText
                      text="With hands on experience in mobile development and system integration, I continuously strive to write clean, maintainable code while keeping performance and usability at the core of every project."
                      disabled={false}
                      speed={3}
                      className="custom-class mt-4"
                    />
                  </div>
                </div>
              </div>
              <ul className="professional-list">
                <li className="list-item">
                  <h3>2+</h3>
                  <span>
                    Years of
                    <br />
                    Experience
                  </span>
                </li>
                <li className="list-item">
                  <h3>2+</h3>
                  <span>
                    Success
                    <br />
                    Projects
                  </span>
                </li>
              </ul>
              <a
                href="/cv/CV-Reyhan-Aulia-Rachman.pdf"
                download="Reyhan-Aulia-Rachman.pdf"
                className="btn"
              >
                Download CV <i className="fas fa-download"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Skills Section ======= */}
      <section className="skills section" id="skills">
        <div className="container flex-center">
          <h1 className="section-title-01">
            <ShinyText
              text="Skills"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h1>

          <h2 className="section-title-02">
            <ShinyText
              text="Skills"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h2>

          <div className="content">
            {/* ScrollVelocity Full Width */}
            <div className="scrollvelocity-wrapper">
              <ScrollVelocity
                texts={["My Expertise ✦ ", "Tools & Technology"]}
                velocity={20}
                className="custom-scroll-text"
              />
            </div>

            {/* Dome Gallery */}
            <div className="education dome-wrapper">
              <DomeGallery images={TOOL_IMAGES} fit={0.6} />
            </div>

            {/* Work & Experience */}
            <div className="skills-description">
              <h3>Work & Experience</h3>
            </div>

            <div className="skills-info">
              {/* Experience Card 1 */}
              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="experience-card">
                  <div className="upper">
                    <h3>Badan Pusat Statistik</h3>
                    <h5>Data Operator</h5>
                    <span>March 2021 - November 2025</span>
                  </div>
                  <div className="hr"></div>
                  <h4>
                    <label>National Population Survey</label>
                  </h4>
                  <p>
                    I updated the population data from the census and adjusted
                    the North Jakarta area using QGIS.
                  </p>
                </div>
              </ElectricBorder>

              {/* Experience Card 2 */}
              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="experience-card">
                  <div className="upper">
                    <h3>
                      Bangkit Academy led by Google, Tokopedia, Gojek, &
                      Traveloka
                    </h3>
                    <span>September 2024 - December 2024</span>
                  </div>
                  <div className="hr"></div>
                  <h4>
                    <label>Mobile Development Cohort</label>
                  </h4>
                  <p>
                    I specialize in designing and developing Android mobile
                    applications using the Kotlin programming language.
                  </p>
                </div>
              </ElectricBorder>

              {/* Experience Card 3 */}
              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="experience-card">
                  <div className="upper">
                    <h3>Full Stack Android Developer</h3>
                    <h5>Full Time | InHouse</h5>
                    <span>January 2023 - Present</span>
                  </div>
                  <div className="hr"></div>
                  <h4>
                    <label>Flutter & Kotlin</label>
                  </h4>
                  <p>
                    I design, develop, and create dynamic Android mobile
                    applications using Flutter and Kotlin.
                  </p>
                </div>
              </ElectricBorder>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Portfolio Section ======= */}
      <section className="portfolio section" id="portfolio">
        <div className="container flex-center">
          <h1 className="section-title-01">
            <ShinyText
              text="Portfolio"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h1>

          <h2 className="section-title-02">
            <ShinyText
              text="Portfolio"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h2>
          <div className="content">
            <div className="portfolio-list">
              {portfolioItems.map((item) => (
                <div
                  className="img-card-container"
                  key={item.id}
                  onClick={() => setSelectedPortfolio(item)}
                >
                  <div className="img-card">
                    <div className="overlay"></div>

                    <div className="info">
                      <h3>{item.title}</h3>
                      <span>{item.category}</span>
                    </div>

                    {/* VIDEO THUMBNAIL */}
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="portfolio-video-thumb"
                    />

                    <span className="video-badge"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedPortfolio && (
          <div className="portfolio-modal active" onClick={closePortfolio}>
            <div
              className="portfolio-modal-body"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button className="modal-close" onClick={closePortfolio}>
                ✕
              </button>

              {/* HEADER */}
              <div className="modal-header">
                <h3>{selectedPortfolio.title}</h3>
                <span>{selectedPortfolio.category}</span>
              </div>

              {/* SLIDER */}
              <div className="modal-slider">
                <img
                  key={currentSlide}
                  src={selectedPortfolio.images[currentSlide]}
                  alt="portfolio"
                />

                <button
                  className="nav prev"
                  onClick={() =>
                    setCurrentSlide(
                      (prev) =>
                        (prev - 1 + selectedPortfolio.images.length) %
                        selectedPortfolio.images.length
                    )
                  }
                >
                  ‹
                </button>

                <button
                  className="nav next"
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev + 1) % selectedPortfolio.images.length
                    )
                  }
                >
                  ›
                </button>
              </div>

              {/* DOTS */}
              <div className="slider-dots">
                {selectedPortfolio.images.map((image: string, idx: number) => (
                  <span
                    key={idx}
                    className={idx === currentSlide ? "dot active" : "dot"}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="get-in-touch sub-section">
          <div className="container">
            <div className="content flex-center">
              <div className="contact-card flex-center">
                <div className="title">
                  <h4>Let's talk</h4>
                  <h3>About Your</h3>
                  <h2>Next Project</h2>
                </div>
                <div className="contact-btn">
                  <span className="comet"></span>
                  <a href="https://wa.me/6287771670875" className="btn">
                    Click here <i className="fas fa-paper-plane"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Contact Section ======= */}
      <section className="contact section" id="contact">
        <div className="container flex-center">
          <h1 className="section-title-01">
            <ShinyText
              text="Contact Me"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h1>

          <h2 className="section-title-02">
            <ShinyText
              text="Contact Me"
              disabled={false}
              speed={3}
              className="shiny-title"
            />
          </h2>
          <div className="content">
            <div className="contact-left">
              <h2>Let's discuss your project</h2>
              <ul className="contact-list">
                <li>
                  <h3 className="item-title">
                    <i className="fas fa-phone"></i> Phone
                  </h3>
                  <span>087771670875</span>
                </li>
                <li>
                  <h3 className="item-title">
                    <i className="fas fa-envelope"></i> Email Address
                  </h3>
                  <span>
                    <a href="mailto:reyhanaulia09@gmail.com">
                      reyhanaulia09@gmail.com
                    </a>
                  </span>
                </li>
                <li>
                  <h3 className="item-title">
                    <i className="fas fa-map-marker-alt"></i> Official Address
                  </h3>
                  <span>Bekasi, Indonesia</span>
                </li>
              </ul>
            </div>

            <div className="contact-right">
              <p>
                I'm always open to discussing product
                <br />
                <span>design work or partnerships.</span>
              </p>
              <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                <div className="first-row">
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="second-row">
                  <input
                    type="email"
                    name="from_email"
                    placeholder="Your Email"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="third-row">
                  <textarea
                    name="message"
                    rows={7}
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer>
        <div className="footer-container">
          <div className="about group">
            <h2>Reyhan</h2>
            <p>Android Mobile Developer</p>
            <a href="#about">About Me</a>
          </div>

          <div className="hr"></div>

          <div className="info group">
            <h3>More</h3>
            <ul>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="hr"></div>

          <div className="follow group">
            <h3>Follow</h3>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/reyhan-aulia-rachman-48206922b">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/reyyrach_?igsh=MTYzNzZ4b2d4dzJqNA==">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/reyhanauliarachman">
                  <i className="fab fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright group">
          <p>© 2025 Reyhan Aulia Rachman. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
