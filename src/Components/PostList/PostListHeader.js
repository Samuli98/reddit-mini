import React from 'react';
import {NavLink} from 'react-router-dom';
import {intToString} from '../../App';
import flame from '../../images/flame.png';
import chart from '../../images/chart.png';
import fresh from '../../images/fresh.png'; 
import rocket from '../../images/rocket.png';

export const RedditSort = (props) => {
    return (
        <div id="reddit-sorting">
            <ul>
                <li><NavLink to="/best"><img src={rocket} alt="best" /></NavLink></li>
                <li><NavLink to="/hot"><img src={flame} alt="hot" /></NavLink></li>
                <li><NavLink to="/new"><img src={fresh} alt="new" /></NavLink></li>
                <li><NavLink to="/top"><img src={chart} alt="top" /></NavLink></li>
            </ul>
        </div>
    )
}

export const SubredditInfo = (props) => {

    const sub = props.information;
    const nsfw = sub.over18;
    let style;

    if (nsfw) {
        style = "nsfw";
    } else {
        style = "sfw"
    }

    return (
        <div id="subreddit-info" className={style}>
            <h1>{sub.title}</h1>
            { sub.over18 ? <span id="nsfw">NSFW</span> : null}
            <div className="description">{sub.public_description}</div>
            <div className="active-users">{intToString(sub.active_user_count)} active users</div>
        </div>
    )
    
}