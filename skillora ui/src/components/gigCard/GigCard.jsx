// import React from "react";
// import "./GigCard.scss";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const GigCard = ({ item }) => {
//   const { isLoading, error, data } = useQuery({
//     queryKey: [item.userId],
//     queryFn: () =>
//       newRequest.get(`/users/${item.userId}`).then((res) => {
//         return res.data;
//       }),
//   });
//   return (
//     <Link to={`/gig/${item._id}`} className="link">
//       <div className="gigCard">
//         <img src={item.cover || "https://via.placeholder.com/300"} alt="" />
//         <div className="info">
//           {isLoading ? (
//             "loading"
//           ) : error ? (
//             "Something went wrong!"
//           ) : (
//             <div className="user">
//               <img src={data.img || "/img/noavatar.webp"} alt="" />
//               <span>{data.username}</span>
//             </div>
//           )}
//           <p>{item.desc}</p>
//           <div className="star">
//             <img src="./img/star.png" alt="" />
//             <span>
//               {!isNaN(item.totalStars / item.starNumber) &&
//                 Math.round(item.totalStars / item.starNumber)}
//             </span>
//           </div>
//         </div>
//         <hr />
//         <div className="detail">
//           <img src="/img/heart.png" alt="" />
//           <div className="price">
//             <span>STARTING AT</span>
//             <h2>$ {item.price}</h2>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;

import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  // Truncate description to 100 characters with "..."
  const truncate = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover || "https://via.placeholder.com/300"} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.webp"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{truncate(item.desc)}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="/img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
