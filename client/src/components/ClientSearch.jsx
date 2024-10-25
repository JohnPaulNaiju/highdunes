import React from 'react';
import axios from 'axios';
import { APP_URL } from '../';
import { TextField, Autocomplete, Box, FormControl, FormLabel, Chip } from '@mui/material';

const ClientSearch = ({placeholder, label, onChange, type, id, name}) => {

    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [client, setClient] = React.useState({
        id: id || '', 
        name: name || '', 
    });

    const handleChange = React.useCallback((value) => {
        setClient({
            id: value?.id || '', 
            name: value?.name || '', 
        });
        onChange(value?.id || '', value?.name || '');
    }, [setClient, onChange]);

    const getClients = React.useCallback(async() => {
        setLoading(true);
        if(type === 'client'){
            await axios.get(`${APP_URL}/get-clients`).then((res) => setOptions(res.data)).catch((e) => {
                alert('Error');
            });
        }else if(type === 'employee'){
            await axios.get(`${APP_URL}/get-employees`).then((res) => setOptions(res.data)).catch((e) => {
                alert('Error');
            });
        }
        setLoading(false);
    }, [type]);

    React.useEffect(() => {
        getClients();
    }, [getClients]);

    const colors = {
        "available": 'success',
        "on-work": 'info',
        "on-leave": 'error',
        "on-vacation": 'default', 
    };

    return (

        <FormControl>
            <FormLabel>{label}<br/>Id: {client.id || id || '-'}<br/>Name: {client.name || name || '-'}</FormLabel>
            <Autocomplete 
            autoHighlight 
            options={options} 
            disabled={loading} 
            sx={{ width: 300 }} 
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => handleChange(value)}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box key={key} component="li" {...optionProps}>
                        {option.id} {option.name}
                        {type === 'employee' ? <Chip variant="filled" color={colors[option.status]} label={option.status} sx={{ ml: 1 }}/> : null}
                    </Box>
                );
            }}
            renderInput={(params) => (<TextField {...params} disabled={loading} label={placeholder} placeholder={loading ? 'Loading' : placeholder} slotProps={{ input: { ...params.InputProps, type: 'search' } }}/>)}/>
        </FormControl>

    );

};

export default React.memo(ClientSearch);