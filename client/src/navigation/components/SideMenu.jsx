import * as React from 'react';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { styled, Avatar, Drawer as MuiDrawer, drawerClasses, Box, Divider, Stack, Typography } from '@mui/material';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function SideMenu() {

    return (

        <Drawer variant='permanent' sx={{ display: { xs: 'none', md: 'block' },[`& .${drawerClasses.paper}`]: { backgroundColor: 'background.paper' } }}>
            <Box sx={{ display: 'flex', mt: 'calc(var(--template-frame-height, 0px) + 4px)', p: 1.5 }}>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <Avatar src={require('../../assets/logo192.png')} sx={{ ml: 1 }}/>
                    <Typography component="p" variant="subtitle1" sx={{ width: '100%', fontWeight: 500, ml: 1.5, color: '#4876EE' }}>High Dunes</Typography>
                </Box>
            </Box>
            <Divider />
            <MenuContent />
            <Stack direction="row"  sx={{ p: 2, gap: 1, alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
                <Avatar sizes="small" alt="user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0KehqXBrMLd32HsfjDoaq098WeNA0b3g_2A&s" sx={{ width: 36, height: 36 }}/>
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>User</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>user@email.com</Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>

    );

};