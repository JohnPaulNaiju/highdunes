import * as React from 'react';
import { Chip } from '@mui/material';
import { toDate } from '../../functions';

function renderStatus(status) {

    const colors = {
        active: 'info', 
        completed: 'success', 
        pending: 'warning', 
    };

    return <Chip label={status} color={colors[status]} size="small" />;

};

function renderDate(value){
    const val = toDate(value);
    return <Chip label={val} color='default' size="small" />;
}

export const columns = [
    { 
        field: 'name', 
        headerName: 'Project Name', 
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
        field: 'clientId',
        headerName: 'Client Id',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 30,
    },
    {
        field: 'clientName',
        headerName: 'Client Name',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'supervisor',
        headerName: 'Supervisor Id',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 30,
    },
    {
        field: 'supervisorName',
        headerName: 'Supervisor name',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'serviceType',
        headerName: 'Service Type',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'startDate',
        headerName: 'Started On',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => renderDate(params.value),
    },
];

export const mreq = [
    {
        field: 'item', 
        headerName: 'Materials', 
        flex: 1.5, 
        minWidth: 200, 
    }, 
    {
        field: 'quantity',
        headerName: 'Quantity',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 80,
    },
];

export const team = [
    {
        field: 'empId', 
        headerName: 'Employee Id', 
        flex: 0, 
        minWidth: 80, 
    }, 
    {
        field: 'empName', 
        headerName: 'Employee Name', 
        flex: 1.5, 
        minWidth: 200, 
    }, 
    {
        field: 'time',
        headerName: 'Average working hours',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 80,
    },
];