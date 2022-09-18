import "../styles/song-info.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { motion } from "framer-motion";
import { CgPlayPauseO, CgPlayButtonO } from "react-icons/cg";
import React, { useState, useRef } from "react";
import { ModalImageView } from "./ModalImageView";

export const SongInfo = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUrlSelected, setImageUrlSelected] = useState("");

    const audioRef = useRef(null);
    var info = props.info;

    function handlePlayer() {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    }

    console.log(info);
    return (
        <div>
            {modalVisible ? (
                <ModalImageView
                    isToggled={modalVisible}
                    setToggled={setModalVisible}
                    data={{
                        imgUrl: imageUrlSelected,
                    }}
                />
            ) : (
                <></>
            )}
            <div className="header-container">
                <div className="inner-content">
                    <div>
                        <motion.img
                            initial={{ opacity: 0, x: -300 }}
                            animate={{ opacity: [0, 1], x: [-300, 0] }}
                            transition={{ duration: 0.5 }}
                            src={info.mainImage}
                        />
                    </div>
                    <div className="song-resume">
                        {info.artistName} - {info.songName}
                        <div className="audio-player">
                            <audio
                                ref={audioRef}
                                controls
                                style={{ display: "none" }}
                                src={info.songPreview.uri}
                            >
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                            {isPlaying ? (
                                <CgPlayPauseO onClick={() => handlePlayer()} />
                            ) : (
                                <CgPlayButtonO onClick={() => handlePlayer()} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="song-info-container">
                {info.covers.length > 0 && (
                    <div className="cover-container">
                        <div className="cover-photos">
                            <ImageList
                                className="image-list-container"
                                cols={3}
                                rowHeight={164}
                            >
                                {info.covers.img.map((img, i) => (
                                    <ImageListItem
                                        key={"cover_" + i}
                                        sx={{ padding: 1 }}
                                    >
                                        <motion.img
                                            initial={{ opacity: 0, x: -100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ delay: 0.1 }}
                                            src={img.url}
                                            loading="lazy"
                                            onClick={() => {
                                                setImageUrlSelected(img.url);
                                                setModalVisible(true);
                                            }}
                                            onError={(e) => {
                                                e.target.parentElement.remove();
                                            }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </div>
                )}
                <div className="info-container">
                    {info.lyrics !== null && info.lyrics !== "" ? (
                        info.lyrics.map((p, i) => {
                            return (
                                <motion.p className="lyrics-p">{p}</motion.p>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
