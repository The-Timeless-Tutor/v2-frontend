import React from "react";
import Card from "./card";
import Slider from "react-slick";
import { features } from "../_mock/features";
import FeatureCard from "./feature-card";

const Features = () => {
  console.log(features);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  return (
    <div className="w-full bg-white py-24 relative">
      <div className="md:max-w-[1370px] m-auto max-w-[600px] px-4 py-8 md:py-14 border shadow-xl rounded-3xl relative z-10">
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
