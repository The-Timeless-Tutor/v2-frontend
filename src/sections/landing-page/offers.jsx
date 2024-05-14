import React from 'react';
import { Link } from 'react-router-dom';
import {
  featureMentoring,
  iconOnetoOne,
  iconGroup,
  iconIdea,
  WavyLines
} from '../../assets/landing-assets';

const offers = [
  {
    id: 1,
    icon: iconOnetoOne,
    title: '1:1 Sessions',
    description:
      '1:1 Sessions helps you to have a more interactive session with your mentor for an in-depth discussion about a sub-topic.'
  },
  {
    id: 2,
    icon: iconGroup,
    title: 'Group Sessions',
    description:
      'Group Sessions is our primary way to disseminate huge amount of information to all the interested people.'
  },
  {
    id: 3,
    icon: iconIdea,
    title: 'Like-Minded Peers',
    description:
      'Since everybody have similar interest in their groups, discussions will be more fruitful with more insights.'
  }
];

const Achievement = () => {
  return (
    <div className="w-full bg-white py-8 px-2 md:py-16 md:px-8 relative">
      <div className="absolute inset-0 bg-[url('/src/assets/landing-assets/WavyLines.webp')] bg-cover bg-center -z-0 pointer-events-none"></div>
      {/* <img src={WavyLines} className="w-full absolute top-0" /> */}
      <div className="md:max-w-[1370px] m-auto flex md:flex-row md:justify-between md:items-center gap-10 flex-col max-w-[600px] px-4  z-10">
        <img
          src={featureMentoring}
          className="m-auto w-[500px] md:order-first order-last drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] "
        />
        <div className="flex flex-col justify-center text-center">
          <h1 className="md:leading-[72px] md:text-4xl text-3xl font-bold">
            Mentoring Done Better
          </h1>
          <p className="text-lg text-primary">
            Take 1:1 classes or a group call with like-minded individuals to boost your knowledge.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            <Link
              to={'/register'}
              className="px-8 py-3 inline-block text-sm rounded-lg bg-brand font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:justify-between md:gap-10 md:flex-row md:max-w-[1370px] m-auto max-w-[600px] px-4 md:px-0">
        {offers.map((offer) => (
          <div key={offer.id} className="w-full bg-white py-8 md:py-14 md:px-10">
            <div className="md:max-w-[1370px] m-auto max-w-[600px] px-4 md:px-0 text-left">
              <img src={offer.icon} className="m-auto w-[35px]" />
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
