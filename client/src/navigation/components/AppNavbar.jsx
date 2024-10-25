import * as React from 'react';
import MenuButton from './MenuButton';
import SideMenuMobile from './SideMenuMobile';
import { MenuRounded as MenuRoundedIcon } from '@mui/icons-material';
import { styled, AppBar, Box, Stack, Toolbar as MuiToolbar, tabsClasses, Typography, Avatar } from '@mui/material';

const Toolbar = styled(MuiToolbar)({
    width: '100%',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    gap: '12px',
    flexShrink: 0,
    [`& ${tabsClasses.flexContainer}`]: {
        gap: '8px',
        p: '8px',
        pb: 0,
    },
});

export default function AppNavbar() {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    return (

        <AppBar position="fixed"
        sx={{
            display: { xs: 'auto', md: 'none' },
            boxShadow: 0,
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
            top: 'var(--template-frame-height, 0px)',
        }}>
            <Toolbar variant="regular">
                <Stack
                direction="row"
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexGrow: 1,
                    width: '100%',
                }}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', pl: 2 }}>
                        <CustomIcon />
                        <Typography variant="h4" component="h1" sx={{ color: '#4876EE' }} style={{ marginLeft: '18px' }}>High Dunes</Typography>
                    </Stack>
                    <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuRoundedIcon />
                    </MenuButton>
                    <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
                </Stack>
            </Toolbar>
        </AppBar>

    );

};

export function CustomIcon() {

    return (

        <Box
        sx={{
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '999px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        }}>
            <Avatar src={require('../../assets/logo192.png')}/>
        </Box>

    );

};