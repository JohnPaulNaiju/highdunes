import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { columns } from './gridData';
import ClientInfo from './ClientInfo';
import CreateClient from './CreateClient';
import { CustomizedDataGrid, StatCard } from '../../components';
import { RefreshRounded as RefreshIcon } from '@mui/icons-material';
import { Box, Typography, Grid2 as Grid, Backdrop, CircularProgress, IconButton, Button } from '@mui/material';

export default function Clients(){

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const [clientId, setClientId] = React.useState(null);

    const [clients, setClients] = React.useState([]);
    const [clientCount, setClientCount] = React.useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clearClientId = () => setClientId(null);

    const getCount = async() => {
        await axios.get(`${APP_URL}/get-client-count`).then((res) => setClientCount(res.data));
    };

    const getClientData = async() => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-clients`).then((res) => setClients(res.data)).catch((e) => {
            alert('Error');
        });
        setLoading(false);
    };

    const reload = () => {
        getClientData();
        getCount();
    };

    React.useEffect(() => {
        getCount();
        getClientData();
    }, []);

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress/>
        </Backdrop>
    ), []);

    return (

        <Box sx={{ width: '100%', height: '100vh' }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>Overview</Typography>
            <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard title='Total clients' value={clientCount} interval='' trend='up' data={[]}/>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>Clients</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={reload}>
                        <RefreshIcon/>
                    </IconButton>
                    <Button variant="outlined" onClick={handleOpen} sx={{ ml: 2 }}>Create</Button>
                </Box>
            </Box>
            <CustomizedDataGrid columns={columns} rows={clients} onClick={e => setClientId(e)}/>
            {open ? <CreateClient open={open} handleClose={handleClose}/> : null}
            {clientId ? <ClientInfo clientId={clientId} open={Boolean(clientId)} handleClose={clearClientId}/> : null}
            {loading ? loader : null}
        </Box>

    );

};