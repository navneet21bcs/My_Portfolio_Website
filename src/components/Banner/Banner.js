import { Container, Row, Col, Nav } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

import './Banner.css';

const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.55,
        },
    },
};

const itemA = {
    hidden: { opacity: 0, x: -20},
    visible: { opacity: 1, x: 0},
}


const Banner = ({homeDetails}) => {
    return (
        <motion.section
            className="banner"
            id="home"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            style={{backgroundImage: `url(${homeDetails.background.url})`}}
        >
            <Container>
                <Row className="aligh-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <motion.span
                            variants={itemA}
                            className="tagline"
                        >
                            Welcome to my Portfolio
                        </motion.span>
                        <motion.h1 
                            variants={itemA}
                        >
                            <Typewriter
                                options={{
                                    strings: [
                                        "Hi, The name's Navneet",
                                        "Web Developer",
                                        "MERN Stack Developer",
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 70,
                                    deleteSpeed: 40,
                                    pauseFor: 2000,
                                }}
                            />
                        </motion.h1>
                        <motion.p 
                            variants={itemA}
                        >
                            {homeDetails.detail}
                            <br />
                            <br />
                            {/* When i'm not coding, I'm the proud father of a baby bulldog, 2 cats and a bunny. */}
                            {/* Programming is like sex: One mistake and you have to support it for the rest of your life. */}
                            <motion.button whileHover={{ scale: 1.05, x:15 }} whileTap={{scale: 0.7, x: -65}} >
                                <span>{homeDetails.quote}</span>
                            </motion.button>
                        </motion.p>
                        <Nav.Link href="#aboutmesec" className="navbar-link">
                            <motion.button
                                variants={itemA}
                                whileTap={{ scale: 0.9 }}
                            >
                                About Me
                                <ArrowRightCircle size={25} />
                            </motion.button>
                        </Nav.Link>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <motion.div
                            whileInView={{
                                scale: [1, 1.5, 1.5, 1, 1],
                                rotate: [0, 0, 270, 270, 0],
                                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                            }}
                        >
                            <img src={homeDetails.banner_img.url} alt="Header Img" />
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </motion.section>
    );
};

export default Banner;
