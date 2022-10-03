import { Link, Box } from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

type TNavBar = {
  links: {
    text: string;
    href: string;
    'data-testid'?: string;
  }[];
};

function NavBar({ links }: TNavBar) {
  let location = useLocation();

  return (
    <Box
      component="aside"
      sx={{
        background: '#0c2975',
        padding: '16px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
      >
        <img src="/surelogo.svg" alt="logo"></img>
      </Link>

      {links.map(({ text, href, 'data-testid': dataTestId }) => (
        <Link
          component={RouterLink}
          key={href}
          to={href}
          color="#fff"
          // I wanted to use react router's NavLink to style based on if the link is
          // active or not (as described here https://reactrouter.com/en/v6.3.0/api#navlink),
          // but couldn't get it to work properly with how we're forwarding props. So I used
          // useLocation instead for time's sake, but it doesn't seem like the best solution.
          underline={location.pathname === href ? 'always' : 'hover'}
          sx={{
            cursor: 'pointer',
            '&:not(:last-of-type)': {
              marginBottom: '16px',
            },
          }}
          data-testid={dataTestId}
          aria-current="page"
        >
          {text}
        </Link>
      ))}
    </Box>
  );
}

export default NavBar;
