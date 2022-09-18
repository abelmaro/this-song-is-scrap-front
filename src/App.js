import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Button from "@mui/material/Button";
import axios from "axios";
import { SongInfo } from "./components/SongInfo";
import { motion } from "framer-motion";
import { MagnifyingGlass } from "react-loader-spinner";

function App() {
    const [artistName, setArtistName] = useState("");
    const [songName, setSongName] = useState("");
    const [songInfo, setSongInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    function getSongInfo() {
        setLoading(true);
        setSongInfo(null);
        let query = songName + " " + artistName;
        axios
            .get(
                "https://tsis-backend-abelmaro.vercel.app/api/getSongInfo/" +
                    query
            )
            .then((response) => {
                setSongInfo(response.data);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                console.error(e);
            });
    }

    return (
        <motion.Box transition className="box-container">
            <div className="search-container">
                <SearchBar
                    id="artist-group-input"
                    setter={setArtistName}
                    label="Artist/group name"
                />
                <SearchBar
                    id="song-input"
                    setter={setSongName}
                    label="Song name"
                />
                <Button
                    variant="contained"
                    className="search-button"
                    onClick={() => getSongInfo()}
                >
                    Search!
                </Button>
            </div>
            {loading ? (
                <MagnifyingGlass
                    visible={true}
                    height="250"
                    width="250"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
            ) : songInfo != null ? (
                <>
                    <SongInfo info={songInfo} />
                </>
            ) : (
                <></>
            )}
        </motion.Box>
    );
}

export default App;
