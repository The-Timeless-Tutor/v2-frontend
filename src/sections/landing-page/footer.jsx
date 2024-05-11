import React from 'react';
import { Blob2, logo, WavyLines } from '../../assets/landing-assets';
import { FaFacebookF, FaDribbble, FaLinkedinIn, FaInstagram, FaBehance } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full bg-white py-8 px-2 md:pt-16 md:px-8 relative">
      <img src={WavyLines} className="w-full absolute top-0" />
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0">
        <div className="col-span-2">
          <img src={logo} className="h-[25px]" />
          <h3 className="text-2xl font-bold mt-10">Contact Us</h3>
          <h3 className="py-2 text-[#6D737A]">Call : +123 400 123</h3>
          <h3 className="py-2 text-[#6D737A]">
            Praesent nulla massa, hendrerit <br></br> vestibulum gravida in, feugiat auctor felis.
          </h3>
          <h3 className="py-2 text-[#363A3D]">Email: example@mail.com</h3>
          <div className="flex gap-4 py-4">
            <div className="p-4 bg-[#f0f0f0] rounded-xl">
              <FaFacebookF size={25} style={{ color: '#F99C1D' }} />
            </div>
            <div className="p-4 bg-[#f0f0f0] rounded-xl">
              <FaDribbble size={25} style={{ color: '#F99C1D' }} />
            </div>
            <div className="p-4 bg-[#f0f0f0] rounded-xl">
              <FaLinkedinIn size={25} style={{ color: '#F99C1D' }} />
            </div>
            <div className="p-4 bg-[#f0f0f0] rounded-xl">
              <FaInstagram size={25} style={{ color: '#F99C1D' }} />
            </div>
            <div className="p-4 bg-[#f0f0f0] rounded-xl">
              <FaBehance size={25} style={{ color: '#F99C1D' }} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Explore</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2">Home</li>
            <li className="py-2">About</li>
            <li className="py-2">Course</li>
            <li className="py-2">Blog</li>
            <li className="py-2">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Category</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2">Design</li>
            <li className="py-2">Development</li>
            <li className="py-2">Marketing</li>
            <li className="py-2">Business</li>
            <li className="py-2">Lifestyle</li>
            <li className="py-2">Photography</li>
            <li className="py-2">Music</li>
          </ul>
        </div>

        <div className="max-[780px]:col-span-2">
          <h3 className="text-2xl font-bold">Subscribe</h3>
          <h3 className="py-2 text-[#6D737A]">
            Praesent nulla massa, hendrerit <br></br> vestibulum gravida in, feugiat auctor felis.
          </h3>
          <form className="py-4">
            <input
              type="email"
              className="w-full rounded-full bg-[#f0f0f0] p-4 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 "
              placeholder="Email here"
            />
            <button className="w-full my-4 px-8 py-4 md:px-6 md:py-4 inline-block text-sm rounded-full bg-brand font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
