import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Button from "@mui/material/Button";
import axios from "axios";
import { SongInfo } from "./components/SongInfo";
import { motion } from "framer-motion";
function App() {
    const [artistName, setArtistName] = useState("");
    const [songName, setSongName] = useState("");
    const [songInfo, setSongInfo] = useState(null);
    function getSongInfo() {
        setSongInfo(null);
        let query = songName + " " + artistName;
        axios
            .get("http://localhost:6060/getSongInfo/" + query)

            .then((response) => {
                setSongInfo(response.data);
            })
            .catch((e) => {
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
            {songInfo != null ? (
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
