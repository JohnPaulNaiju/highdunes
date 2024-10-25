import React from 'react';
import axios from 'axios';
import { APP_URL } from '../../';
import { styled } from '@mui/material/styles';
import { useSignIn } from "@clerk/clerk-react";
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { Box, Button, FormLabel, FormControl, TextField, Typography, Stack, Card as MuiCard, Avatar, CssBaseline, Backdrop, CircularProgress } from '@mui/material';

const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function Auth(props) {

    const { isLoaded, signIn } = useSignIn();

    const [phone, setPhone] = React.useState({
        value: '', 
        msg: '', 
        error: false, 
    });

    const [passwd, setPasswd] = React.useState({
        value: '', 
        msg: '', 
        error: false, 
    });

    const [loading, setLoading] = React.useState(false);

    const handlePhone = React.useCallback((value) => {
        setPhone(state => ({ ...state, ...value }));
    }, [setPhone]);

    const handlePasswd = React.useCallback((value) => {
        setPasswd(state => ({ ...state, ...value }));
    }, [setPasswd]);

    const continueForAuth = async(phone, passwd) => {
        await axios.post(`${APP_URL}/verify-phone`, { phoneNumber: phone }).then(async(res) => {
            if(res.data.exists){
                const username = `${phone.replace('+', '')}_highdunes`;
                await signIn.create({
                    identifier: username, 
                    password: passwd, 
                    redirectUrl: '/', 
                    actionCompleteRedirectUrl: '/', 
                }).then(() => {
                    window.location.reload();
                }).catch(() => {
                    alert('Error');
                });
                setLoading(false);
            }else{
                setLoading(false);
                alert("User doesn't exists");
            }
        }).catch(() => {
            alert('Error');
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const phone = data.get('phone-number');
        const passwd = data.get('passwd');

        if(!phone || phone.match(regex)){
            handlePhone({ error: true, msg: 'Please enter a valid phone number' });
        }else if(!passwd || passwd.length < 6){
            handlePasswd({ error: true, msg: 'Password must be atleast 6 characters' });
        }else{
            handlePhone({ error: false, msg: '' });
            handlePasswd({ error: false, msg: '' });
            setLoading(true);
            continueForAuth(phone, passwd);
        }
    };

    const loader = React.useMemo(() => (
        <Backdrop open>
            <CircularProgress />
        </Backdrop>
    ), []);

    return (

        <AppTheme {...props}>
            <CssBaseline/>
            <SignInContainer direction="column" height='100vh' width='100vw' display='flex' alignItems='center' justifyContent="center">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' width='100%'>
                        <Avatar src={require('../../assets/logo192.png')}/>
                        <Typography component="p" variant="subtitle1" sx={{ width: '100%', fontWeight: 500, ml: 1.5, color: '#2f3192' }}>High Dunes</Typography>
                    </Box>
                    <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>Sign in</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="phone-number">Phone</FormLabel>
                            <TextField 
                            value={phone.value}
                            error={phone.error} 
                            helperText={phone.msg} 
                            sx={{ ariaLabel: 'phone-number' }} 
                            color={phone.error ? 'error' : 'primary'} 
                            onChange={e => handlePhone({ value: e.target.value })} 
                            autoFocus required fullWidth variant="outlined" id="number" type="phone-number" name="phone-number" placeholder="Phone with country code"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="passwd">Password</FormLabel>
                            <TextField 
                            value={passwd.value}
                            error={passwd.error} 
                            helperText={passwd.msg} 
                            sx={{ ariaLabel: 'otp' }} 
                            color={passwd.error ? 'error' : 'primary'}
                            onChange={e => handlePasswd({ value: e.target.value })}
                            autoFocus required fullWidth variant="outlined" id="passwd" type="passwd" name="passwd" placeholder="Password"/>
                        </FormControl>
                        <Button 
                        fullWidth
                        type="submit"
                        variant="contained">
                            Sign in
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
            {(!isLoaded || loading) ? loader : null}
        </AppTheme>

    );

};