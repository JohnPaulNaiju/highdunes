import * as React from 'react';
import MenuButton from './MenuButton';
import { useClerk } from '@clerk/clerk-react';
import { LogoutRounded as LogoutRoundedIcon, MoreVertRounded as MoreVertRoundedIcon} from '@mui/icons-material';
import { styled, Divider, dividerClasses, Menu, MenuItem as MuiMenuItem, paperClasses, listClasses, ListItemText, ListItemIcon, listItemIconClasses, useColorScheme } from '@mui/material';

const MenuItem = styled(MuiMenuItem)({
    margin: '2px 0',
});

export default function OptionsMenu() {

    const { signOut } = useClerk();

    const { mode, setMode } = useColorScheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (

        <React.Fragment>
            <MenuButton aria-label="Open menu" onClick={handleClick} sx={{ borderColor: 'transparent' }}>
                <MoreVertRoundedIcon />
            </MenuButton>
            <Menu anchorEl={anchorEl} id="menu" open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
                [`& .${listClasses.root}`]: {
                    padding: '4px',
                },
                [`& .${paperClasses.root}`]: {
                    padding: 0,
                },
                [`& .${dividerClasses.root}`]: {
                    margin: '4px -4px',
                },
            }}>
                <MenuItem onClick={() => {
                    setMode(mode === 'dark' ? 'light' : 'dark');
                    handleClose();
                }}>Switch theme</MenuItem>
                <Divider />
                <MenuItem
                onClick={() => signOut({ redirectUrl: '/' })}
                sx={{
                    [`& .${listItemIconClasses.root}`]: {
                        ml: 'auto',
                        minWidth: 0,
                    },
                }}>
                    <ListItemText>Logout</ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </React.Fragment>

    );

};