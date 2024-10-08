import React from "react";
import { motion } from "framer-motion";
import {format } from "date-fns";

const itemA = {
    hidden: { opacity: 0, left: "-20px" },
    visible: { opacity: 1, left: 0 },
};
const itemB = {
    hidden: { opacity: 0, right: "-20px" },
    visible: { opacity: 1, right: 0 },
};

const Detail = ({ src, name, value, left, isDate=false }) => {
    return (
        <motion.h3
            style={{ position: "relative" }}
            variants={left===1 ? itemA : itemB}
        >
            <span>
                <img src={src} alt="Error" className="img" />
                {name} :
            </span>
            {/* {!isDate ? (" " + value) : (" " + format(new Date(value), "do MMMM, yyyy"))} */}
            {/* {!isDate ? (" " + value) : (" " + value)} */}
            {" " + value}
        </motion.h3>
    );
};

export default Detail;
