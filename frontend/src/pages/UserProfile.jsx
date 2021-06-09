// עמוד לא בשישמוש

import React from 'react';
import nemoPic from '../assets/imgs/nemoDemo.jpg'

export function UserProfile() {
  return (
    <main className="user-main-container">
      <div className="profile-left-container">
        <div className="user-details">
          <h1>Nemoooo</h1>
          <img
            className="profile-img"
            src={nemoPic}
          ></img>
          <div>Events Created : 8</div>
          <div>Events Subscribed : 22</div>
          <div>followers : 45</div>
          <div>Reviews : 11</div>
          <div>Rating : 4.0</div>
          <div>⭐⭐⭐⭐</div>
        </div>
        {/* <div className="user-reviews">
                    <h1>Reviews</h1>
                    <h2>Yaron Biton</h2>
                    <ul>
                        <li>the best game at the Town</li>
                        <li>great team leader!</li>
                        <li>great pepole there!</li>
                        <li>dont go! they are not nice!</li>
                    </ul>
                    <h3>Rank : </h3>

                </div> */}
      </div>

      {/* <div className="profile-right-container">
                <div className="user-events">
                    <h1>Events</h1>
                    <ul>
                       <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                    </ul>

                </div>
                <div className="user-recommend">
                    <h1>recommended for you!</h1>
                    <ul>
                       <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                        <li>football Sportek tel aviv</li>
                    </ul>
                </div>





            </div> */}
    </main>
  );
}
