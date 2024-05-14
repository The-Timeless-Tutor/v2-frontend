import React from 'react';

const FeatureCard = ({ feature }) => {
  const isCenterCard = feature.isCenterCard;

  return (
    <div
      className={`max-w-sm bg-[#f5f5f5] border border-gray-200 shadow rounded-3xl ${
        isCenterCard ? 'scale-110 transform-origin-top-left' : ''
      }`}
    >
      <div className={`w-full flex justify-center items-center p-5`}>
        <img className={` flex justify-center items-center`} src={feature.linkImg} alt="" />
      </div>
      <div className={`p-5`}>
        <h5 className={`mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-2`}>
          {feature.title}
        </h5>
        <p className={`mb-3 text-md font-normal text-gray-700 line-clamp-5`}>
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
