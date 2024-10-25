import * as React from 'react';
import MenuContent from './MenuContent';
import { useClerk } from '@clerk/clerk-react';
import { LogoutRounded as LogoutRoundedIcon } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Drawer, drawerClasses, Stack, Typography, useColorScheme } from '@mui/material';

export default function SideMenuMobile({ open, toggleDrawer }) {

    const { signOut } = useClerk();

    const { mode, setMode } = useColorScheme();

    return (

        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}
        sx={{
            [`& .${drawerClasses.paper}`]: {
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
            },
        }}>
            <Stack sx={{ maxWidth: '70dvw', height: '100%' }}>
                <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}>
                        <Avatar sizes="small" alt="Riley Carter" src="/static/images/avatar/7.jpg" sx={{ width: 24, height: 24 }}/>
                        <Typography component="p" variant="h6">Riley Carter</Typography>
                        <Box width={6}/>
                    </Stack>
                </Stack>
                <Divider />
                <Stack sx={{ flexGrow: 1 }}>
                    <MenuContent />
                    <Divider />
                </Stack>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} sx={{ mb: 1 }}>Switch theme</Button>
                    <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon/>} onClick={() => signOut({ redirectUrl: '/' })}>Logout</Button>
                </Stack>
            </Stack>
        </Drawer>

    );

};