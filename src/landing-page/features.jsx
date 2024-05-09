import React from "react";
import { features } from "../_mock/features";
import FeatureCard from "./feature-card";

const Features = () => {
  return (
    <div className="w-full bg-white py-8 px-2 md:py-16 md:px-8 relative">
      <div className="md:max-w-[1370px] m-auto max-w-[600px] px-4 py-8 md:py-14 border shadow-md rounded-3xl relative z-10 backdrop-blur-3xl bg-white/50">
        <div className="absolute inset-0 bg-[url('/public/assets/landing-assets/ttt-logo.png')] bg-cover bg-center opacity-5"></div>
        <div className="py-4 text-center max-w-[700px] m-auto">
          <h1 className="py-3 text-3xl md:text-4xl font-bold">Why Timeless Tutor?</h1>
          <p className="text-primary pt-2">
            Timeless Tutor provides extensive list of features for every kind of users; be you a
            cyclist or an avid mathematician, we have it all.
          </p>
        </div>

        <div className="flex-col p-4 md:flex-row md:px-24 md:py-14 flex gap-10 rounded-3xl">
          {/* <Slider {...settings}> */}
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  );
};

export default Features;
