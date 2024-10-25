import React from 'react';
import { Chip, Autocomplete, TextField } from '@mui/material';

const ChipInput = ({id, fullWidth, placeholder, value, onChange, options = []}) => {

    const handleChange = React.useCallback((oldValues, newValue) => {
        if(oldValues) onChange([...oldValues, newValue]);
        else onChange([newValue]);
    }, []);

    return (

        <Autocomplete 
        multiple 
        freeSolo 
        value={value || []} 
        id={id} name={id} 
        fullWidth={fullWidth} 
        options={options?.map((option) => option)} 
        onChange={e => handleChange(value, e.target.value)} 
        renderTags={(value, getTagProps) =>
            value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Chip variant="filled" color='success' label={option} key={key} {...tagProps} />;
            })
        }
        renderInput={(params) => <TextField {...params} id={id} name={id} variant="outlined" placeholder={placeholder}/>}/>

    );

};

export default React.memo(ChipInput);