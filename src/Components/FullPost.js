import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetComments} from '../Actions/GetComments'
import _ from 'lodash';
import {Comment} from "./Comment";
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import {Redirect, Link} from 'react-router-dom';
import './FullPost.css'

export const FullPost = (props) => {

    const postID = props.match.params.post;
    const dispatch = useDispatch();
    let post, video, comments;

    useEffect(() => {
        dispatch(GetComments(postID));
        window.scroll({
            top: 0,
            bottom: 0,
            behavior: "smooth"
        });
    }, [])

    const postData = useSelector(store => store.Comments);
    post = postData.data.fullPostData;
    comments = postData.data.commentData;

    if (!_.isEmpty(postData.data)) {
        console.log(post)
        console.log(comments)
    }

    const ShowPost = () => {
        if (!_.isEmpty(post)) {

            if (post.media) {
                if (post.media.reddit_video) {
                    video = <video controls width="100%"><source src={post.media.reddit_video.fallback_url} /></video>
                } else if (post.domain.match(/yout/)) {
                    video = <ReactPlayer url={post.url} controls width="100%" />
                } else if (post.domain.match(/vimeo/)) {
                    video = <ReactPlayer url={post.url} controls width="100%" />
                }
            }

            return (
                <div className="full-post">
                    <div className="media">
                        {video ? video : null}
                        { post.thumbnail ? <img src={post.url} alt="" /> : null }
                    </div>

                    { post.is_self ? <h1><ReactMarkdown>{post.title}</ReactMarkdown></h1> : <h1><a href={post.url}><ReactMarkdown>{post.title}</ReactMarkdown></a></h1> }
                    
                    <div className="post-info">
                        <div className="author">{post.author}</div>
                        <Link to={`/r/${post.subreddit}`}><div className="subreddit">{post.subreddit_name_prefixed}</div></Link>
                        { post.is_self ? null : <div className="post-link">{post.domain}</div> }
                    </div>
                    
                    <div className="body">
                        <ReactMarkdown>{post.selftext}</ReactMarkdown>
                    </div>
                </div>
            )
        }
    }

    const ShowComments = () => {
        if (!_.isEmpty(comments)) {
            return comments.map(comment => {
                return (
                    <div key={comment.data.id}>
                        <Comment
                            data={comment.data}
                        />
                    </div>
                )
            })
        }
    }

    if (postData.loading) {
        return <div className="loading">loading...</div>
    }

    if (postData.errorMsg !== ``) {
        return <Redirect to="/404" />
    }
    
    return (
        <div>
            {ShowPost()}
            
            <div className="comment-container">
                {ShowComments()}
            </div>
            
        </div>
    )
}