import React from "react";
import { avatar, quotationMark } from "../../public/assets/landing-assets";

const FeatureCard = ({ feature }) => {
  console.log(feature.title);
  return (
    <div class="max-w-sm bg-white border border-gray-200 shadow rounded-3xl">
      <div class="w-full flex justify-center items-center p-5">
        <img class="rounded-t-lg flex justify-center items-center" src={feature.linkImg} alt="" />
      </div>
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">
          {feature.title}
        </h5>
        <p class="mb-3 font-normal text-gray-700 line-clamp-5">{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
