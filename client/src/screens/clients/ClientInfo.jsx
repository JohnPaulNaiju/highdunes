import React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { toDate } from '../../functions';
import { Close as CloseIcon } from '@mui/icons-material';
import { Button, Dialog, List,  AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, ListItem, FormLabel, Box, Backdrop, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ClientInfo = ({clientId, open, handleClose}) => {

    const [isOpen ,setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [clientData, setClientData] = React.useState(null);

    const toggle = () => setIsOpen(state => !state);

    const handleChange = React.useCallback((value) => {
        setClientData(state => ({
            ...state, 
            ...value, 
        }));
    }, [setClientData]);

    const getClientData = async(id) => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-client-info`, {
            params: {
                clientId: id, 
            }
        }).then((res) => {
            setClientData(res.data[0]);
        }).catch(() => {
            alert('Error');
        });
        setLoading(false);
    };

    const handleSubmit = async(e, id) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = {
            id: id, 
            name: data.get('cname'), 
            status: data.get('status'), 
            clientType: data.get('ctype'), 
            email: data.get('email'), 
            mob1: data.get('ph1'), 
            mob2: data.get('ph2'), 
            comments: data.get('comments'), 
        };
        setLoading(true);
        await axios.post(`${APP_URL}/update-client`, params).then((e) => {
            alert('Client was updated');
        }).catch((e) => {
            alert('Error');
        });
        setLoading(false);
        handleClose();
    };

    const delClient = React.useCallback(async(id) => {
        await axios.post(`${APP_URL}/delete-client`, { id: id }).then((e) => {
            alert('Client was deleted');
        }).catch((e) => {
            alert('Error');
        });
        handleClose();
    }, [handleClose]);

    React.useEffect(() => {
        getClientData(clientId);
    }, [clientId]);

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress/>
        </Backdrop>
    ), []);

    const alerty = React.useMemo(() => (
        <Dialog open={isOpen} onClose={toggle}>
            <DialogTitle>Delete this client</DialogTitle>
            <DialogContent>
                <DialogContentText>Delete this client? This action is undoable!</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => delClient(clientId)}>Delete</Button>
                <Button onClick={toggle} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    ), [isOpen, delClient, clientId]);

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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Client info</Typography>
                    <Button color="error" onClick={toggle}>Delete client</Button>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={(e) => handleSubmit(e, clientId)} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Client Id: {clientData?.id}</FormLabel>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="cname">Client name</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="cname" name="cname" label="Client name" placeholder="Client name" type="text" fullWidth inputProps={{ maxLength: 30 }} value={clientData?.name} onChange={e => handleChange({ name: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="status" name="status" label="Status" placeholder="Status" type="text" fullWidth inputProps={{ maxLength: 30 }} value={clientData?.status} onChange={e => handleChange({ status: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ctype">Client type</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="ctype" name="ctype" label="Client type" placeholder="Client type" type="text" fullWidth inputProps={{ maxLength: 30 }} value={clientData?.clientType} onChange={e => handleChange({ clientType: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="email" name="email" label="Email" placeholder="Email" type="email" fullWidth inputProps={{ maxLength: 50 }} value={clientData?.email} onChange={e => handleChange({ email: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ph1">Phone number 1</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="ph1" name="ph1" label="Phone number 1" placeholder="Phone number 1" type="tel" fullWidth inputProps={{ maxLength: 15 }} value={clientData?.mob1} onChange={e => handleChange({ mob1: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ph2">Phone number 2</FormLabel>
                            <OutlinedInput autoFocus margin="dense" id="ph2" name="ph2" label="Phone number 2" placeholder="Phone number 2" type="tel" fullWidth inputProps={{ maxLength: 15 }} value={clientData?.mob2} onChange={e => handleChange({ mob2: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="comments">Comments</FormLabel>
                            <OutlinedInput multiline autoFocus margin="dense" id="comments" name="comments" label="Comments" placeholder="Comments" type="text" fullWidth inputProps={{ maxLength: 500 }} value={clientData?.comments} onChange={e => handleChange({ comments: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Created at: {toDate(clientData?.createdAt)}</FormLabel>
                            <FormLabel>Last changed: {toDate(clientData?.lastChanged)}</FormLabel>
                        </FormControl>
                    </ListItem>
                </List>
                <Button type='submit' color="inherit" sx={{ m: 2 }}>Update</Button>
            </Box>
            {loading ? loader : null}
            {isOpen ? alerty : null}
        </Dialog>

    );

};

export default React.memo(ClientInfo);