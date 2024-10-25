import * as React from 'react';
import { useRouter } from '../Home';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { PeopleRounded as PeopleRoundedIcon, HandymanRounded, EngineeringRounded, NewspaperRounded, AssessmentRounded, ReceiptLongRounded } from '@mui/icons-material';

const mainListItems = [
    { text: 'Projects', icon: <HandymanRounded /> },
    { text: 'Clients', icon: <PeopleRoundedIcon /> },
    { text: 'Employees', icon: <EngineeringRounded/> },
    { text: 'Duty Sheet', icon: <NewspaperRounded /> },
    { text: 'Deduction Sheet', icon: <ReceiptLongRounded /> },
    { text: 'Reports', icon: <AssessmentRounded /> },
];

export default function MenuContent() {

    const { screen, handleScreen } = useRouter();

    return (

        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === screen} onClick={() => handleScreen(index)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>

    );

};