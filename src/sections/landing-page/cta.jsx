import React from 'react';
import { Link } from 'react-router-dom';

import { cta, Blob1 } from '../../assets/landing-assets';

const CTA = () => {
  return (
    <div className="w-full bg-[#f0f0f0] py-8 px-2 md:py-16 md:px-8 relative">
      <img
        src={Blob1}
        alt="Wave SVG"
        className="h-[500px] absolute bottom-0 right-0 blur-[20px] hidden md:flex opacity-30"
      />
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center  px-4 md:px-0">
        <img src={cta} className="w-[650px] mx-auto z-13" />

        <div>
          <h1 className="py-2 text-3xl font-semibold">
            Join <span className="text-brand">Web 3.0</span> powered learning platform today
          </h1>
          <p className="py-2 text-lg text-gray-600">Start learning by registering for free</p>
          <Link
            to="/register"
            className="px-8 py-3 inline-block text-sm rounded-lg bg-brand font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            Register For Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
