import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { Close as CloseIcon } from '@mui/icons-material';
import { Button, Dialog, List,  AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, ListItem, FormLabel, Box, Backdrop, CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateClient = ({open, handleClose}) => {

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = {
            name: data.get('cname'), 
            status: data.get('status'), 
            clientType: data.get('ctype'), 
            email: data.get('email'), 
            mob1: data.get('ph1'), 
            mob2: data.get('ph2'), 
            comments: data.get('comments'), 
        };
        setLoading(true);
        await axios.post(`${APP_URL}/create-client`, params).then((e) => {
            alert('Client was created');
        }).catch((e) => {
            alert('Error');
        });
        setLoading(false);
        handleClose();
    };

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress />
        </Backdrop>
    ), []);

    return (

        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Create client</Typography>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="cname">Client name</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="cname" name="cname" label="Client name" placeholder="Client name" type="text" fullWidth inputProps={{ maxLength: 30 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="status" name="status" label="Status" placeholder="Status" type="text" fullWidth inputProps={{ maxLength: 30 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ctype">Client type</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="ctype" name="ctype" label="Client type" placeholder="Client type" type="text" fullWidth inputProps={{ maxLength: 30 }}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="email" name="email" label="Email" placeholder="Email" type="email" fullWidth inputProps={{ maxLength: 50 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ph1">Phone number 1</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="ph1" name="ph1" label="Phone number 1" placeholder="Phone number 1" type="tel" fullWidth inputProps={{ maxLength: 15 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ph2">Phone number 2</FormLabel>
                            <OutlinedInput autoFocus margin="dense" id="ph2" name="ph2" label="Phone number 2" placeholder="Phone number 2" type="tel" fullWidth inputProps={{ maxLength: 15 }}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="comments">Comments</FormLabel>
                            <OutlinedInput multiline autoFocus margin="dense" id="comments" name="comments" label="Comments" placeholder="Comments" type="text" fullWidth inputProps={{ maxLength: 500 }}/>
                        </FormControl>
                    </ListItem>
                </List>
                <Button type='submit' color="inherit" sx={{ m: 2 }}>Create</Button>
            </Box>
            {loading ? loader : null}
        </Dialog>

    );

};

export default React.memo(CreateClient);