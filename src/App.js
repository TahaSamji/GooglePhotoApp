
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';



function App() {
  const [image,setImage] = useState("");
  const [file, setfile] = useState();
  const handleChange = function (e) {
   console.log(e.target.files[0]);
    setfile(e.target.files[0]);

  }
  const Authenticate = async () => {
    try {
      const res = await axios({
        url: "http://localhost:8000/Authenticate",
        method: 'get',
      });
      if (res.data) {
        
        window.location.href = res.data;
       
      }
    } catch (error) {
      console.error(error);
    }
  };
  const Getdata = async () => {
    try {
      const res = await axios({
        url: "http://localhost:8000/GetData",
        method: 'get',

      });
      if (res.data) {
        
        console.log(res.data);
       
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("UploadImage",file);
      const res = await axios({
        url: "http://localhost:8000/UploadImage",
        method: 'post',
        data:formData
      });
      if (res.data) {
        
        console.log(res.data);
       
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (

    //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
    <div className="App">
     <button onClick={Authenticate}>Authenticate</button>
     <button onClick={Getdata}>GetImages</button>
     <input onChange={handleChange} type='file'></input>
     <button onClick={UploadImage}>Upload Image</button>
     
    </div>
  );
}

export default App;
