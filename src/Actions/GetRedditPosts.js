import axios from 'axios';

export const GetRedditPosts = (subreddit) => async dispatch => {
    try{
        dispatch({
            type: "REDDIT_POSTLIST_LOADING",
        })

        const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
        console.log("Full post data:");
        console.log(response);
        let postsResponse = response.data.data;
        // console.log("Posts data:")
        // console.log(postsResponse);
        
        dispatch({
            type: "REDDIT_POSTLIST_SUCCESS",
            payload: postsResponse,
        })

    } catch (error) {
        dispatch({
            type: "REDDIT_POSTLIST_FAILED",
        })
    }
}

export const GetSortedPosts = (sort) => async dispatch => {
    try{
        dispatch({
            type: "SORTED_POSTLIST_LOADING",
        })

        const response = await axios.get(`https://www.reddit.com/${sort}.json`);
        let sortResponse = response.data.data;
        console.log("Sorted Posts data:")
        console.log(sortResponse);
        
        dispatch({
            type: "SORTED_POSTLIST_SUCCESS",
            payload: sortResponse,
        })

    } catch (error) {
        dispatch({
            type: "SORTED_POSTLIST_FAILED",
        })
    }
}