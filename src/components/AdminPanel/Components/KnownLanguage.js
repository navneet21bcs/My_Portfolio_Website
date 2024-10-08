import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

import InputBox from "./SubComponents/InputBox/InputBox";
import LanguageAndSkills from "./SubComponents/LanguageAndSkills/LanguageAndSkills";

// import { addKnownLanguage, editKnownLanguage, getUser } from "../../../redux/actions/User";

const KnownLanguage = ({user}) => {
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [buttonText, setButtonText] = useState("Add");

    // const { message, error, loading } = useSelector((state) => state.update);
    // const { user } = useSelector((state) => state.user);
    const loading = false;
    // const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Adding...");
        // await dispatch(addKnownLanguage(name));
        // dispatch(getUser());
        setButtonText("Added");
        setTimeout(() => setButtonText("Add"), 2000);
    };

    const handleUpdate = async (e, id, name) => {
        e.preventDefault();
        // await dispatch(editKnownLanguage(id, name));
        // dispatch(getUser());
    };

    // useEffect(() => {
    //     setEditId(null);
    //     if (error) {
    //         toast.error(error);
    //         dispatch({ type: "CLEAR_ERROR" });
    //     }
    //     if (message) {
    //         toast.success(message);
    //         dispatch({ type: "CLEAR_MESSAGE" });
    //     }
    // }, [error, message, dispatch]);

    return (
        <section className="contact login adminpanelcontainer" id="connect">
            <h2>Manage Skills</h2>

            <div className="adminpanel-form">
                <div className="admin-container-inputbox">
                    <InputBox
                        label="Title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="btncontiner">
                    {!editId ? (
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {buttonText}
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={(e) => handleUpdate(e, editId, name)}
                        >
                            Update
                        </button>
                    )}
                    <NavLink to="/admin">
                        <button disabled={loading}>Back</button>
                    </NavLink>
                </div>
            </div>

            <div className="all-skill-lang-details">
                {user?.languagesKnown?.map((item) => (
                    <LanguageAndSkills
                        key={item._id}
                        item={item}
                        i={1}
                        setEditId={setEditId}
                        setName={setName}
                    />
                ))}
            </div>
        </section>
    );
};

export default KnownLanguage;
