import React from 'react';
import { Auth } from './screens';
import Home from './navigation/Home';
import { SignedIn, SignedOut, ClerkProvider } from "@clerk/clerk-react";

const CLERK_PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function App() {

    return (

        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
            <SignedOut>
                <Auth/>
            </SignedOut>
            <SignedIn>
                <Home/>
            </SignedIn>
        </ClerkProvider>

    );

};