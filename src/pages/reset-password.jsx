import { Navbar } from '@/sections/landing-page';
import { Helmet } from 'react-helmet-async';

import { ResetPasswordView } from 'src/sections/reset-password';

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password | The Timeless Tutor </title>
      </Helmet>
      <div className="flex flex-col min-h-screen overflow-hidden px-2">
        <Navbar />
        <div className=" flex flex-col gap-10 mt-20 ">
          <ResetPasswordView />
        </div>
      </div>
    </>
  );
}
