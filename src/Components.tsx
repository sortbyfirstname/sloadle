import React, { useState } from "react";
import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";
import { Button, TextField } from "@mui/material";
import { Circle, CheckCircle } from "@mui/icons-material";
import { GetAnimatedTitle, GetMainGif, SearchClickHandler } from "./Gif";
import { Width } from "./Util";

let currentGif:string;

let attempt:number = 1;

const buttonTextOptions = [
    "Search it",
    "I think it's this",
    "Chickety check it",
    "Maybe this?",
    "Lets 'av it!",
    "Try it",
    "Tell me I'm wrong"
];

const buttonText = () => buttonTextOptions[Math.floor(Math.random() * buttonTextOptions.length)];

function NewTitleGif(title:IGif, width:number) {
    return <Gif gif={title} className={"Title"} width={width} noLink={true} backgroundColor={"transparent"}/>;
}

function NewMainGif(gif:IGif, width:number) {
    return <Gif gif={gif} className={"GIF"} width={width} noLink={true} hideAttribution={true}/>
}

export function TitleGif() {
    const width = Width();
    let title:IGif | null = GetAnimatedTitle();
    return title != null ? NewTitleGif(title, width) : null;
}

export function MainGif() {
    const width = Width();
    let gif:IGif | null = GetMainGif();
    currentGif = gif == null ? "" : gif.id.toString();
    return gif != null ? NewMainGif(gif, width) : null;
}

function Progress(props:any) {
    const [color, setColor]:[string, React.Dispatch<React.SetStateAction<string>>] = useState(props.state);

    return (
        <>
            {(color === "disabled" || color === "action") && <Circle color={color}/>}
            {color === "error" && <Circle color={color}/>}
            {color === "success" && <CheckCircle color={color}/>}
        </>
    );
}

export function SearchAndProgress() {
    const [term, setTerm] = useState('');

    return (
        <div className="SearchAndProgress">
            <Progress state="action"/>
            <Progress state="error"/>
            <Progress state="success"/>
            <Progress state="disabled"/>
            <Progress state="disabled"/>
            <div className="SearchItems">
                <TextField id="answer-text" variant="outlined" label="What could you search to return this GIF?"
                           margin="normal" autoComplete="off"
                           onChange={(e) => setTerm(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   return SearchClickHandler(e, term);
                               }
                           }}/>
                <Button id="search-button" variant="outlined" size="large" onClick={(e) => {
                    return SearchClickHandler(e, term);
                }}>
                    {buttonText()}
                </Button>
            </div>
        </div>
    );
}