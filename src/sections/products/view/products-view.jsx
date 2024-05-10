// import { useState } from 'react';

// import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import { InputAdornment, OutlinedInput } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [filterName, setFilterName] = useState('');
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🏛️ Recommended Rooms
      </Typography>

      <OutlinedInput
        value={filterName}
        onChange={e => setFilterName(e.target.value)}
        placeholder="Search Rooms by name, category, etc."
        sx={{ width: '100%', marginBottom: 2 }}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* <ProductCartWidget /> */}
    </Container>
  );
}
