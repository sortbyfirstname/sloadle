import {useState} from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {useWindowResize} from "beautiful-react-hooks";

const config:{apiKey:string | undefined} = {
    apiKey: process.env.REACT_APP_GIPHY_API_KEY
}

const giphy:GiphyFetch = new GiphyFetch(config.apiKey == null ? "" : config.apiKey);

function CurrentWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useWindowResize(() => {
        setWindowWidth(window.innerWidth);
    });

    return windowWidth;
}

function CurrentHeight() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useWindowResize(() => {
       setWindowHeight(window.innerHeight);
    });

    return windowHeight;
}

function Width() {
    const windowWidth = CurrentWidth();
    const windowHeight = CurrentHeight();
    return windowWidth > windowHeight ? windowWidth / 4 : windowWidth * 0.85;
}

export { config, giphy, Width }