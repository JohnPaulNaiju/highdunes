import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { columns } from './gridData';
import ProjectInfo from './ProjectInfo';
import CreateProject from './CreateProject';
import { CustomizedDataGrid, StatCard } from '../../components';
import { RefreshRounded as RefreshIcon } from '@mui/icons-material';
import { Grid2 as Grid, Box, Typography, Button, IconButton, Backdrop, CircularProgress } from '@mui/material';

export default function Projects() {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const [projectId, setProjectId] = React.useState(null);

    const [projectCount, setProjectCount] = React.useState({
        total: 0, 
        active: 0, 
        completed: 0, 
        pending: 0, 
    });
    const [projects, setProjects] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clearProjectId = () => setProjectId(null);

    const getCount = async() => {
        await axios.get(`${APP_URL}/get-project-count`).then((res) => setProjectCount(res.data));
    };

    const getProjectData = async() => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-projects`).then((res) => setProjects(res.data)).catch((e) => {
            alert('Error');
        });
        setLoading(false);
    };

    const reload = () => {
        getProjectData();
        getCount();
    };

    React.useEffect(() => {
        getCount();
        getProjectData();
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
                    <StatCard title='Total Projects' value={projectCount?.total || 0} interval='' trend='up' data={[]}/>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard title='Active Projects' value={projectCount?.active || 0} interval='' trend='up' data={[]}/>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard title='Completed Projects' value={projectCount?.completed || 0} interval='' trend='up' data={[]}/>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard title='Pending Projects' value={projectCount?.pending || 0} interval='' trend='up' data={[]}/>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>Projects</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={reload}>
                        <RefreshIcon/>
                    </IconButton>
                    <Button variant="outlined" onClick={handleOpen} sx={{ ml: 2 }}>Create</Button>
                </Box>
            </Box>
            <CustomizedDataGrid columns={columns} rows={projects} onClick={e => setProjectId(e)}/>
            {open ? <CreateProject open={open} handleClose={handleClose}/> : null}
            {projectId ? <ProjectInfo projectId={projectId} open={Boolean(projectId)} handleClose={clearProjectId}/> : null}
            {loading ? loader : null}
        </Box>

    );

};