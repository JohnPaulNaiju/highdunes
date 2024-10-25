import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { columns } from './gridData';
import EmployeeInfo from './EmployeeInfo';
import CreateEmployee from './CreateEmployee';
import { CustomizedDataGrid, StatCard } from '../../components';
import { RefreshRounded as RefreshIcon } from '@mui/icons-material';
import { Grid2 as Grid, Box, Typography, Button, Backdrop, CircularProgress, IconButton } from '@mui/material';

export default function Employees() {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const [empId, setEmpId] = React.useState(null);

    const [empCount, setEmpCount] = React.useState(0);
    const [employees, setEmployees] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clearEmpId = () => setEmpId(null);

    const getCount = async() => {
        await axios.get( `${APP_URL}/get-employee-count`).then((res) => setEmpCount(res.data));
    };

    const getEmpData = async() => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-employees`).then((res) => setEmployees(res.data)).catch((e) => {
            alert('Error');
        });
        setLoading(false);
    };

    const reload = () => {
        getEmpData();
        getCount();
    };

    React.useEffect(() => {
        getCount();
        getEmpData();
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
                    <StatCard title='Total employees' value={empCount} data={[]} interval='' trend='up'/>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>Employees</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={reload}>
                        <RefreshIcon/>
                    </IconButton>
                    <Button variant="outlined" onClick={handleOpen} sx={{ ml: 2 }}>Create</Button>
                </Box>
            </Box>
            <CustomizedDataGrid columns={columns} rows={employees} onClick={e => setEmpId(e)}/>
            {open ? <CreateEmployee open={open} handleClose={handleClose}/> : null}
            {empId ? <EmployeeInfo empId={empId} open={Boolean(empId)} handleClose={clearEmpId}/> : null}
            {loading ? loader : null}
        </Box>

    );

};