import dragCss from './Drag.module.css';
import {useDropzone} from 'react-dropzone';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
const Drag = ()=>{
    let history = useHistory(); // for redirect
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({accept:'text/csv'}); // dropzone hook
    let [disable,enable] = useState(true); // for button disable
    let [status,changeStatus] = useState(null); // for error
    useEffect(()=>{
        if(acceptedFiles.length > 0){
            enable(false);
        }else{
            enable(true);
        }
    },[acceptedFiles])

    let getAllFiles = ()=>{
        return  (
            <div className="container">
                <h3>Selected Files</h3>
                <ul style={{width:'100%', height:'100%'}} className="collection">
                    {acceptedFiles.map((x,i)=>{
                        return <li key={i} className="collection-item">{x.name}</li>
                    })}
                </ul>
            </div>
        )
    }

    let uploadToServer = async ()=>{
        changeStatus("");
        let formdata = new FormData();
        acceptedFiles.forEach(x=>{
            formdata.append("avatar",x);
        })
        try{
            let info = await axios.post('http://localhost:3001/uploadfiles',formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            changeStatus("Successfully Uploaded");
            history.push("/files");
        }catch(err){
            changeStatus("There is some Problem with server");
        }
    }

    return (
        <div className={dragCss.dragContainer}>
            <div {...getRootProps({className: `dropzone ${dragCss.dragBox}`})}>
                <input {...getInputProps()} />
                {disable?<p>Drag & Drop</p>:getAllFiles()}
            </div>
            <button onClick={uploadToServer} disabled={disable} className="btn waves-effect waves-light" type="button">UPLOAD</button>
            {<p>{status}</p>}
        </div>
    )
}
export default Drag;