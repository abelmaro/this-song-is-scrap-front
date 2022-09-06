import { motion } from "framer-motion";
import { useRef } from "react";
import { useOnClickOutside } from "../helpers/onClickOutsideRef";
import "../styles/modal-image.css";

export const ModalImageView = ({ setToggled, data }) => {
    const modalRef = useRef();
    useOnClickOutside(modalRef, () => setToggled(false));

    return (
        <motion.div animate={{opacity: [0,1]}} transition={{duration: 0.3}} className="modal-image" ref={modalRef}>
            <img src={data.imgUrl} alt="song-thumbnail" />
        </motion.div>
    );
};
