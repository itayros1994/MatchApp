
// export function Footer() {

//     return (
//       <section className="app-footer container flex justify-center align-center">
//         <p>© MatchApp Team coffee-rights 2021.</p>
//       </section>
//     )
//   }
    
import React from "react";
// import history from '../history.js'

import { SocialShare } from './SocialShare'

export function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-middle flex justify-center space-around">
                    <div className="content">
                            <ul className="clean-list">
                            <h2 className="">About</h2>
                                <li className="">
                                    <p><span>MatchApp </span>is a one-stop-shop for all your social meetups and sports events, whether you're an event organiser, who wants to publish and promote events, or you're just looking to socialise with others on your free time.</p>
                                </li>
                                <li className="social-share">
                                    <SocialShare/>
                                </li>
                            </ul>
                    
                        <div >
                            <h2 className="">Categories</h2>
                            <ul className="clean-list">
                                <li className="">
                                    <a href="#!">Sports</a>
                                </li>
                                <li className="">
                                    <a href="#!">Football</a>
                                </li>
                                <li className="">
                                    <a href="#!">BasketBall</a>
                                </li>
                                <li className="">
                                    <a href="#!">Running</a>
                                </li>
                                <li className="">
                                    <a href="#!">VolleyBall</a>
                                </li>
                                <li className="">
                                    <a href="#!">Explore</a>
                                </li>
                            </ul>
                        </div>
                        <div className="quik-links" >
                            <h2 className="">Quick Links</h2>
                            <ul className="clean-list">
                                <li className="">
                                    <a href="#!">About</a>
                                </li>
                                <li className="">
                                    <a href="#!">Home</a>
                                </li>
                                <li className="">
                                    <a href="#!">Events</a>
                                </li>
                                <li className="">
                                    <a href="#!">Log-in/out</a>
                                </li>
                                <li className="">
                                    <a href="#!">Create Event</a>
                                </li>
                            </ul>
                        </div>
                        <div >
                            <h2 className="">Contact</h2>
                            <ul className="clean-list">
                                <li className="">
                                    <a href="#!">Gil Tarablus</a>
                                </li>
                                <li className="">
                                    <a href="#!">Itay Rosental</a>
                                </li>
                                <li className="">
                                    <a href="#!">Idan Levi</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
                <div className="footer-bottom flex space-around align-center">
                    <div className="terms-privacy flex space-around">
                        <div >
                            Terms & Conditions
                        </div>

                        <div>
                            Privacy Policy
                        </div>
                    </div>

                    <div>
                        {/* &copy; {new Date().getFullYear()} Copyright: <button onClick={() => history.push('/')}> eventer </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}