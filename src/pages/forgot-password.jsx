import { Navbar } from '@/sections/landing-page';
import { Helmet } from 'react-helmet-async';

import { ForgotPasswordView } from 'src/sections/forgot-password';

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password | The Timeless Tutor </title>
      </Helmet>
      <div className="flex flex-col min-h-screen overflow-hidden px-2">
        <Navbar />
        <div className=" flex flex-col gap-10 mt-20 ">
          <ForgotPasswordView />
        </div>
      </div>
    </>
  );
}
