import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err); 
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting gig data:", state);
    mutation.mutate(state);
    //navigate("/mygigs")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="webdev">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="Ai">AI Services</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />  
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

// import React, { useReducer, useState } from "react";
// import "./Add.scss";
// import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
// import upload from "../../utils/upload";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// const Add = () => {
//   const [singleFile, setSingleFile] = useState(undefined);
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   // Improved handleChange: converts numbers for relevant fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const numericFields = ["price", "deliveryTime", "revisionNumber"];
//     const val = numericFields.includes(name) ? Number(value) : value;

//     dispatch({
//       type: "CHANGE_INPUT",
//       payload: { name, value: val },
//     });
//   };

//   const handleFeature = (e) => {
//     e.preventDefault();
//     const feature = e.target[0].value.trim();
//     if (feature) {
//       dispatch({
//         type: "ADD_FEATURE",
//         payload: feature,
//       });
//     }
//     e.target[0].value = "";
//   };

//   const handleUpload = async () => {
//     if (!singleFile) {
//       alert("Please select a cover image before uploading.");
//       return;
//     }
//     setUploading(true);
//     try {
//       const cover = await upload(singleFile);
//       const images = await Promise.all(
//         [...files].map((file) => upload(file))
//       );
//       dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Error uploading files. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const mutation = useMutation({
//       mutationFn: (gig) => {
//     return newRequest.post("/gigs", { ...gig, userId: currentUser._id });
//   },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["myGigs"]);
//       navigate("/mygigs");
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation example
//     if (!state.title.trim()) return alert("Please enter a title.");
//     if (!state.cat) return alert("Please select a category.");
//     if (!state.cover) return alert("Please upload a cover image.");
//     if (!state.price || state.price <= 0) return alert("Please enter a valid price.");

//     mutation.mutate(state);
//   };

//   return (
//     <div className="add">
//       <div className="container">
//         <h1>Add New Gig</h1>
//         <div className="sections">
//           <div className="info">
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="e.g. I will do something I'm really good at"
//               onChange={handleChange}
//               value={state.title}
//             />
//             <label>Category</label>
//             <select
//               name="cat"
//               id="cat"
//               onChange={handleChange}
//               value={state.cat || "design"}
//             >
//               <option value="design">Design</option>
//               <option value="web">Web Development</option>
//               <option value="animation">Animation</option>
//               <option value="music">Music</option>
//             </select>
//             <div className="images">
//               <div className="imagesInputs">
//                 <label>Cover Image</label>
//                 <input
//                   type="file"
//                   onChange={(e) => setSingleFile(e.target.files[0])}
//                 />
//                 <label>Upload Images</label>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={(e) => setFiles(e.target.files)}
//                 />
//               </div>
//               <button onClick={handleUpload} disabled={uploading}>
//                 {uploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//             <label>Description</label>
//             <textarea
//               name="desc"
//               placeholder="Brief descriptions to introduce your service to customers"
//               rows="16"
//               onChange={handleChange}
//               value={state.desc}
//             ></textarea>
//             <button onClick={handleSubmit}>Create</button>
//           </div>
//           <div className="details">
//             <label>Service Title</label>
//             <input
//               type="text"
//               name="shortTitle"
//               placeholder="e.g. One-page web design"
//               onChange={handleChange}
//               value={state.shortTitle}
//             />
//             <label>Short Description</label>
//             <textarea
//               name="shortDesc"
//               placeholder="Short description of your service"
//               rows="10"
//               onChange={handleChange}
//               value={state.shortDesc}
//             ></textarea>
//             <label>Delivery Time (e.g. 3 days)</label>
//             <input
//               type="number"
//               name="deliveryTime"
//               onChange={handleChange}
//               value={state.deliveryTime}
//               min={0}
//             />
//             <label>Revision Number</label>
//             <input
//               type="number"
//               name="revisionNumber"
//               onChange={handleChange}
//               value={state.revisionNumber}
//               min={0}
//             />
//             <label>Add Features</label>
//             <form className="add" onSubmit={handleFeature}>
//               <input type="text" placeholder="e.g. page design" />
//               <button type="submit">Add</button>
//             </form>
//             <div className="addedFeatures">
//               {state.features.map((f) => (
//                 <div className="item" key={f}>
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "REMOVE_FEATURE", payload: f })
//                     }
//                   >
//                     {f}
//                     <span>X</span>
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <label>Price</label>
//             <input
//               type="number"
//               name="price"
//               onChange={handleChange}
//               value={state.price}
//               min={0}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Add;
