import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { CustomizedDataGrid } from '../../components';
import { RefreshRounded as RefreshIcon } from '@mui/icons-material';
import { Box, Typography, Button, Backdrop, CircularProgress, IconButton } from '@mui/material';

export default function DutySheet() {

    const [loading, setLoading] = React.useState(true);

    const [data, setData] = React.useState([]);

    const getData = async() => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-dutysheet`).then((res) => setData(res.data)).catch((e) => {
            alert('Error');
        });
        setLoading(false);
    };

    React.useEffect(() => {
        getData();
    }, []);

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress/>
        </Backdrop>
    ), []);

    return (

        <Box sx={{ width: '100%', height: '100vh' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>Duty Sheet</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={getData}>
                        <RefreshIcon/>
                    </IconButton>
                    <Button variant="outlined" onClick={() => {}} sx={{ ml: 2 }}>Create</Button>
                </Box>
            </Box>
            <CustomizedDataGrid columns={[]} rows={data} onClick={e => {}}/>
            {loading ? loader : null}
        </Box>

    );

};