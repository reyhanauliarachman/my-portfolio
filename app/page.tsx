"use client";
import { useEffect, useState } from "react";
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

export default function Page() {
  useEffect(() => {
    // Import ScrollReveal dengan cara yang benar
    import("scrollreveal").then((ScrollReveal) => {
      const sr = ScrollReveal.default();
      sr.reveal(".section", { delay: 200 });
    });
  }, []);

  const [velocity] = useState(0.8);

  return (
    <>
      <Head>
        <title>Mywebsite</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="swiper-bundle.min.css" />
        <script src="https://unpkg.com/scrollreveal"></script>
      </Head>

      {/* ======= Scroll to Top Button ======= */}
      <div className="scrollToTop-btn flex-center">
        <i className="fas fa-arrow-up"></i>
      </div>

      {/* ======= Theme Button ======= */}
      <div className="theme-btn flex-center">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
      </div>

      {/* ======= Header ======= */}
      <header>
        <div className="nav-bar">
          <a href="#" className="logo">
            Reyhan Aulia Rachman
          </a>
          <div className="navigation">
            <div className="nav-items">
              <div className="nav-close-btn"></div>
              <a className="active" href="#home">
                Home
              </a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="nav-menu-btn"></div>
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
            <a href="https://www.tiktok.com/@user83638292363?_r=1&_t=ZS-91AEMOE3kns">
              <i className="fab fa-tiktok"></i>
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
              avatarUrl="/images/card-profile.png"
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
              <h2>
                <TextType
                  text={["Hi, I'm Reyhan Aulia Rachman"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  className="text-typing"
                />
              </h2>

              <h3>
                <SplitText
                  text="Android Mobile Developer"
                  className="split-text"
                />
              </h3>

              <div className="description">
                <SplitText
                  text="I craft stunning mobile apps tailored for your business bringing extensive experience in mobile app design and development."
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
          <h1 className="section-title-01">About Me</h1>
          <h2 className="section-title-02">About Me</h2>
          <div className="content flex-center">
            <div className="about-img">
              <img src="/images/IMG_0263.jpg" alt="Profile Picture" />
            </div>
            <div className="about-info">
              <div className="description">
                <h3>I'm Reyhan</h3>
                <p>
                  I design and develop sleek, modern mobile apps tailored to
                  customer needs. Passionate about crafting seamless digital
                  experiences through intuitive interactions. Explore my
                  portfolio!
                </p>
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
              <a href="#" className="btn">
                Download CV <i className="fas fa-download"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======= Skills Section ======= */}
      <section className="skills section" id="skills">
        <div className="container flex-center">
          <h1 className="section-title-01">Skills</h1>
          <h2 className="section-title-02">Skills</h2>

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
            <div className="education">
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
                    <span>March 2021 - Present</span>
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
          <h1 className="section-title-01">Portfolio</h1>
          <h2 className="section-title-02">Portfolio</h2>
          <div className="content">
            <div className="portfolio-list">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="img-card-container" key={i}>
                  <div className="img-card">
                    <div className="overlay"></div>
                    <div className="info">
                      <h3>Web Design</h3>
                      <span>Youtube</span>
                    </div>
                    <img src={`images/porto1.png`} alt={`Portfolio${i}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
          <h1 className="section-title-01">Contact Me</h1>
          <h2 className="section-title-02">Contact Me</h2>
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
              <form className="contact-form">
                <div className="first-row">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="second-row">
                  <input type="email" placeholder="Your Email" />
                  <input type="text" placeholder="Subject" />
                </div>
                <div className="third-row">
                  <textarea rows={7} placeholder="Message"></textarea>
                </div>
                <button className="btn" type="submit">
                  Send Message <i className="fas fa-paper-plane"></i>
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
                <a href="https://www.tiktok.com/@user83638292363?_r=1&_t=ZS-91AEMOE3kns">
                  <i className="fab fa-tiktok"></i>
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
