import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Palette, Phone, Mail, Instagram, MapPin, ArrowRight, CheckCircle, TrendingUp, Eye, Award, Calendar, Clock, Zap, Menu, X } from "lucide-react";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav className={`nav-fixed nav-visible ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="vz-mark">VZ</span>
          <span className="nav-brand">VideoZak</span>
        </Link>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <Link to="/photography" className="nav-link">Photography</Link>
          <Link to="/branding" className="nav-link">Branding</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/contact" className="nav-link nav-cta">Book Now</Link>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headlineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(leftRef.current, { x: "-100%" }, { x: "0%", duration: 1, ease: "power3.out" });
      tl.fromTo(rightRef.current, { x: "100%" }, { x: "0%", duration: 1, ease: "power3.out" }, "<");
      tl.fromTo(headlineRef.current?.querySelectorAll(".headline-word") || [], { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page-home">
      <section ref={heroRef} className="hero-section">
        <div ref={leftRef} className="hero-left">
          <div className="hero-watermark">VZ</div>
          <div ref={headlineRef} className="hero-content">
            <div className="headline-word">CHICAGO</div>
            <div className="headline-word">BUSINESS</div>
            <div className="headline-word">PHOTOGRAPHY</div>
            <p className="hero-tagline">Built for Business. Shot for Results.</p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn-primary">Book a Shoot <ArrowRight size={18} /></Link>
              <Link to="/portfolio" className="btn-secondary">See Our Work</Link>
            </div>
          </div>
        </div>
        <div ref={rightRef} className="hero-right">
          <img src="/images/hero-photographer.jpg" alt="VideoZak photographer on location" />
          <div className="hero-overlay"></div>
        </div>
      </section>

      <section className="partner-section">
        <div className="partner-content">
          <div className="partner-badge">
            <div className="partner-logos">
              <span className="vz-mark-sm">VZ</span>
              <span className="partner-x">×</span>
              <span className="hw-mark">HW</span>
            </div>
            <p className="partner-text">Official Visual & Brand Partner · HostItWise Platform · Chicago Metro</p>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-container">
          <h2 className="section-title">Why It Matters</h2>
          <div className="stats-grid">
            {[
              { number: "97%", label: "Google First", description: "of customers Google a business before calling", icon: <TrendingUp size={32} /> },
              { number: "42%", label: "More Directions", description: "GBP listings with photos get more direction requests", icon: <MapPin size={32} /> },
              { number: "3.5×", label: "Brand Recall", description: "Businesses with consistent branding are more likely to be remembered", icon: <Eye size={32} /> }
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="integration-section">
        <div className="section-container">
          <div className="integration-content">
            <h2>Shoot Monday. Brand Tuesday. Site Live Friday.</h2>
            <p className="integration-tagline">The complete pipeline for Chicago businesses</p>
            <div className="integration-flow">
              <div className="flow-item">
                <div className="flow-icon"><Camera size={28} /></div>
                <h4>VideoZak</h4>
                <p>Visual identity & photos</p>
              </div>
              <div className="flow-arrow"><ArrowRight size={32} /></div>
              <div className="flow-item">
                <div className="flow-icon"><Zap size={28} /></div>
                <h4>HostItWise</h4>
                <p>Website & digital marketing</p>
              </div>
              <div className="flow-arrow"><ArrowRight size={32} /></div>
              <div className="flow-item">
                <div className="flow-icon"><Award size={28} /></div>
                <h4>You</h4>
                <p>Run your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-steps">
            {[
              { number: "01", title: "Book a free 15-minute call", description: "We learn your business and recommend the right package", icon: <Phone size={32} /> },
              { number: "02", title: "We show up", description: "Photography, logo, and brand assets handled completely", icon: <Camera size={32} /> },
              { number: "03", title: "Everything delivered in 48 hours", description: "Ready to plug into your website, GBP, and social", icon: <Zap size={32} /> }
            ].map((step, i) => (
              <div key={i} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="section-container" style={{textAlign:"center"}}>
          <h2 className="section-title" style={{color:"#fff"}}>Ready to look like a real brand?</h2>
          <p style={{color:"rgba(255,255,255,0.7)",marginBottom:"2rem",fontSize:"1.1rem"}}>Book a free 15-minute call. We shoot anywhere in the Chicago metro.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <Link to="/contact" className="btn-primary">Book a Shoot <ArrowRight size={18} /></Link>
            <Link to="/photography" className="btn-secondary">View Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const PhotographyPage = () => {
  const services = [
    { name: "Starter Shot", price: "$599", period: "one-time", description: "1.5 hours on-site. 15 edited deliverables. Owner portrait, storefront, interior, and one service in action.", pairs: "Pairs with HostItWise Base Website ($500) and Standard Website ($800–$1,000)", popular: true },
    { name: "Brand Day", price: "$1,799", period: "one-time", description: "Full day on-site. 50+ edited images. Team portraits, all services in action, exterior, interior, equipment, and detail shots.", pairs: "Powers 6 months of social content. Pairs with HostItWise Premium Website ($1,500)" },
    { name: "Quarterly Refresh", price: "$399", period: "/quarter", description: "10 fresh edited images every 3 months. Seasonal content, new services, new team.", pairs: "Designed to pair with HostItWise GBP Management ($99/mo) and Social packages" },
    { name: "Social Content Session", price: "$249", period: "one-time", description: "45-minute focused shoot. 8 images formatted for Instagram, Facebook, and Google Business Profile.", pairs: "Pairs with HostItWise Social Starter ($199/mo) and Social Growth ($399/mo)" },
    { name: "GBP Profile Pack", price: "$199", period: "add-on", description: "5 images shot and formatted specifically for Google Business Profile.", pairs: "Uploaded and optimized by the HostItWise team same week" }
  ];

  return (
    <div className="page-inner">
      <div className="page-hero-simple">
        <div className="section-container">
          <p className="page-eyebrow">Photography Services</p>
          <h1>Real Photos. Real Results.</h1>
          <p className="page-sub">Every package is shot on-site at your Chicago business and delivered in 48 hours.</p>
        </div>
      </div>
      <section className="services-section">
        <div className="section-container">
          <div className="service-category" style={{maxWidth:"900px",margin:"0 auto"}}>
            <div className="category-header"><Camera size={28} /><h3>Photography Packages</h3></div>
            <div className="service-cards">
              {services.map((service, i) => (
                <div key={i} className={`service-card ${service.popular ? "popular" : ""}`}>
                  {service.popular && <span className="popular-badge">Most Popular</span>}
                  <div className="service-header">
                    <h4>{service.name}</h4>
                    <div className="service-price">
                      <span className="price">{service.price}</span>
                      <span className="period">{service.period}</span>
                    </div>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <p className="service-pairs">{service.pairs}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"center",marginTop:"3rem"}}>
            <Link to="/contact" className="btn-primary">Book a Shoot <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const BrandingPage = () => {
  const services = [
    { name: "Logo Design", price: "$299", period: "one-time", description: "Custom logo built around your business name, colors, and industry. Delivered in PNG, SVG, and transparent formats. Includes 2 revision rounds.", pairs: "Pairs with any HostItWise website build — logo goes live the same week", popular: true },
    { name: "Brand Identity Package", price: "$599", period: "one-time", description: "Logo + color palette + typography selection + brand guidelines document. Everything for consistent brand presence.", pairs: "Pairs with HostItWise Premium Website ($1,500) and Brand Day photography" },
    { name: "Brand Refresh", price: "$399", period: "one-time", description: "For businesses with an existing logo that needs modernizing. Updated logo, adjusted color palette, new file formats.", pairs: "Ideal for businesses with pre-2018 visual identity" },
    { name: "Social Media Profile Setup", price: "$149", period: "one-time", description: "Profile photo, cover image, and highlight covers designed and sized correctly for Facebook, Instagram, and GBP.", pairs: "Pairs with any HostItWise social media plan" },
    { name: "Business Card & Print Design", price: "$199", period: "one-time", description: "Business card design (front and back), print-ready files, and recommended print vendor.", pairs: "Optional add-on with any branding package" }
  ];

  return (
    <div className="page-inner">
      <div className="page-hero-simple">
        <div className="section-container">
          <p className="page-eyebrow">Branding & Digital Identity</p>
          <h1>Look Like You Mean Business.</h1>
          <p className="page-sub">From logo to brand guidelines — everything you need to look consistent across every platform.</p>
        </div>
      </div>
      <section className="services-section">
        <div className="section-container">
          <div className="service-category" style={{maxWidth:"900px",margin:"0 auto"}}>
            <div className="category-header"><Palette size={28} /><h3>Branding Packages</h3></div>
            <div className="service-cards">
              {services.map((service, i) => (
                <div key={i} className={`service-card ${service.popular ? "popular" : ""}`}>
                  {service.popular && <span className="popular-badge">Most Popular</span>}
                  <div className="service-header">
                    <h4>{service.name}</h4>
                    <div className="service-price">
                      <span className="price">{service.price}</span>
                      <span className="period">{service.period}</span>
                    </div>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <p className="service-pairs">{service.pairs}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"center",marginTop:"3rem"}}>
            <Link to="/contact" className="btn-primary">Start Your Brand <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const PortfolioPage = () => {
  const items = [
    { image: "/images/portfolio-contractor.jpg", category: "Contractor", title: "Chicago Builders", result: "3× more quote requests" },
    { image: "/images/portfolio-hvac.jpg", category: "HVAC", title: "Comfort Systems", result: "150% increase in calls" },
    { image: "/images/portfolio-salon.jpg", category: "Salon", title: "C Studio", result: "Fully booked within 2 weeks" },
    { image: "/images/portfolio-restaurant.jpg", category: "Restaurant", title: "The Forge", result: "2× reservation rate" },
    { image: "/images/portfolio-landscaper.jpg", category: "Landscaper", title: "GreenScapes", result: "4× Google views" },
    { image: "/images/portfolio-team.jpg", category: "Behind the Scenes", title: "VideoZak Crew", result: "Professional production" },
    { image: "/images/spotlight-photographer.jpg", category: "On Location", title: "Shoot Day", result: "48hr delivery" },
    { image: "/images/process-photographer.jpg", category: "Process", title: "Behind the Camera", result: "Full production" },
    { image: "/images/portfolio-camera-detail.jpg", category: "Equipment", title: "Pro Gear", result: "Cinema quality" }
  ];

  return (
    <div className="page-inner">
      <div className="page-hero-simple">
        <div className="section-container">
          <p className="page-eyebrow">Portfolio</p>
          <h1>Chicago Businesses. Real Results.</h1>
          <p className="page-sub">Every image shot on-site. Every result verified. No stock photos.</p>
        </div>
      </div>
      <section className="portfolio-section">
        <div className="section-container">
          <div className="portfolio-grid">
            {items.map((item, i) => (
              <div key={i} className="portfolio-item">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <span className="portfolio-result">{item.result}</span>
                  </div>
                </div>
                <div className="portfolio-info">
                  <span className="portfolio-category">{item.category}</span>
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"3rem"}}>
            <Link to="/contact" className="btn-primary">Book Your Shoot <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => (
  <div className="page-inner">
    <section className="contact-section" style={{minHeight:"100vh",display:"flex",alignItems:"center"}}>
      <div className="section-container" style={{width:"100%"}}>
        <div className="contact-content">
          <h2>Ready to look like a real brand?</h2>
          <div className="contact-phone">
            <Phone size={32} />
            <a href="tel:630-670-6124">630-670-6124</a>
          </div>
          <p className="contact-description">Book a free 15-minute call. We shoot and brand anywhere in Cook, DuPage, Lake, Will, Kane, and McHenry counties.</p>
          <div className="contact-ctas">
            <a href="tel:630-670-6124" className="btn-primary"><Phone size={18} /> Call Now</a>
            <a href="mailto:hello@vzak.com" className="btn-secondary"><Mail size={18} /> Email Us</a>
          </div>
          <div className="contact-info">
            <div className="info-item"><MapPin size={18} /><span>Chicago, IL – All 6 counties served</span></div>
            <div className="info-item"><Clock size={18} /><span>48-hour delivery on all packages</span></div>
            <div className="info-item"><Calendar size={18} /><span>Book today, shoot this week</span></div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-main">
        <Link to="/" className="footer-brand">
          <span className="vz-mark">VZ</span>
          <span className="footer-brand-name">VideoZak</span>
        </Link>
        <div className="footer-partner">
          <span>Official Visual & Brand Partner</span>
          <span className="partner-divider">·</span>
          <span>HostItWise Platform</span>
        </div>
      </div>
      <div className="footer-links">
        <a href="tel:630-670-6124"><Phone size={16} /> 630-670-6124</a>
        <a href="mailto:hello@vzak.com"><Mail size={16} /> hello@vzak.com</a>
        <a href="https://instagram.com/videozak" target="_blank" rel="noopener noreferrer"><Instagram size={16} /> @videozak</a>
      </div>
      <div className="footer-bottom">
        <p>© 2025 VideoZak. All rights reserved.</p>
        <p>Chicago, IL · vzak.com</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/branding" element={<BrandingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
