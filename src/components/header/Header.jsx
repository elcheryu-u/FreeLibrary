import { AdbRounded, BookmarkRounded, LogoutRounded, MenuRounded, PersonRounded } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@u_ui/u-ui'
import React from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const pages = [
    {
        "label": 'Saves',
        "url": "/saves",
        "icon": <BookmarkRounded />
    }
];

export default function Header() {
    const { user, logout } = React.useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar 
            position="fixed"
            color='neutral'
            elevation={0}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbRounded sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {user &&
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="cuenta del usuario actual"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuRounded />
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ 
                                display: { xs: 'block', md: 'none' },
                                '.uiPaper-root': {
                                    minWidth: 250
                                }
                            }}
                            >
                            {user &&
                                <React.Fragment>
                                    {pages.map((page) => (
                                        <MenuItem component={Link} to={page.url} color='neutral' key={page.label} onClick={handleCloseNavMenu}>
                                            {page.icon}
                                            <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                                        </MenuItem>
                                    ))}
                                </React.Fragment>
                            }
                            </Menu>
                        </Box>
                    }

                    <AdbRounded sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {user &&
                            <React.Fragment>
                                {pages.map((page) => (
                                    <Button
                                        color='neutral'
                                        LinkComponent={Link}
                                        to={page.url}
                                        variant='contained'
                                        key={page.label}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2 }}
                                        startIcon={page.icon}
                                    >
                                        <span style={{ marginTop: '1px'}}>{page.label}</span>
                                    </Button>
                                ))}
                            </React.Fragment>
                        }
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <React.Fragment>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.displayName} src={user.photoURL} />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ 
                                        mt: '45px',
                                        '.uiPaper-root': {
                                            minWidth: 250,
                                        }
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem>
                                        <ListItemIcon sx={{ minWidth: 40}}>
                                            <PersonRounded />
                                        </ListItemIcon>
                                        <ListItemText>{user.displayName}</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon sx={{ minWidth: 40}}>
                                            <LogoutRounded />
                                        </ListItemIcon>
                                        <ListItemText>Sign out</ListItemText>
                                    </MenuItem>
                                    {/* {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    ))} */}
                                </Menu>
                            </React.Fragment>
                        ) : (
                            <Button variant='outlined' LinkComponent={Link} to="/auth/login">Sign in</Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            </AppBar>
    )
}
