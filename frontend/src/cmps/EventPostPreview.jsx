import React from 'react';
import { IconTrash } from '../cmps/icon-cmps/IconTrash';
import messi from '../assets/imgs/messiprofile.jpg';

export function EventPostPreview({ post, onRemovePost }) {
  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-author-fullname">
          <img className="profile-img-post" src={post.author.imgUrl} alt="" />
        </div>
        <div>{post.txt} </div>
      </div>
      <div className="deletes-post-container">
        <button
          className="delete-post-btn svg"
          onClick={() => onRemovePost(post.id)}
          className="delete-post"
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
}

// "posts": [
//     {
//       "id": "r3243",
//       "createdAt": "10/06/21",
//       "author": {
//         "_id": "u103",
//         "fullname": "Itay",
//         "imgUrl": "http://some-img"
//       },
//       "txt": "good match last time! Shit really brought the house down!"
//     }
//   ]
