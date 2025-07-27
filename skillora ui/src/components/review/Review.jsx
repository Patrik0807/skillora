// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import newRequest from "../../utils/newRequest";
// import "./Review.scss";
// const Review = ({ review }) => {
//   const { isLoading, error, data } = useQuery(
//     {
//       queryKey: [review.userId],
//       queryFn: () =>
//         newRequest.get(`/users/${review.userId}`).then((res) => {
//           return res.data;
//         }),
//     },
//   );


//   return (
//     <div className="review">
//       {isLoading ? (
//         "loading"
//       ) : error ? (
//         "error"
//       ) : (
//         <div className="user">
//           <img className="pp" src={data.img || "/img/noavatar.webp"} alt="" />
//           <div className="info">
//             <span>{data.username}</span>
//             <div className="country">
//               <span>{data.country}</span>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="stars">
//         {Array(review.star)
//           .fill()
//           .map((item, i) => (
//             <img src="/img/star.png" alt="" key={i} />
//           ))}
//         <span>{review.star}</span>
//       </div>
//       <p>{review.desc}</p>
//       <div className="helpful">
//         <span>Helpful?</span>
//         <img src="/img/like.png" alt="" />
//         <span>Yes</span>
//         <img src="/img/dislike.png" alt="" />
//         <span>No</span>
//       </div>
//     </div>
//   );
// };

// export default Review;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";

const Review = ({ review }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // Fetch user info
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  // Delete review mutation
  const mutation = useMutation({
    mutationFn: (id) => {
      console.log("Trying to delete review:", id); // ✅ Log for testing
      return newRequest.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      alert("Review deleted");
      queryClient.invalidateQueries(["reviews", review.gigId]); // Refetch reviews
    },
    onError: (err) => {
      alert("Failed to delete review");
      console.error(err.response?.data || err.message); // Better error info
    },
  });

  // Delete button click handler
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      mutation.mutate(review._id);
    }
  };

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.webp"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>

      <p>{review.desc}</p>

      {/* ✅ Show delete button if it's user's review */}
      {currentUser?._id === review.userId && (
        <button className="deleteBtn" onClick={handleDelete}>
          🗑 Delete
        </button>
      )}
    </div>
  );
};

export default Review;
