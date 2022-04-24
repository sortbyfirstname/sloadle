import { useState } from "react";
import { useAsync } from "react-async-hook";
import { IGif } from "@giphy/js-types";
import { giphy } from "./Util";

function GetAnimatedTitle() {
    const [title, setTitle] = useState<IGif | null>(null);
    const styles = [0,2,3,4,5,6,8,10,13,14,17,18,23,24,25,26,27];
    useAsync(async () => {
        const {data} = await giphy.animate("Sloadle", { limit: 30 });
        const random = styles[Math.floor(Math.random() * 16)];
        setTitle(data[random]);
    }, []);
    return title;
}

function GetMainGif() {
    const [gif, setGif] = useState<IGif | null>(null);
    useAsync(async () => {
        const {data} = await giphy.search("haha", { sort: "relevant", limit: 10, type: "gifs" });
        setGif(data[0]);
    }, []);
    return gif;
}

async function SearchForGif(term:string) {
    const response = await giphy.search(term, { sort: "relevant", limit: 30, type: "gifs" });
    const gifs = response.data;

    console.log(gifs);

    return gifs.map(gif => gif.id.toString());
}

function SearchClickHandler(event:any, term:string) {
    event.preventDefault();
    return SearchForGif(term);
}

export {
    GetAnimatedTitle,
    GetMainGif,
    SearchClickHandler
}