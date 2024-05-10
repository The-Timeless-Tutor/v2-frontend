import React from "react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 shadow rounded-3xl">
      <div className="w-full flex justify-center items-center p-5">
        <img
          className="rounded-t-lg flex justify-center items-center"
          src={feature.linkImg}
          alt=""
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">
          {feature.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 line-clamp-5">{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
