import { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';

function App() {
  const [images, setImage] = useState([]);
  const [file, setfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setisLoading] = useState(false);

  const handleChange = (e) => {
   const type =  e.target.files[0].type;
    if(type !== "image/png" && type !== "image/bmp" &&type !== "image/jpeg" &&type !== "image/webp" && type !== "image/gif"&& type !== "video/mpeg"&& type !== "video/mp4"	&& type !== "image/avif"){
      window.alert("File Format invalid");
      return
    }
   setfile(e.target.files[0]);
  };

  const Authenticate = async () => {
    try {
      const res = await axios({
        url: "https://google-photos-api-backend.vercel.app/Authenticate",
        method: 'get',
      });
      if (res.data) {
        window.location.href = res.data;
  
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const res = await axios({
        url: "https://google-photos-api-backend.vercel.app/GetAccessToken",
        method: 'get',
      });

      if (res.status === 200) {
        setIsAuthenticated(true);
      } 
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const Getdata = async () => {
    try {
      const res = await axios({
        url: "https://google-photos-api-backend.vercel.app/GetData",
        method: 'get',
      });
      if (res.data) {
        setImage(res.data.mediaItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UploadImage = async () => {
    try {
      setisLoading(true);
      const formData = new FormData();
      formData.append("UploadImage", file);
      const res = await axios({
        url: "https://google-photos-api-backend.vercel.app/UploadImage",
        method: 'post',
        data: formData,
      });

      if (res.data) {
       Getdata();
       setisLoading(false);
       return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  
    checkAuthStatus();
  
    
  }, []);
  useEffect(() => {
   if(isAuthenticated === true){
     Getdata();
   }
  }, [isAuthenticated]);

  console.log("Is Authenticated:", isAuthenticated);

  return (
    <div style={{ textAlign: 'center' }}>

      <h1>Google Photos Gallery</h1>
      <div>
      {!isAuthenticated && <button onClick={Authenticate}>Authenticate</button>}
      {/* <button onClick={Getdata} >Get Images</button> */}
      {isAuthenticated && <input onChange={handleChange} type="file"  />}
      {isAuthenticated &&<button onClick={UploadImage} >Upload Image</button>}
      <FadeLoader loading={isloading} />
      </div>
      {!isAuthenticated ? (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>Please authenticate to view and upload your Google Photos.</p>
        </div>
      ) : !images ? (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>No images to display. Please Upload an image</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '20px',
          gap: '16px',
        }}>
          {images.map((image) => (
            <div key={image.id} style={{
              flex: '1 1 auto',
              maxWidth: '400px',
            }}>
              <img
                src={image.baseUrl}
                alt={image.description || image.filename}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;