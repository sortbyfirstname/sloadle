import React from 'react';
import { Stack } from "@mui/material";
import './App.css';
import * as Component from "./Components";

export default function App() {
    return (
        <div className="App">
            <Component.TitleGif />
            <Stack className="Content">
                <Component.MainGif />
                <Component.SearchAndProgress />
            </Stack>
    </div>
    );
}
