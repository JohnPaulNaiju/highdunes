import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { APP_URL } from '../../';
import { toDate } from '../../functions';
import { Close as CloseIcon } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Button, Dialog, List,  AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, ListItem, FormLabel, Box, Select, MenuItem, Backdrop, CircularProgress, InputLabel, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function calculateAge(dob) {
    return dayjs().diff(dayjs(dob), 'year');
};

const EmployeeInfo = ({empId, open, handleClose}) => {

    const [isOpen ,setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [empData, setEmpData] = React.useState(null);

    const toggle = () => setIsOpen(state => !state);

    const handleChange = React.useCallback((value) => {
        setEmpData(state => ({
            ...state, 
            ...value, 
        }));
    }, [setEmpData]);

    const getEmpData = async(id) => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-employee-info`, {
            params: {
                empId: id, 
            }
        }).then((res) => {
            setEmpData(res.data[0]);
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
            dateOfTermination: data.get('dateofterm'), 
            hrsWorked: data.get('hrs'), 
            holidaySalary: data.get('hsalary'), 
            holidaysWorked: data.get('hworked'), 
            overTimeSalary: data.get('osalary'), 
            overTimeHrs: data.get('ohrs'), 
            comments: data.get('comments'), 
        };
        setLoading(true);
        await axios.post(`${APP_URL}/update-employee`, params).then((e) => {
            alert('Employee was updated');
        }).catch((e) => {
            alert('Error');
        });
        setLoading(false);
        handleClose();
    };

    const delEmp = React.useCallback(async(id) => {
        await axios.post(`${APP_URL}/delete-employee`, { id: id }).then((e) => {
            alert('Employee was deleted');
        }).catch((e) => {
            alert('Error');
        });
        handleClose();
    }, [handleClose]);

    React.useEffect(() => {
        getEmpData(empId);
    }, [empId]);

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress/>
        </Backdrop>
    ), []);

    const alerty = React.useMemo(() => (
        <Dialog open={isOpen} onClose={toggle}>
            <DialogTitle>Delete this employee</DialogTitle>
            <DialogContent>
                <DialogContentText>Delete this employee? This action is undoable!</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => delEmp(empId)}>Delete</Button>
                <Button onClick={toggle} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    ), [isOpen, delEmp, empId]);

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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Employee info</Typography>
                    <Button color="error" onClick={toggle}>Delete employee</Button>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={(e) => handleSubmit(e, empId)} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Employee Id: {empData?.id}</FormLabel>
                            <FormLabel>Employee Age: {calculateAge(empData?.dob)}</FormLabel>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="empname">Employee name</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="empname" name="empname" label="Employee name" placeholder="Employee name" type="text" fullWidth inputProps={{ maxLength: 30 }} value={empData?.name} onChange={e => handleChange({ name: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <InputLabel sx={{ mt: 2.5 }}>{empData?.status}</InputLabel>
                            <Select required id='status' name='status' label='Status' value={empData?.status} onChange={e => handleChange({ status: e.target.value })} sx={{ width: 130 }}>
                                <MenuItem value='on-work'>On work</MenuItem>
                                <MenuItem value='on-vacation'>On vacation</MenuItem>
                                <MenuItem value='on-leave'>On leave</MenuItem>
                                <MenuItem value='available'>Available</MenuItem>
                            </Select>
                        </FormControl>
                        <Box width={0.03}/>
                        <FormControl>
                            <FormLabel htmlFor="role">Role</FormLabel>
                            <InputLabel sx={{ mt: 2.5 }}>{empData?.role}</InputLabel>
                            <Select required id='role' name='role' label='Role' value={empData?.role} onChange={e => handleChange({ role: e.target.value })} sx={{ width: 130 }}>
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
                            <OutlinedInput required margin="dense" id="empcode" name="empcode" label="Employee code" placeholder="Employee code" type="text" fullWidth inputProps={{ maxLength: 20 }} value={empData?.empCode} onChange={e => handleChange({ empCode: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="dob">Date of birth</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='dob' name='dob' disableFuture slotProps={{ textField: { required: true } }} value={dayjs(empData?.dob)} onChange={e => handleChange({ dob: e.target.value })}/>
                            </LocalizationProvider>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <InputLabel sx={{ mt: 2.5 }}>{empData?.gender}</InputLabel>
                            <Select required id='gender' name='gender' label='Gender' value={empData?.gender} onChange={e => handleChange({ gender: e.target.value })} sx={{ width: 50 }}>
                                <MenuItem value='M'>Male</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <OutlinedInput required margin="dense" id="phone" name="phone" label="Phone" placeholder="Phone with country code" type="tel" fullWidth inputProps={{ maxLength: 15 }} value={empData?.phno} onChange={e => handleChange({ phno: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <OutlinedInput required margin="dense" id="email" name="email" label="Email" placeholder="Employee@email.com" type="email" fullWidth inputProps={{ maxLength: 50 }} value={empData?.email} onChange={e => handleChange({ email: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <OutlinedInput required margin="dense" id="address" name="address" label="Address" placeholder="Address" type="text" fullWidth inputProps={{ maxLength: 200 }} value={empData?.address} onChange={e => handleChange({ address: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="emph">Emergency contact number</FormLabel>
                            <OutlinedInput required margin="dense" id="emph" name="emph" label="Emergency contact number" placeholder="Phone with country code" type="tel" fullWidth inputProps={{ maxLength: 15 }} value={empData?.emPhNo} onChange={e => handleChange({ emPhNo: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="emname">Emergency contact name</FormLabel>
                            <OutlinedInput required margin="dense" id="emname" name="emname" label="Emergency contact name" placeholder="Name" type="text" fullWidth inputProps={{ maxLength: 30 }} value={empData?.emName} onChange={e => handleChange({ emName: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="jobTitle">Job title</FormLabel>
                            <OutlinedInput required margin="dense" id="jobTitle" name="jobTitle" label="Job title" placeholder="Job title" type="text" fullWidth inputProps={{ maxLength: 30 }} value={empData?.jobTitle} onChange={e => handleChange({ jobTitle: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="emptype">Employee type</FormLabel>
                            <OutlinedInput required margin="dense" id="emptype" name="emptype" label="Employee type" placeholder="Employee type" type="text" fullWidth inputProps={{ maxLength: 20 }} value={empData?.empType} onChange={e => handleChange({ empType: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="salary">Salary</FormLabel>
                            <OutlinedInput required margin="dense" id="salary" name="salary" label="Salary" placeholder="Salary" type="number" fullWidth inputProps={{ maxLength: 8 }} value={empData?.salary} onChange={e => handleChange({ salary: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="hsalary">Holiday salary</FormLabel>
                            <OutlinedInput margin="dense" id="hsalary" name="hsalary" label="Holiday salary" placeholder="Holiday salary" type="number" fullWidth inputProps={{ maxLength: 8 }} value={empData?.holidaySalary} onChange={e => handleChange({ holidaySalary: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="osalary">Ovetime salary</FormLabel>
                            <OutlinedInput margin="dense" id="osalary" name="osalary" label="Overtime salary" placeholder="Overtime salary" type="number" fullWidth inputProps={{ maxLength: 8 }} value={empData?.overTimeSalary} onChange={e => handleChange({ overTimeSalary: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="hrs">Number of hours worked</FormLabel>
                            <OutlinedInput margin="dense" id="hrs" name="hrs" label="Number of hours worked" placeholder="Number of hours worked" type="number" fullWidth inputProps={{ maxLength: 10 }} value={empData?.hrsWorked} onChange={e => handleChange({ hrsWorked: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="salary">Number of holidays worked</FormLabel>
                            <OutlinedInput margin="dense" id="hworked" name="hworked" label="Number of holidays worked" placeholder="Number of holidays worked" type="number" fullWidth inputProps={{ maxLength: 5 }} value={empData?.holidaysWorked} onChange={e => handleChange({ holidaysWorked: e.target.value })}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="ohrs">Overtime hours</FormLabel>
                            <OutlinedInput margin="dense" id="ohrs" name="ohrs" label="Overtime hours" placeholder="Overtime hours" type="number" fullWidth inputProps={{ maxLength: 10 }} value={empData?.overTimeHrs} onChange={e => handleChange({ overTimeHrs: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="dateofhire">Date of hire</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='dateofhire' name='dateofhire' slotProps={{ textField: { required: true } }} value={dayjs(empData?.dateOfHire)} onChange={e => handleChange({ dateOfHire: e.target.value })}/>
                            </LocalizationProvider>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="dateofterm">Date of Termination</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker id='dateofterm' name='dateofterm' slotProps={{ textField: { required: true } }} value={dayjs(empData?.dateOfTermination)} onChange={e => handleChange({ dateOfTermination: e.target.value })}/>
                            </LocalizationProvider>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="comments">Comments</FormLabel>
                            <OutlinedInput multiline margin="dense" id="comments" name="comments" label="Comments" placeholder="Comments" type="text" fullWidth inputProps={{ maxLength: 500 }} value={empData?.comments} onChange={e => handleChange({ comments: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Created at: {toDate(empData?.createdAt)}</FormLabel>
                            <FormLabel>Last changed: {toDate(empData?.lastChanged)}</FormLabel>
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

export default React.memo(EmployeeInfo);