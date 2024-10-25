import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { ClientSearch } from '../../components';
import { Close as CloseIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Button, Dialog, List,  AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, ListItem, FormLabel, Box, Select, MenuItem, Backdrop, CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateProject = ({open, handleClose}) => {

    const foreign = React.useRef({
        clientId: null, 
        clientName: null, 
        empId: null, 
        empName: null, 
    });

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = {
            name: data.get('pname'),
            projectCode: data.get('pcode'), 
            startDate: data.get('sdate'), 
            serviceType: data.get('sType'),
            status: data.get('status'), 
            projectDesc: data.get('pdesc'), 
            clientId: foreign.current.clientId, 
            clientName: foreign.current.clientName, 
            empId: foreign.current.empId, 
            empName: foreign.current.empName, 
        };
        setLoading(true);
        await axios.post(`${APP_URL}/create-project`, params).then((e) => {
            alert('Project was created');
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Create Project</Typography>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="pname">Project name</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="pname" name="pname" label="Project name" placeholder="Project name" type="text" fullWidth inputProps={{ maxLength: 50 }}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="pcode">Project Code</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="pcode" name="pcode" label="Project Code" placeholder="Project Code" type="text" fullWidth inputProps={{ maxLength: 20 }}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="sdate">Start date</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='sdate' name='sdate' slotProps={{ textField: { required: true } }}/>
                            </LocalizationProvider>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <ClientSearch type='client' label='Client' placeholder='Search clients' onChange={(id, name) => {
                            foreign.current.clientId = id;
                            foreign.current.clientName = name;
                        }}/>
                        <Box width={0.01}/>
                        <ClientSearch type='employee' label='Supervisor' placeholder='Search employees' onChange={(id, name) => {
                            foreign.current.empId = id;
                            foreign.current.empName = name;
                        }}/>
                    </ListItem>
                    <ListItem>
                        <FormControl>
                            <FormLabel htmlFor="sType">Service type</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="sType" name="sType" label="Service type" placeholder="Service type" type="text" fullWidth inputProps={{ maxLength: 50 }}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select required id='status' name='status' label='Status'>
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='pending'>Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="pdesc">Project description</FormLabel>
                            <OutlinedInput multiline autoFocus required margin="dense" id="pdesc" name="pdesc" label="Project Description" placeholder="Project Description" type="text" fullWidth inputProps={{ maxLength: 200 }}/>
                        </FormControl>
                    </ListItem>
                </List>
                <Button type='submit' color="inherit" sx={{ m: 2 }}>Create</Button>
            </Box>
            {loading ? loader : null}
        </Dialog>

    );

};

export default React.memo(CreateProject);