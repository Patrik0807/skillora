//import axios from "axios";

// const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// const upload = async (file) => {
//   const data = new FormData();
//   data.append("file", file);
//     data.append("upload_preset", "fiverr");

//   try {
//     const res = await axios.post("https://api.cloudinary.com/v1_1/dc1kmj3os/image/upload", data);
//     const { secure_url } = res.data;
//     return secure_url;
//   } catch (err) {
//     console.log("Upload error:", err.response?.data || err.message);
//   }
// };

// export default upload;

import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const cloudinaryUrl = import.meta.env.VITE_UPLOAD_LINK;
    console.log("UPLOAD LINK:", cloudinaryUrl);

    const res = await axios.post(cloudinaryUrl, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    console.log("Upload error:", err.response?.data || err.message);
  }
};

export default upload;
