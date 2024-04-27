import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | The Timeless Tutor </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
