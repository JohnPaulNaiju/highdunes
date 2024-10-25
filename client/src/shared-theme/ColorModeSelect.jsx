import * as React from 'react';
import { Select, MenuItem, useColorScheme } from '@mui/material';

export default function ColorModeSelect(props) {

    const { mode, setMode } = useColorScheme();
    if (!mode) return null;

    return (

        <Select value={mode} onChange={(event) => setMode(event.target.value)} SelectDisplayProps={{ 'data-screenshot': 'toggle-mode' }} sx={{ fontFamily: '"Roboto", sans-serif' }} {...props}>
            <MenuItem value="system" sx={{ fontFamily: '"Roboto", sans-serif' }}>System</MenuItem>
            <MenuItem value="light" sx={{ fontFamily: '"Roboto", sans-serif' }}>Light</MenuItem>
            <MenuItem value="dark" sx={{ fontFamily: '"Roboto", sans-serif' }}>Dark</MenuItem>
        </Select>

    );

};