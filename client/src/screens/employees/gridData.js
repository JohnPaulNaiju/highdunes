import * as React from 'react';
import { Chip } from '@mui/material';

function renderStatus(status) {

    const colors = {
        "available": 'success',
        "on-work": 'info',
        "on-leave": 'error',
        "on-vacation": 'default', 
    };

    return <Chip label={status} color={colors[status]} size="small" />;

};

function renderRole(status) {

    const colors = {
        "super-admin": 'success',
        admin: 'info',
        supervisor: 'error',
        none: 'default', 
    };

    return <Chip label={status} color={colors[status]} size="small" />;

};

export const columns = [
    { 
        field: 'name', 
        headerName: 'Name', 
        flex: 1.5, 
        minWidth: 200 
    },
    {
        field: 'gender',
        headerName: 'Gender',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'phno',
        headerName: 'Mobile',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'jobTitle',
        headerName: 'Job Title',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'empType',
        headerName: 'Type',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'salary',
        headerName: 'Salary',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 150,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => renderStatus(params.value),
    },
    {
        field: 'role',
        headerName: 'Role',
        flex: 0.5,
        minWidth: 100,
        renderCell: (params) => renderRole(params.value),
    },
];