import { Link, Box, LinkProps } from '@mui/material';
import { NavLink } from 'react-router-dom';

type TNavBar = {
  links: {
    text: string;
    href: string;
    'data-testid'?: string;
  }[];
};

function CustomLink<C extends React.ElementType>(
  props: LinkProps<C, { component?: C }>
) {
  return (
    <Link
      {...props}
      style={({ isActive }: { isActive: boolean }) =>
        isActive ? { textDecoration: 'underline' } : undefined
      }
    />
  );
}

function NavBar({ links }: TNavBar) {
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
      <CustomLink
        component={NavLink}
        to="/"
        sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
      >
        <img src="/surelogo.svg" alt="logo"></img>
      </CustomLink>

      {links.map(({ text, href, 'data-testid': dataTestId }) => (
        <CustomLink
          component={NavLink}
          key={href}
          to={href}
          color="#fff"
          underline="hover"
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
        </CustomLink>
      ))}
    </Box>
  );
}

export default NavBar;
