import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Camera, 
  Palette, 
  Phone, 
  Mail, 
  Instagram, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Eye,
  Award,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`nav-fixed ${scrolled ? 'nav-visible' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo">
          <span className="vz-mark">VZ</span>
          <span className="nav-brand">VideoZak</span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
          <button onClick={() => scrollToSection('portfolio')} className="nav-link">Portfolio</button>
          <button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link nav-cta">Book Now</button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation
      const loadTl = gsap.timeline({ delay: 0.3 });
      
      loadTl.fromTo(
        leftPanelRef.current,
        { x: '-100%' },
        { x: '0%', duration: 1, ease: 'power3.out' }
      );
      
      loadTl.fromTo(
        rightPanelRef.current,
        { x: '100%' },
        { x: '0%', duration: 1, ease: 'power3.out' },
        '<'
      );

      loadTl.fromTo(
        headlineRef.current?.querySelectorAll('.headline-word') || [],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );

      // Scroll exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
        },
      });

      scrollTl.fromTo(
        leftPanelRef.current,
        { x: '0%' },
        { x: '-100%', ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '0%' },
        { x: '100%', ease: 'power2.in' },
        0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero-section">
      <div ref={leftPanelRef} className="hero-left">
        <div className="hero-watermark">VZ</div>
        <div ref={headlineRef} className="hero-content">
          <div className="headline-word">CHICAGO</div>
          <div className="headline-word">BUSINESS</div>
          <div className="headline-word">PHOTOGRAPHY</div>
          <p className="hero-tagline">Built for Business. Shot for Results.</p>
          <div className="hero-ctas">
            <button onClick={() => scrollToSection('contact')} className="btn-primary">
              Book a Shoot <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="btn-secondary">
              See Our Work
            </button>
          </div>
        </div>
      </div>
      <div ref={rightPanelRef} className="hero-right">
        <img src="/images/hero-photographer.jpg" alt="VideoZak photographer on location" />
        <div className="hero-overlay"></div>
      </div>
    </section>
  );
};

// Partner Badge Section
const PartnerBadgeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.partner-content'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="partner-section">
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
  );
};

// Why It Matters Section
const WhyMattersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.stat-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      number: '97%',
      label: 'Google First',
      description: 'of customers Google a business before calling',
      icon: <TrendingUp size={32} />
    },
    {
      number: '42%',
      label: 'More Directions',
      description: 'GBP listings with photos get more direction requests',
      icon: <MapPin size={32} />
    },
    {
      number: '3.5×',
      label: 'Brand Recall',
      description: 'Businesses with consistent branding are more likely to be remembered',
      icon: <Eye size={32} />
    }
  ];

  return (
    <section ref={sectionRef} id="why" className="why-section">
      <div className="section-container">
        <h2 className="section-title">Why It Matters</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.service-category'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const photographyServices = [
    {
      name: 'Starter Shot',
      price: '$599',
      period: 'one-time',
      description: '1.5 hours on-site. 15 edited deliverables. Owner portrait, storefront, interior, and one service in action.',
      pairs: 'Pairs with HostItWise Base Website ($500) and Standard Website ($800`€“$1,000)',
      popular: true
    },
    {
      name: 'Brand Day',
      price: '$1,799',
      period: 'one-time',
      description: 'Full day on-site. 50+ edited images. Team portraits, all services in action, exterior, interior, equipment, and detail shots.',
      pairs: 'Powers 6 months of social content. Pairs with HostItWise Premium Website ($1,500)'
    },
    {
      name: 'Quarterly Refresh',
      price: '$399',
      period: '/quarter',
      description: '10 fresh edited images every 3 months. Seasonal content, new services, new team.',
      pairs: 'Designed to pair with HostItWise GBP Management ($99/mo) and Social packages'
    },
    {
      name: 'Social Content Session',
      price: '$249',
      period: 'one-time',
      description: '45-minute focused shoot. 8 images formatted for Instagram, Facebook, and Google Business Profile.',
      pairs: 'Pairs with HostItWise Social Starter ($199/mo) and Social Growth ($399/mo)'
    },
    {
      name: 'GBP Profile Pack',
      price: '$199',
      period: 'add-on',
      description: '5 images shot and formatted specifically for Google Business Profile: storefront, interior, team, service in action, owner.',
      pairs: 'Uploaded and optimized by the HostItWise team same week'
    }
  ];

  const brandingServices = [
    {
      name: 'Logo Design',
      price: '$299',
      period: 'one-time',
      description: 'Custom logo built around your business name, colors, and industry. Delivered in PNG, SVG, and transparent formats.',
      pairs: 'Pairs with any HostItWise website build `€” logo goes live the same week',
      popular: true
    },
    {
      name: 'Brand Identity Package',
      price: '$599',
      period: 'one-time',
      description: 'Logo + color palette + typography selection + brand guidelines document. Everything for consistent brand presence.',
      pairs: 'Pairs with HostItWise Premium Website ($1,500) and Brand Day photography'
    },
    {
      name: 'Brand Refresh',
      price: '$399',
      period: 'one-time',
      description: 'For businesses with an existing logo that needs modernizing. Updated logo, adjusted color palette, new file formats.',
      pairs: 'Ideal for businesses with pre-2018 visual identity'
    },
    {
      name: 'Social Media Profile Setup',
      price: '$149',
      period: 'one-time',
      description: 'Profile photo, cover image, and highlight covers designed and sized correctly for Facebook, Instagram, and GBP.',
      pairs: 'Pairs with any HostItWise social media plan'
    },
    {
      name: 'Business Card & Print Design',
      price: '$199',
      period: 'one-time',
      description: 'Business card design (front and back), print-ready files, and recommended print vendor.',
      pairs: 'Optional add-on with any branding package'
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="services-section">
      <div className="section-container">
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">Priced to pair with HostItWise exactly</p>
        
        <div className="services-grid">
          <div className="service-category">
            <div className="category-header">
              <Camera size={28} />
              <h3>Photography</h3>
            </div>
            <div className="service-cards">
              {photographyServices.map((service, index) => (
                <div key={index} className={`service-card ${service.popular ? 'popular' : ''}`}>
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

          <div className="service-category">
            <div className="category-header">
              <Palette size={28} />
              <h3>Branding & Digital Identity</h3>
            </div>
            <div className="service-cards">
              {brandingServices.map((service, index) => (
                <div key={index} className={`service-card ${service.popular ? 'popular' : ''}`}>
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
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.process-step'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Book a free 15-minute call',
      description: 'We learn your business and recommend the right package',
      icon: <Phone size={32} />
    },
    {
      number: '02',
      title: 'We show up',
      description: 'Photography, logo, and brand assets handled completely',
      icon: <Camera size={32} />
    },
    {
      number: '03',
      title: 'Everything delivered in 48 hours',
      description: 'Ready to plug into your website, GBP, and social',
      icon: <Zap size={32} />
    }
  ];

  return (
    <section ref={sectionRef} className="process-section">
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.portfolio-item'),
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const portfolioItems = [
    {
      image: '/images/portfolio-contractor.jpg',
      category: 'Contractor',
      title: 'Chicago Builders',
      result: '3× more quote requests'
    },
    {
      image: '/images/portfolio-hvac.jpg',
      category: 'HVAC',
      title: 'Comfort Systems',
      result: '150% increase in calls'
    },
    {
      image: '/images/portfolio-salon.jpg',
      category: 'Salon',
      title: 'C Studio',
      result: 'Fully booked within 2 weeks'
    },
    {
      image: '/images/portfolio-restaurant.jpg',
      category: 'Restaurant',
      title: 'The Forge',
      result: '2× reservation rate'
    },
    {
      image: '/images/portfolio-landscaper.jpg',
      category: 'Landscaper',
      title: 'GreenScapes',
      result: '4× Google views'
    },
    {
      image: '/images/portfolio-team.jpg',
      category: 'Behind the Scenes',
      title: 'VideoZak Crew',
      result: 'Professional production'
    }
  ];

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section">
      <div className="section-container">
        <h2 className="section-title">Chicago Businesses</h2>
        <p className="section-subtitle">Real results for real local businesses</p>
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item">
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
      </div>
    </section>
  );
};

// HostItWise Integration Section
const IntegrationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.integration-content'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="integration-section">
      <div className="section-container">
        <div className="integration-content">
          <div className="integration-header">
            <h2>Shoot Monday. Brand Tuesday. Site Live Friday.</h2>
            <p className="integration-tagline">The complete pipeline for Chicago businesses</p>
          </div>
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
          <p className="integration-description">
            VideoZak handles visual identity and photos. HostItWise handles the website and ongoing digital marketing. 
            You just run your business. Every service VideoZak offers is designed to feed directly into your 
            website, Google Business Profile, and social media presence.
          </p>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.testimonial-card'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "Before VideoZak, our Google listing had 3 photos from 2016. Now we get 3-4 calls a week saying they found us online and 'we looked professional.'",
      author: 'Mike Torres',
      business: 'Torres HVAC',
      result: '3× more calls'
    },
    {
      quote: "The Brand Day package gave us 6 months of content. Our Instagram went from 200 followers to 2,400 in 3 months. Bookings are up 40%.",
      author: 'Sarah Chen',
      business: 'C Studio Salon',
      result: '40% more bookings'
    },
    {
      quote: "We needed photos for our new website launch. VideoZak shot Monday, HostItWise had the site live Friday. We had our first online reservation that weekend.",
      author: 'David Park',
      business: 'The Forge Restaurant',
      result: 'First online reservation in 5 days'
    }
  ];

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="section-container">
        <h2 className="section-title">What Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-result">{testimonial.result}</div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.business}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Table Section
const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.pricing-table'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const bundles = [
    {
      name: 'Contractor Starter Bundle',
      items: ['Starter Shot ($599)', 'Logo Design ($299)'],
      total: '$898',
      pairs: 'Pairs with HostItWise Contractor Bundle ($1,099)',
      description: 'Everything a trade business needs to launch: website, logo, and photos in one week.'
    },
    {
      name: 'Brand Launch Bundle',
      items: ['Brand Day ($1,799)', 'Brand Identity Package ($599)'],
      total: '$2,398',
      pairs: 'Pairs with HostItWise Restaurant/Salon Bundle ($2,599)',
      description: 'Full visual identity and content library for businesses ready to dominate their category.'
    },
    {
      name: 'Digital Presence Pack',
      items: ['Social Media Profile Setup ($149)', 'GBP Profile Pack ($199)', 'Social Content Session ($249)'],
      total: '$597',
      pairs: 'Every platform covered',
      description: 'Every platform covered, every image optimized, ready to publish day one.'
    },
    {
      name: 'Growth Content Bundle',
      items: ['Quarterly Refresh ($399/quarter)', 'Social Media Profile Setup ($149) one-time'],
      total: '$548',
      pairs: 'Pairs with HostItWise Growth Bundle ($647/mo)',
      description: 'Always-fresh content for businesses running monthly social management.'
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" className="pricing-section">
      <div className="section-container">
        <h2 className="section-title">Bundles</h2>
        <p className="section-subtitle">Mirror HostItWise bundles exactly</p>
        <div className="bundles-grid">
          {bundles.map((bundle, index) => (
            <div key={index} className="bundle-card">
              <h4>{bundle.name}</h4>
              <ul className="bundle-items">
                {bundle.items.map((item, i) => (
                  <li key={i}><CheckCircle size={16} /> {item}</li>
                ))}
              </ul>
              <div className="bundle-total">{bundle.total}</div>
              <p className="bundle-pairs">{bundle.pairs}</p>
              <p className="bundle-description">{bundle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact CTA Section
const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.contact-content'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="section-container">
        <div className="contact-content">
          <h2>Ready to look like a real brand?</h2>
          <div className="contact-phone">
            <Phone size={32} />
            <a href="tel:630-670-6124">630-670-6124</a>
          </div>
          <p className="contact-description">
            Book a free 15-minute call. We shoot and brand anywhere in Cook, DuPage, Lake, Will, Kane, and McHenry counties.
          </p>
          <div className="contact-ctas">
            <a href="tel:630-670-6124" className="btn-primary">
              <Phone size={18} /> Call Now
            </a>
            <a href="mailto:hello@vzak.com" className="btn-secondary">
              <Mail size={18} /> Email Us
            </a>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <MapPin size={18} />
              <span>Chicago, IL `€” All 6 counties served</span>
            </div>
            <div className="info-item">
              <Clock size={18} />
              <span>48-hour delivery on all packages</span>
            </div>
            <div className="info-item">
              <Calendar size={18} />
              <span>Book today, shoot this week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="vz-mark">VZ</span>
            <span className="footer-brand-name">VideoZak</span>
          </div>
          <div className="footer-partner">
            <span>Official Visual & Brand Partner</span>
            <span className="partner-divider">·</span>
            <span>HostItWise Platform</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="tel:630-670-6124"><Phone size={16} /> 630-670-6124</a>
          <a href="mailto:hello@vzak.com"><Mail size={16} /> hello@vzak.com</a>
          <a href="https://instagram.com/videozak" target="_blank" rel="noopener noreferrer">
            <Instagram size={16} /> @videozak
          </a>
        </div>
        <div className="footer-bottom">
          <p>© 2024 VideoZak. All rights reserved.</p>
          <p>Chicago, IL · vzak.com</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app">
      <Navigation />
      <main>
        <HeroSection />
        <PartnerBadgeSection />
        <WhyMattersSection />
        <ServicesSection />
        <HowItWorksSection />
        <PortfolioSection />
        <IntegrationSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
