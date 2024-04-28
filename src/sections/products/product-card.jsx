import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { fCurrency } from 'src/utils/format-number';

// import Label from 'src/components/label';
import { Button } from '@mui/material';
// import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  // const renderStatus = (
  //   <Label
  //     variant="filled"
  //     color={(product.status === 'sale' && 'error') || 'info'}
  //     sx={{
  //       zIndex: 9,
  //       top: 16,
  //       right: 16,
  //       position: 'absolute',
  //       textTransform: 'uppercase',
  //     }}
  //   >
  //     {product.status}
  //   </Label>
  // );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = <Typography variant="subtitle1">{product.price}</Typography>;

  return (
    <Card>
      <Box sx={{ pt: '50%', position: 'relative' }}>
        {/* {product.status && renderStatus} */}

        {renderImg}
      </Box>

      <Stack spacing={1} sx={{p: 2 }}>
        <Link sx={{marginTop: 0}} color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{product.description.substring(0,80) + "..."}</Typography>

        <Stack direction="row" sx={{paddingTop: 1, paddingBottom: 1}} alignItems="center" justifyContent="space-between">
          <Button variant="contained">+ Join Session</Button>
          <Typography variant='"body2' style={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text-secondary' }}>
            Fee: {renderPrice} TTT
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
