import { useState } from "react";
import FormData from 'form-data';
import axios from "axios";

import "./FileUpload.css";

const FileUpload = ({ contract, provider, account }) => {

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("No Files Selected")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formdata = new FormData();
                formdata.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formdata,
                    headers: {
                        pinata_api_key: `
                        811698092a73556fbaf0`,
                        pinata_secret_api_key: `
                        5f4760275b2d087b3d977bb14bcd0a1fad954a02e8652e0e8786a426b49be7c0`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.add(account, ImgHash);
                alert("Successfully File Uploaded");
                setFileName("No file selected");
                setFile(null);

            } catch (e) {
                console.error(e);
                alert("Unable to upload file");
            }
        }
    }
    const retrieveFile = (e) => {
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();


    };

    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose File
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} ></input>
            <span className="textArea">Name:{fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload File</button>
        </form>

    </div>;

};

export default FileUpload;