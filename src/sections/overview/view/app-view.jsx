// eslint-disable-next-line no-console
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';
import { products } from 'src/_mock/products';

// import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
// import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// import Stack from '@mui/material/Stack';

import ProductCard from '../../products/product-card';
import { Button } from '@mui/material';
import { useGetUser } from '@/sections/login/useGetUser';
import { useGetFeeds } from './useFeeds';
import { useEffect, useState } from 'react';

// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function AppView() {
  const { user, isLoading: isLoadingUser } = useGetUser();
  const { feeds, isLoading: isLoadingFeeds } = useGetFeeds();
  const { rooms, blogs } = feeds || {};
  const isLoading = isLoadingUser || isLoadingFeeds;
  const [newsUpdates, setNewsUpdates] = useState([]);

  useEffect(() => {
    if (rooms) {
      const updates = rooms
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3)
        .map((room) => ({
          id: room.slug,
          title: `${room.host_details.username} created a scheduled session for "${room.name}" group`,
          description: room.description,
          image: `/assets/images/covers/cover_${Math.floor(Math.random() * 5) + 1}.jpg`,
          postedAt: new Date(room.created_at),
        }));
      setNewsUpdates(updates);
    }
  }, [rooms]);

  if (isLoading) {
    // TODO: add loading indicator
    return <div>Loading Feeds...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hi {(!isLoading && user?.name) || user?.email}, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate title="🙊 News Update" list={newsUpdates} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="🗓️ Upcoming Sessions"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Manage Taxes & Accounts',
                'Server Setup using Ngrok',
                'Resume Optimization Session',
                'SEO Marketing Expert',
                'Job Seekers',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.future(),
            }))}
          />
        </Grid>
      </Grid>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ mb: 3, mt: 5 }}>
          🏛️ Recommended Rooms
        </Typography>

        <Button variant="text">+ Explore</Button>
      </div>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
