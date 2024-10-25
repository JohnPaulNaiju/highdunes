import * as React from 'react';
import SideMenu from './components/SideMenu';
import AppNavbar from './components/AppNavbar';
import AppTheme from '../shared-theme/AppTheme';
import { CssBaseline, Box, Stack, styled } from '@mui/material';

import { chartsCustomizations } from './customization/charts';
import { dataGridCustomizations } from './customization/dataGrid';
import { treeViewCustomizations } from './customization/treeView';

import { Projects, Clients, Employees, DutySheet } from '../screens';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex', 
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
        backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
}));

const xThemeComponents = {
    ...chartsCustomizations, 
    ...dataGridCustomizations, 
    ...treeViewCustomizations, 
};

const RouterContext = React.createContext({});

export default function Home(props){

    const [screen, setScreen] = React.useState(0);

    const handleScreen = React.useCallback((i) => {
        setScreen(i);
    }, [setScreen]);

    return (

        <RouterContext.Provider value={{ screen, handleScreen }}>
            <AppTheme {...props} themeComponents={xThemeComponents}>
                <CssBaseline enableColorScheme/>
                <Container>
                    <SideMenu />
                    <AppNavbar />
                    <Box component="main" sx={{  flexGrow: 1, overflow: 'auto' }}>
                        <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, pt: 4, mt: { xs: 8, md: 0 } }}>
                            {screen === 0 ? <Projects/> : null}
                            {screen === 1 ? <Clients/> : null}
                            {screen === 2 ? <Employees/> : null}
                            {screen === 3 ? <DutySheet/> : null}
                        </Stack>
                    </Box>
                </Container>
            </AppTheme>
        </RouterContext.Provider>

    );

};

export const useRouter = () => React.useContext(RouterContext);