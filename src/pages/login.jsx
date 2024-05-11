import { Footer, Navbar } from '@/sections/landing-page';
import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | The Timeless Tutor </title>
      </Helmet>

      <div className="flex flex-col min-h-screen overflow-hidden px-2">
        <Navbar />
        <div className=" flex flex-col gap-10 mt-20 ">
          <LoginView />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
