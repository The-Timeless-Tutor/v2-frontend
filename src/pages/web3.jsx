import { Helmet } from 'react-helmet-async';

import { Web3View } from 'src/sections/web3/view';

export default function Web3Page() {
  return (
    <>
      <Helmet>
        <title> Web3 | Minimal UI </title>
      </Helmet>

      <Web3View />
    </>
  );
}
