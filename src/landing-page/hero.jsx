import React from "react";
import { heroImg, heroImg1, heroImg2, heroImg3 } from "../../public/assets/landing-assets";

const Hero = () => {
  return (
    <div className="w-full bg-white pt-24 md:pt-44">
      <div className="flex flex-col justify-start gap-4 mx-auto md:max-w-[1480px]">
        <div className="flex justify-center md:order-last order-first">
          <div className="relative w-full md:w-3/4 flex justify-center">
            {/* Left Image */}
            <img
              src={heroImg3}
              alt="Left Card"
              className="absolute left-0 transform rotate-[-5deg] z-10 hover:rotate-[-5deg] hover:scale-105 transition-all duration-300 ease-in-out"
              style={{ width: "40%" }}
            />
            {/* Center Image */}
            <img
              src={heroImg1}
              alt="Center Card"
              className="relative z-20 hover:scale-110 transition-all duration-300 ease-in-out mt-20"
              style={{ width: "75%" }}
            />
            {/* Right Image */}
            <img
              src={heroImg2}
              alt="Right Card"
              className="absolute right-0 transform rotate-[5deg] z-10 hover:rotate-[5deg] hover:scale-105 transition-all duration-300 ease-in-out"
              style={{ width: "40%" }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 text-center md:max-w-4xl md:mx-auto">
          <h1 className="md:leading-[72px] py-2 md:text-5xl text-3xl font-semibold">
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
