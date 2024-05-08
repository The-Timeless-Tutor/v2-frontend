import React from "react";
import {
  featureMentoring,
  iconOnetoOne,
  iconGroup,
  iconIdea
} from "../../public/assets/landing-assets";

const offers = [
  {
    id: 1,
    icon: iconOnetoOne,
    title: "1:1 Sessions",
    description:
      "1:1 Sessions helps you to have a more interactive session with your mentor for an in-depth discussion about a sub-topic."
  },
  {
    id: 2,
    icon: iconGroup,
    title: "Group Sessions",
    description:
      "Group Sessions is our primary way to disseminate huge amount of information to all the interested people."
  },
  {
    id: 3,
    icon: iconIdea,
    title: "Like-Minded Peers",
    description:
      "Since everybody have similar interest in their groups, discussions will be more fruitful with more insights."
  }
];

const Achievement = () => {
  return (
    <div className="w-full bg-white py-24">
      <div className="md:max-w-[1370px] m-auto flex md:flex-row md:justify-between md:items-center gap-10 flex-col max-w-[600px] px-4 ">
        <img
          src={featureMentoring}
          className="m-auto w-[600px] md:order-first order-last drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] "
        />
        <div className="flex flex-col justify-center text-center">
          <h1 className="md:leading-[72px] md:text-4xl text-3xl font-bold">
            Mentoring Done Better
          </h1>
          <p className="text-lg text-primary">
            Take 1:1 classes or a group call with like-minded individuals to boost your knowledge.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button className="px-8 py-3 rounded-full bg-brand text-white font-bold">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:gap-10 md:flex-row md:max-w-[1370px] m-auto max-w-[600px] px-4 md:px-0">
        {offers.map((offer) => (
          <div className="w-full bg-white py-8 md:py-24 ">
            <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0 text-left">
              <img src={offer.icon} className="m-auto" />
              <h1 className="text-xl font-semibold ">{offer.title}</h1>
              <p className="mt-2 text-md">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
