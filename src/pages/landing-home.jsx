import {
  Hero,
  Navbar,
  Offers,
  Categories,
  Testimonials,
  CTA,
  Footer,
  Features
} from '../sections/landing-page';

function LandingHome() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden px-2">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <Features />
        <Offers />
        <Categories />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default LandingHome;
