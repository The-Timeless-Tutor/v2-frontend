import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import { Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ title, subheader, list, isLoading, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {list.length === 0 && isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <NewsItem key={index} news={{}} isLoading={true} />
            ))
          : list.map((news) => <NewsItem key={news.id} news={news} isLoading={isLoading} />)}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired
};

// ----------------------------------------------------------------------

function NewsItem({ news, isLoading }) {
  if (isLoading) {
    return (
      <Stack
        direction="row"
        alignItems="center"
        sx={{ whiteSpace: 'normal', paddingRight: 2.5 }}
        spacing={2}
      >
        <Skeleton variant="rectangular" width={48} height={48} />
        <Box sx={{ width: '100%' }}>
          <Skeleton width="70%" />
          <Skeleton width="50%" />
          <Skeleton width="30%" />
        </Box>
      </Stack>
    );
  }
  const { image, title, description, postedAt } = news;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ whiteSpace: 'normal', paddingRight: 2.5 }}
      spacing={2}
    >
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box component="div" sx={{ whiteSpace: 'normal' }}>
        <Link color="inherit" variant="subtitle2" underline="hover">
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {fToNow(postedAt)}
        </Typography>
      </Box>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date)
  })
};
