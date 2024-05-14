import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import { logo } from '../../assets/landing-assets';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logoElement = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx
      }}
      {...other}
    >
      <img src={logo} alt="Logo" width="100%" height="100%" />
    </Box>
  );

  return disabledLink ? (
    logoElement
  ) : (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logoElement}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object
};

export default Logo;
