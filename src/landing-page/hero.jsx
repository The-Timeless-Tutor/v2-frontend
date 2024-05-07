import React from "react";
import { heroImg } from "../../public/assets/landing-assets";

const Hero = () => {
  return (
    <div className="w-full bg-white pt-24 md:pt-44">
      <div className="flex flex-col justify-start gap-4 mx-auto md:max-w-[1480px]">
        <div className="flex justify-center md:order-last  order-first">
          <img src={heroImg} alt="hero image" />
        </div>
        <div className="flex flex-col justify-start gap-4 text-center md:max-w-4xl md:mx-auto">
          <h1 className="md:leading-[72px] py-2 md:text-6xl text-3xl font-semibold">
            Empowering growth through mentorship connections
          </h1>
          <p className="py-2 text-md md:text-lg text-primary">
            Discover personalized mentorship connections tailored to your goals and interests,
            guiding you towards growth and success on your journey.
          </p>

          <div className="flex justify-center items-center">
            <button className="px-8 py-3 rounded-full bg-brand text-white font-bold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
