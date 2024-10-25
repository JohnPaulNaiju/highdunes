import * as React from 'react';
import { Chip } from '@mui/material';

function renderStatus(status) {

    return <Chip label={status} color='success' size="small" />;

};

export const columns = [
    { 
        field: 'name', 
        headerName: 'Client Name', 
        flex: 1.5, 
        minWidth: 200 
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => renderStatus(params.value),
    },
    {
        field: 'mob1',
        headerName: 'Phone number',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'email',
        headerName: 'Email',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'clientType',
        headerName: 'Client Type',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 120,
    },
];