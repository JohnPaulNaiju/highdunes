import * as React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { Close as CloseIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Button, Dialog, List,  AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, ListItem, FormLabel, Box, Select, MenuItem, Backdrop, CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateEmployee = ({open, handleClose}) => {

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = {
            name: data.get('empname'), 
            status: data.get('status'), 
            role: data.get('role'), 
            empcode: data.get('empcode'), 
            dob: data.get('dob'), 
            gender: data.get('gender'), 
            phone: data.get('phone'), 
            email: data.get('email'), 
            address: data.get('address'), 
            emph: data.get('emph'), 
            emname: data.get('emname'), 
            jobTitle: data.get('jobTitle'), 
            emptype: data.get('emptype'), 
            dateofhire: data.get('dateofhire'), 
            salary: data.get('salary'), 
        };
        setLoading(true);
        await axios.post(`${APP_URL}/create-employee`, params).then((e) => {
            alert('Employee was created');
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Create employee</Typography>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="empname">Employee name</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="empname" name="empname" label="Employee name" placeholder="Employee name" type="text" fullWidth inputProps={{ maxLength: 30 }}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select required id='status' name='status' label='Status' sx={{ width: 130 }}>
                                <MenuItem value='on-work'>On work</MenuItem>
                                <MenuItem value='on-vacation'>On vacation</MenuItem>
                                <MenuItem value='on-leave'>On leave</MenuItem>
                                <MenuItem value='available'>Available</MenuItem>
                            </Select>
                        </FormControl>
                        <Box width={0.03}/>
                        <FormControl>
                            <FormLabel htmlFor="role">Role</FormLabel>
                            <Select required id='role' name='role' label='Role' sx={{ width: 130 }}>
                                <MenuItem value='super-admin'>Super Admin</MenuItem>
                                <MenuItem value='admin'>Admin</MenuItem>
                                <MenuItem value='supervisor'>Supervisor</MenuItem>
                                <MenuItem value='none'>None</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="empcode">Employee code</FormLabel>
                            <OutlinedInput required margin="dense" id="empcode" name="empcode" label="Employee code" placeholder="Employee code" type="text" fullWidth inputProps={{ maxLength: 20 }}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="dob">Date of birth</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='dob' name='dob' disableFuture slotProps={{ textField: { required: true } }}/>
                            </LocalizationProvider>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <Select required id='gender' name='gender' label='Gender'>
                                <MenuItem value='M'>Male</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <OutlinedInput required margin="dense" id="phone" name="phone" label="Phone" placeholder="Phone with country code" type="tel" fullWidth inputProps={{ maxLength: 15 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <OutlinedInput required margin="dense" id="email" name="email" label="Email" placeholder="Employee@email.com" type="email" fullWidth inputProps={{ maxLength: 50 }}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <OutlinedInput required margin="dense" id="address" name="address" label="Address" placeholder="Address" type="text" fullWidth inputProps={{ maxLength: 200 }}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="emph">Emergency contact number</FormLabel>
                            <OutlinedInput required margin="dense" id="emph" name="emph" label="Emergency contact number" placeholder="Phone with country code" type="tel" fullWidth inputProps={{ maxLength: 15 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="emname">Emergency contact name</FormLabel>
                            <OutlinedInput required margin="dense" id="emname" name="emname" label="Emergency contact name" placeholder="Name" type="text" fullWidth inputProps={{ maxLength: 30 }}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="jobTitle">Job title</FormLabel>
                            <OutlinedInput required margin="dense" id="jobTitle" name="jobTitle" label="Job title" placeholder="Job title" type="text" fullWidth inputProps={{ maxLength: 30 }}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="emptype">Employee type</FormLabel>
                            <OutlinedInput required margin="dense" id="emptype" name="emptype" label="Employee type" placeholder="Employee type" type="text" fullWidth inputProps={{ maxLength: 20 }}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="dateofhire">Date of hire</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='dateofhire' name='dateofhire' slotProps={{ textField: { required: true } }}/>
                            </LocalizationProvider>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="salary">Salary</FormLabel>
                            <OutlinedInput required margin="dense" id="salary" name="salary" label="Salary" placeholder="Salary" type="number" fullWidth inputProps={{ maxLength: 8 }}/>
                        </FormControl>
                    </ListItem>
                </List>
                <Button type='submit' color="inherit" sx={{ m: 2 }}>Create</Button>
            </Box>
            {loading ? loader : null}
        </Dialog>

    );

};

export default React.memo(CreateEmployee);