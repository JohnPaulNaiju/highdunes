import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CustomizedDataGrid = ({columns, rows, onClick}) => {

    return (

        <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        onRowClick={(obj) => onClick(obj.id)}
        getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
            filterPanel: {
                filterFormProps: {
                    logicOperatorInputProps: {
                        variant: 'outlined',
                        size: 'small',
                    },
                    columnInputProps: {
                        variant: 'outlined',
                        size: 'small',
                        sx: { mt: 'auto' },
                    },
                    operatorInputProps: {
                        variant: 'outlined',
                        size: 'small',
                        sx: { mt: 'auto' },
                    },
                    valueInputProps: {
                        InputComponentProps: {
                            variant: 'outlined',
                            size: 'small',
                        },
                    },
                },
            },
        }}/>

    );

};

export default React.memo(CustomizedDataGrid);