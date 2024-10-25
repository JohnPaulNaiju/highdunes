import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { APP_URL } from '../../';
import { mreq, team } from './gridData';
import { toDate } from '../../functions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CustomizedDataGrid, ClientSearch } from '../../components';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { Button, Dialog, List,  AppBar, Toolbar, IconButton, Typography, Slide, OutlinedInput, FormControl, ListItem, FormLabel, Box, Select, MenuItem, Backdrop, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectInfo = ({projectId, open, handleClose}) => {

    const foreign = React.useRef({
        empId: null, 
        empName: null, 
    });

    const update = React.useRef({
        isUpdate: false, 
        id: null, 
    });

    const [isOpen ,setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [projectData, setProjectData] = React.useState(null);

    const [mOpen, setMopen] = React.useState(0);
    const [tOpen, setTopen] = React.useState(false);

    const toggle = () => setIsOpen(state => !state);
    const mClose = () => setMopen(0);
    const tClose = () => setTopen(false);

    const handleChange = React.useCallback((value) => {
        setProjectData(state => ({
            ...state, 
            ...value, 
        }));
    }, [setProjectData]);

    const getProjectData = async(id) => {
        setLoading(true);
        await axios.get(`${APP_URL}/get-project-info`, {
            params: {
                projectId: id, 
            }
        }).then((res) => {
            setProjectData(res.data[0]);
        }).catch(() => {
            alert('Errora');
        });
        setLoading(false);
    };

    const handleSubmit = async(e, id, props) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);
        const { materialsRequired, materialsUsed, team, clientId, clientName, supervisor, supervisorName } = props;
        const params = {
            id: id, 
            materialsRequired: materialsRequired, 
            materialsUsed: materialsUsed, 
            team: team, 
            projectCode: data.get('pcode'), 
            clientId: clientId, 
            clientName: clientName, 
            name: data.get('pname'), 
            projectDesc: data.get('pdesc'), 
            empId: supervisor, 
            empName: supervisorName, 
            quantityOfService: data.get('qosc'), 
            serviceType: data.get('sType'), 
            hrsTaken: data.get('hrstaken'), 
            startDate: data.get('sdate'), 
            endDate: data.get('edate'), 
            status: data.get('status'), 
            comments: data.get('comments'), 
        };
        await axios.post(`${APP_URL}/update-project`, params).then((e) => {
            alert('Project was updated');
        }).catch((e) => {
            alert('Error');
        });
        setLoading(false);
        handleClose();
    };

    const delProject = React.useCallback(async(id) => {
        await axios.post(`${APP_URL}/delete-project`, { id: id }).then((e) => {
            alert('Project was deleted');
        }).catch((e) => {
            alert('Error');
        });
        handleClose();
    }, [handleClose]);

    const deleteJSON = React.useCallback((type) => {
        const id = update.current.id;
        if(type === 'mreq'){
            setProjectData(state => ({
                ...state, 
                materialsRequired: [...state?.materialsRequired?.filter(obj => obj?.id !== id)]
            }));
        }else if(type === 'mused'){
            setProjectData(state => ({
                ...state, 
                materialsUsed: [...state?.materialsUsed?.filter(obj => obj?.id !== id)]
            }));
        }else if(type === 'team'){
            setProjectData(state => ({
                ...state, 
                team: [...state?.team?.filter(obj => obj?.id !== id)]
            }));
        }
        tClose();
        mClose();
        update.current.id = null;
        update.current.isUpdate = null;
    }, []);

    const handleMSubmit = React.useCallback((e, type) => {
        const id = update.current.id;
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = {
            id: Date.now(), 
            item: data.get('mname'), 
            quantity: data.get('mq'), 
        };
        if(type === 1){
            if(update.current.isUpdate){
                setProjectData(state => ({
                    ...state, 
                    materialsRequired: [...state?.materialsRequired?.map(obj => obj?.id === id ? params : obj)]
                }));
            }else{
                setProjectData(state => ({
                    ...state, 
                    materialsRequired: [params, ...(state?.materialsRequired || [])]
                }));
            }
        }else if(type === 2){
            if(update.current.isUpdate){
                setProjectData(state => ({
                    ...state, 
                    materialsUsed: [...state?.materialsUsed?.map(obj => obj?.id === id ? params : obj)]
                }));
            }else{
                setProjectData(state => ({
                    ...state, 
                    materialsUsed: [params, ...(state?.materialsUsed || [])]
                }));
            }
        }
        mClose();
        update.current.id = null;
        update.current.isUpdate = null;
    }, []);

    const handleTSubmit = React.useCallback((e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const params = {
            id: Date.now(), 
            empId: foreign.current.empId, 
            empName: foreign.current.empName, 
            time: data.get('avgwrkhrs'), 
        };
        setProjectData(state => ({
            ...state, 
            team: [params, ...(state?.team || [])]
        }));
        tClose();
    }, []);

    React.useEffect(() => {
        getProjectData(projectId);
    }, [projectId]);

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress/>
        </Backdrop>
    ), []);

    const alerty = React.useMemo(() => (
        <Dialog open={isOpen} onClose={toggle}>
            <DialogTitle>Delete this project</DialogTitle>
            <DialogContent>
                <DialogContentText>Delete this project? This action is undoable!</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => delProject(projectId)}>Delete</Button>
                <Button onClick={toggle} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    ), [isOpen, delProject, projectId]);

    const mDialog = React.useMemo(() => (
        <Dialog open={mOpen} onClose={mClose}>
            <DialogTitle>{update.current.isUpdate ? 'Edit' : ''} Materials{mOpen === 1 ? ' required' : ' used'}</DialogTitle>
            <DialogContent sx={{ minWidth: 360 }}>
                <Box component='form' onSubmit={e => handleMSubmit(e, mOpen)} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="mname">Material name</FormLabel>
                        <OutlinedInput autoFocus required margin="dense" id="mname" name="mname" label="Material name" placeholder="Material name" type="text" fullWidth inputProps={{ maxLength: 50 }}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="mq">Material Quantity</FormLabel>
                        <OutlinedInput autoFocus required margin="dense" id="mq" name="mq" label="Quantity" placeholder="Quantity" type="number" fullWidth inputProps={{ maxLength: 5 }}/>
                    </FormControl>
                    <Box sx={{ flexDirection: 'row', mt: 2 }}>
                        <Button type='submit'>{update.current.isUpdate ? 'Edit' : 'Add'}</Button>
                        {update.current.isUpdate ? <Button onClick={() => deleteJSON(mOpen === 1 ? 'mreq' : 'mused')} autoFocus>Delete</Button> : null}
                        <Button onClick={mClose} autoFocus>Cancel</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    ), [mOpen, handleMSubmit, update, deleteJSON]);

    const tDialog = React.useMemo(() => (
        <Dialog open={tOpen} onClose={tClose}>
            <DialogTitle>{update.current.isUpdate ? 'Edit' : ''} Select employee</DialogTitle>
            <DialogContent sx={{ minWidth: 360 }}>
                <Box component='form' onSubmit={handleTSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <ClientSearch label='Search Employee' placeholder='Search employee' type='employee' id='' name='' onChange={(id, name) => {
                        foreign.current.empId = id;
                        foreign.current.empName = name;
                    }}/>
                    <FormControl fullWidth>
                        <FormLabel htmlFor="avgwrkhrs">Avg working hours</FormLabel>
                        <OutlinedInput autoFocus margin="dense" id="avgwrkhrs" name="avgwrkhrs" label="Avg working hours" placeholder="Avg working hours" type="number" fullWidth inputProps={{ maxLength: 10 }}/>
                    </FormControl>
                    <Box sx={{ flexDirection: 'row', mt: 2 }}>
                        <Button type='submit'>{update.current.isUpdate ? 'Edit' : 'Add'}</Button>
                        {update.current.isUpdate ? <Button onClick={() => deleteJSON('team')} autoFocus>Delete</Button> : null}
                        <Button onClick={tClose} autoFocus>Cancel</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    ), [tOpen, handleTSubmit, update, deleteJSON]);

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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Project Info</Typography>
                    <Button color="error" onClick={toggle}>Delete project</Button>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={(e) => handleSubmit(e, projectId, projectData)} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Project Id: {projectData?.id}</FormLabel>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="pname">Project name</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="pname" name="pname" label="Project name" placeholder="Project name" type="text" fullWidth inputProps={{ maxLength: 50 }} value={projectData?.name} onChange={e => handleChange({ name: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="pcode">Project Code</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="pcode" name="pcode" label="Project Code" placeholder="Project Code" type="text" fullWidth inputProps={{ maxLength: 20 }} value={projectData?.projectCode} onChange={e => handleChange({ projectCode: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="sdate">Start date</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='sdate' name='sdate' slotProps={{ textField: { required: true } }} value={dayjs(projectData?.startDate)} onChange={e => handleChange({ startDate: e })}/>
                            </LocalizationProvider>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <ClientSearch label='Client' placeholder='Search clients' type='client' id={projectData?.clientId} name={projectData?.clientName} onChange={(id, name) => handleChange({ clientId: id, clientName: name })}/>
                        <Box width={0.01}/>
                        <ClientSearch label='Supervisor' placeholder='Search employees' type='employee' id={projectData?.supervisor} name={projectData?.supervisorName} onChange={(id, name) => handleChange({ supervisor: id, supervisorName: name })}/>
                    </ListItem>
                    <ListItem>
                        <FormControl>
                            <FormLabel htmlFor="sType">Service type</FormLabel>
                            <OutlinedInput autoFocus required margin="dense" id="sType" name="sType" label="Service type" placeholder="Service type" type="text" fullWidth inputProps={{ maxLength: 50 }} value={projectData?.serviceType} onChange={e => handleChange({ serviceType: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <Select required id='status' name='status' label='Status' value={projectData?.status} onChange={e => handleChange({ status: e.target.value })}>
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='pending'>Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="pdesc">Project description</FormLabel>
                            <OutlinedInput multiline autoFocus required margin="dense" id="pdesc" name="pdesc" label="Project Description" placeholder="Project Description" type="text" fullWidth inputProps={{ maxLength: 200 }} value={projectData?.projectDesc} onChange={e => handleChange({ projectDesc: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="qosc">Quantity of service</FormLabel>
                            <OutlinedInput autoFocus margin="dense" id="qosc" name="qosc" label="Quantity of service" placeholder="Quantity of service" type="text" fullWidth inputProps={{ maxLength: 50 }} value={projectData?.quantityOfService} onChange={e => handleChange({ quantityOfService: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="hrstaken">Hours taken</FormLabel>
                            <OutlinedInput autoFocus margin="dense" id="hrstaken" name="hrstaken" label="Hours taken" placeholder="Hours taken" type="number" fullWidth inputProps={{ maxLength: 10 }} value={projectData?.hrsTaken} onChange={e => handleChange({ hrsTaken: e.target.value })}/>
                        </FormControl>
                        <Box width={0.01}/>
                        <FormControl>
                            <FormLabel htmlFor="edate">End date</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker required id='edate' name='edate' slotProps={{ textField: { required: true } }} value={dayjs(projectData?.endDate)} onChange={e => handleChange({ endDate: e })}/>
                            </LocalizationProvider>
                        </FormControl>
                    </ListItem>
                    <ListItem sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <FormControl fullWidth>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="mreq">Materials Required</FormLabel>
                                <IconButton onClick={() => {
                                    setMopen(1);
                                    update.current.isUpdate = false;
                                    update.current.id = null;
                                }}>
                                    <AddIcon/>
                                </IconButton>
                            </Box>
                            <CustomizedDataGrid onClick={e => {
                                setMopen(1);
                                update.current.isUpdate = true;
                                update.current.id = e;
                            }} columns={mreq} rows={projectData?.materialsRequired || []}/>
                        </FormControl>
                        <Box width={0.05}/>
                        <FormControl fullWidth>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="mused">Materials Used</FormLabel>
                                <IconButton onClick={() => {
                                    setMopen(2);
                                    update.current.isUpdate = false;
                                    update.current.id = null;
                                }}>
                                    <AddIcon/>
                                </IconButton>
                            </Box>
                            <CustomizedDataGrid onClick={e => {
                                setMopen(2);
                                update.current.isUpdate = true;
                                update.current.id = e;
                            }} columns={mreq} rows={projectData?.materialsUsed || []}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="team">Team</FormLabel>
                                <IconButton onClick={() => {
                                    setTopen(true);
                                    update.current.isUpdate = false;
                                    update.current.id = null;
                                }}>
                                    <AddIcon/>
                                </IconButton>
                            </Box>
                            <CustomizedDataGrid onClick={e => {
                                setTopen(true);
                                update.current.isUpdate = true;
                                update.current.id = e;
                            }} columns={team} rows={projectData?.team || []}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="comments">Comments</FormLabel>
                            <OutlinedInput multiline autoFocus margin="dense" id="comments" name="comments" label="Comments" placeholder="Comments" type="text" fullWidth inputProps={{ maxLength: 500 }} value={projectData?.comments} onChange={e => handleChange({ comments: e.target.value })}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Created at: {toDate(projectData?.createdAt)}</FormLabel>
                            <FormLabel>Last changed: {toDate(projectData?.lastChanged)}</FormLabel>
                        </FormControl>
                    </ListItem>
                </List>
                <Button type='submit' color="inherit" sx={{ m: 2 }}>Update</Button>
            </Box>
            {loading ? loader : null}
            {isOpen ? alerty : null}
            {mOpen === 0 ? null : mDialog}
            {tOpen ? tDialog : null}
        </Dialog>

    );

};

export default React.memo(ProjectInfo);