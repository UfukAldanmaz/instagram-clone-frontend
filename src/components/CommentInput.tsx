// import React, { useState } from 'react';

// const CommentInput = ({ onPostComment }) => {
//   const [comment, setComment] = useState('');

//   const handlePostComment = () => {
//     if (comment.trim() !== '') {
//       onPostComment(comment);
//       setComment('');
//     }
//   };

//   return (
//     <div className="flex gap-2">
//       <input
//         type="text"
//         placeholder="Add a comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         className="w-full text-sm outline-none"
//       />
//       <button onClick={handlePostComment} className="text-blue-500">
//         Post
//       </button>
//     </div>
//   );
// };

// export default CommentInput;
