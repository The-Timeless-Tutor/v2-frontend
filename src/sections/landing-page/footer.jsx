import React from 'react';
import { logo } from '../../assets/landing-assets';
import { FaFacebookF, FaDribbble, FaLinkedinIn, FaInstagram, FaBehance } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full bg-white py-8 px-2 md:pt-16 md:px-8 relative">
      <div className="absolute inset-0 bg-[url('/src/assets/landing-assets/WavyLines.webp')] bg-cover bg-center -z-0 pointer-events-none"></div>

      <div className="md:max-w-[1370px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0 relative z-10">
        <div className="col-span-2">
          <img src={logo} className="h-[25px]" />
          <h3 className="text-2xl font-bold mt-10">Contact Us</h3>
          <h3 className="py-2 text-[#6D737A]">Call : +123 400 123</h3>
          <h3 className="py-2 text-[#6D737A]">
            Discover a new era of learning with The Timeless Tutor, your portal to a world where AI
            innovation meets web3 security.
          </h3>
          <h3 className="py-2 text-[#363A3D]">Email: example@mail.com</h3>
          <div className="flex gap-4 py-4">
            <Link className="p-4 bg-[#f0f0f0] rounded-lg hover:bg-[#e2e2e2]">
              <FaFacebookF size={25} style={{ color: '#F99C1D' }} />
            </Link>
            {/* <div className="p-4 bg-[#f0f0f0] rounded-lg hover:bg-[#e2e2e2]">
              <FaDribbble size={25} style={{ color: '#F99C1D' }} />
            </div> */}
            <div className="p-4 bg-[#f0f0f0] rounded-lg hover:bg-[#e2e2e2]">
              <FaLinkedinIn size={25} style={{ color: '#F99C1D' }} />
            </div>
            <div className="p-4 bg-[#f0f0f0] rounded-lg hover:bg-[#e2e2e2]">
              <FaInstagram size={25} style={{ color: '#F99C1D' }} />
            </div>
            {/* <div className="p-4 bg-[#f0f0f0] rounded-lg hover:bg-[#e2e2e2]">
              <FaBehance size={25} style={{ color: '#F99C1D' }} />
            </div> */}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Explore</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/home">Home</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/public-blog">Blog</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/about">About</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Category</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/">Design</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/">Development</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/">Marketing</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/">Immigration</Link>
            </li>
            <li className="py-2 hover:text-brand hover:underline">
              <Link to="/">Lifestyle</Link>
            </li>
          </ul>
        </div>

        <div className="max-[780px]:col-span-2">
          <h3 className="text-2xl font-bold">Subscribe</h3>
          <h3 className="py-2 text-[#6D737A]">
            Sign up for our newsletter to discover breakthroughs in AI mentorship and web3 learning
            before anyone else.
          </h3>
          <form className="py-4">
            <input
              type="email"
              className="w-full rounded-lg bg-[#f0f0f0] p-4 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 "
              placeholder="Email here"
            />
            <button className="w-full my-4 px-8 py-3 inline-block text-sm rounded-lg bg-brand font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
