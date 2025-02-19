import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RefreshRounded from "@mui/icons-material/RefreshRounded";
import { styled } from "@mui/material/styles";
import { uploadFile } from "./api";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const FileUploadButton = ({ onUploadSuccess }) => {
    const [file, setFile] = useState([]);
    const [msg, setMsg] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("excel_file", file);

        try {
            const response = await uploadFile(formData);
            setMsg(response.data.message);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    const hangleRefresh = async () => {
        // Call the parent component's function to refresh data
        if (onUploadSuccess) {
            onUploadSuccess();
        }
    }

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{ marginBottom: "10px" }}
            >
                Upload files
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button component="label" variant="contained" onClick={handleUpload} style={{ marginLeft: "10px", marginBottom: "10px" }}>
                Submit
            </Button>
            {msg && <><Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<RefreshRounded />}
                onClick={hangleRefresh}
                style={{ marginLeft: "10px", marginBottom: "10px" }}
            >
            </Button>
            <Typography variant="body1">{msg}</Typography></>}
        </>
    );
};

export default FileUploadButton;
