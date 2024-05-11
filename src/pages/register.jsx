import { Navbar } from '@/sections/landing-page';
import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | The Timeless Tutor </title>
      </Helmet>
      <div className="flex flex-col min-h-screen overflow-hidden px-2">
        <Navbar />
        <div className=" flex flex-col gap-10 mt-20 ">
          <RegisterView />
        </div>
      </div>
    </>
  );
}
