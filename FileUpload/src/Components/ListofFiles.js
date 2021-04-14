import axios from 'axios';
import { useEffect, useState } from 'react';
import dragCss from './ListofFiles.module.css';
const ListOfFiles = (props)=>{
    let [files,changeFiles] = useState([]);
    let [error,changeError] = useState("");
    useEffect(async ()=>{
        try{
            let files = await axios.get('http://localhost:3001/files');
            if(files.status === 200){
                changeFiles(files.data.files);
            }
        }catch(err){
            changeError("Server Error");
        }
    },[]);
    let getAllItem = ()=>{
        return files.map((x,i)=>{
            return <li key={i} className={`collection-item ${dragCss.list}`}><span>{x}</span> <a href={`http://localhost:3001/${x}`}>Parse</a></li>
        })
    }
    let getAllFiles = ()=>{
        console.log(getAllItem());
        return (
            <ul style={{width:"100%"}} class="collection">
                {getAllItem()}
            </ul>
        )
    }
    return (
        <div className={dragCss.dragContainer}>
            <div className= {dragCss.dragBox}>
                <h5>Uploaded Files</h5>
                {error ? <h5> {error} </h5> : getAllFiles()}
            </div>
        </div>
    )
}
export default ListOfFiles;