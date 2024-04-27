import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function RoomsPage() {
  return (
    <>
      <Helmet>
        <title> Rooms | The Timeless Tutor </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
