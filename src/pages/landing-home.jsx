import {
  Hero,
  Navbar,
  Companies,
  Courses,
  Achievement,
  Categories,
  Feedback,
  CTA,
  Footer,
  Features
} from "../landing-page";

function LandingHome() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden px-6">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <Features />
        {/* <Companies /> */}
        {/* <Courses /> */}
        <Achievement />
        <Categories />
        <Feedback />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default LandingHome;
