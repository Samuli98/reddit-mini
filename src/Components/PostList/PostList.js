import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import _ from 'lodash';
import {scrollToTop} from '../../App';
import { GetRedditPosts, GetSortedPosts } from '../../Actions/GetRedditPosts';
import PostPreview from './PostPreview';
import {RedditSort, SubredditInfo} from './PostListHeader'
import { GetSubredditInfo } from '../../Actions/GetSubredditInfo';

export const PostList = (props) => {

    let subredditName;
    let sortingBy;
        
    if (props.match.params.subreddit) {
        subredditName = props.match.params.subreddit;
    }
    
    if (props.match.params.sort) {
        sortingBy = props.match.params.sort;
    }
    
    const dispatch = useDispatch();

    const fetchData = () => {
        
        if (subredditName) {
            dispatch(GetSubredditInfo(subredditName));
            dispatch(GetRedditPosts(subredditName));
        } else if (sortingBy) {
            dispatch(GetSortedPosts(sortingBy));
        } else {
            dispatch(GetRedditPosts("popular"));
        }

    }

    useEffect(() => {
        fetchData();
        scrollToTop();
    }, [subredditName, sortingBy])

    const postList = useSelector(store => store.PostList);
    const subredditInfo = useSelector(store => store.Subreddits);
    const sortedList = useSelector(store => store.Sort);

    const ShowData = () => {
        if (subredditName) {
            if (!_.isEmpty(postList.data)) {
                console.log(postList.data);
                return postList.data.map(element => {
                    return(
                        <PostPreview
                            key={element.data.id}
                            postData={element.data}
                        />
                    )
                    
                })
            }
        }

        if (sortingBy) {
            if (!_.isEmpty(sortedList.data)) {
                return sortedList.data.map(element => {
                    return(
                        <PostPreview
                            key={element.data.id}
                            postData={element.data}
                        />
                    )
                    
                })
            }
        }
        
    }

    if (postList.loading || sortedList.loading) {
        return (
            <div className="loading">Loading posts...</div>
        )
        
    }

    if (postList.errorMsg !== `` || sortedList.errorMsg !== ``) {
        return <Redirect to="/404" />
    }

    return (
        <div>
            <div id="post-list">
                { subredditName ? <SubredditInfo information={subredditInfo.data} /> : <RedditSort /> }
                {ShowData()}
            </div>
        </div>
    )
};