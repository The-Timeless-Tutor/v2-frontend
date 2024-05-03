// eslint-disable-next-line no-console
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';
import { products } from 'src/_mock/products';
import { useAuth } from 'src/contexts/AuthContext';

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

// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function AppView() {

  const { user } = useAuth();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hi {user && user.username ? user.username : "Lexy"} !, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="🙊 News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Sangya posted a message on announcement #job-seeker.',
                'You have been mentioned by @Sagar on group#resume-optimization.',
                'New Message from @Ashish.',
                '@Lakhpa recently posted a blog.',
                '@Sahir just shared some learning resources.',
              ][index],
              description: [
                'Message: Someone I got a reference job, kudos to me.',
                '@not.so.lexy please check the new version of The Timeless Tutor, its sicko!',
                'Hello Bhai, Kata xau? Call lagdeina ta!',
                "Let's create your own Google Photos with JavaScript.",
                'resume.pdf',
              ][index],
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
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

      <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ mb: 3, mt: 5 }}>
          🏛️ Recommended Rooms
        </Typography>

        <Button variant='text'>+ Explore</Button>
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
