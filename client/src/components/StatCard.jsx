import * as React from 'react';
import { SparkLineChart, areaElementClasses } from '@mui/x-charts';
import { useTheme, Box, Card, CardContent, Stack, Typography } from '@mui/material';

function getDaysInMonth(month, year) {
    const date = new Date(year, month, 0);
    const monthName = date.toLocaleDateString('en-US', {
        month: 'short',
    });
    const daysInMonth = date.getDate();
    const days = [];
    let i = 1;
    while (days.length < daysInMonth) {
        days.push(`${monthName} ${i}`);
        i += 1;
    }
    return days;
};

function AreaGradient({ color, id }) {

    return (

        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>

    );
};

const StatCard = ({ title, value, interval, trend, data }) => {

    const theme = useTheme();
    const daysInWeek = getDaysInMonth(4, 2024);

    const trendColors = {
        up:
        theme.palette.mode === 'light'
            ? theme.palette.success.main
            : theme.palette.success.dark,
        down:
        theme.palette.mode === 'light'
            ? theme.palette.error.main
            : theme.palette.error.dark,
        neutral:
        theme.palette.mode === 'light'
            ? theme.palette.grey[400]
            : theme.palette.grey[700],
    };

    // const labelColors = {
    //     up: 'success',
    //     down: 'error',
    //     neutral: 'default',
    // };

    // const color = labelColors[trend];
    const chartColor = trendColors[trend];
    // const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };

    return (

        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>{title}</Typography>
                <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" component="p">{value}</Typography>
                            {/* <Chip size="small" color={color} label={trendValues[trend]} /> */}
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{interval}</Typography>
                    </Stack>
                    <Box sx={{ width: '100%', height: 50 }}>
                        <SparkLineChart
                        colors={[chartColor]}
                        data={data}
                        area
                        showHighlight
                        showTooltip
                        xAxis={{
                            scaleType: 'band',
                            data: daysInWeek, 
                        }}
                        sx={{
                            [`& .${areaElementClasses.root}`]: {
                                fill: `url(#area-gradient-${value})`,
                            },
                        }}>
                            <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
                        </SparkLineChart>
                    </Box>
                </Stack>
            </CardContent>
        </Card>

    );

};

export default React.memo(StatCard);