import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';

// project imports
import { MainCard } from '../MainCard';

// ==============================|| BREADCRUMBS ||============================== //

interface MenuItem {
  breadcrumbs?: boolean;
  type: string;
  title: string;
  url?: string;
  children?: MenuItem[];
}

interface BreadcrumbsProps {
  navigation: { items: MenuItem[] };
  title?: boolean;
}

export const Breadcrumbs = ({ navigation, title = true, ...others }: BreadcrumbsProps) => {
  const location = useLocation();
  const [main, setMain] = useState<MenuItem | undefined>();
  const [item, setItem] = useState<MenuItem | undefined>();

  // set active item state
  const getCollapse = useCallback(
    (menu: MenuItem) => {
      if (menu.children) {
        menu.children.forEach((collapse) => {
          if (collapse.type === 'collapse') {
            getCollapse(collapse);
          } else if (collapse.type === 'item') {
            if (location.pathname === collapse.url) {
              setMain(menu);
              setItem(collapse);
            }
          }
        });
      }
    },
    [location.pathname],
  );

  useEffect(() => {
    navigation?.items?.forEach((menu) => {
      if (menu.type === 'group') {
        getCollapse(menu);
      }
    });
  }, [getCollapse, location.pathname, navigation]);

  // only used for component demo breadcrumbs
  if (location.pathname === '/breadcrumbs') {
    location.pathname = '/dashboard/analytics';
  }

  let mainContent: JSX.Element | null = null;
  let itemContent: JSX.Element | null = null;
  let breadcrumbContent: JSX.Element = <Typography />;
  let itemTitle = '';

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography
        component={Link}
        to={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: 'none' }}
        color="textSecondary"
      >
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;
    itemContent = (
      <Typography
        variant="subtitle1"
        color="textPrimary"
      >
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard
          hasBorder={false}
          sx={{ mb: 3, bgcolor: 'transparent' }}
          {...others}
          hasContent={false}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography
                  component={Link}
                  to="/"
                  color="textSecondary"
                  variant="h6"
                  sx={{ textDecoration: 'none' }}
                >
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && (
              <Grid
                item
                sx={{ mt: 2 }}
              >
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            )}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};
