import axios from 'axios';

export const GetSubredditInfo = (subreddit) => async dispatch => {
    try {
        dispatch({
            type: "SUBREDDIT_INFO_LOADING",
        });

        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/about.json`);
        const subredditResponse = response.data.data;
        // console.log("GetSubredditInfo() response:")
        // console.log(subredditResponse);

        if (response.status >= 200 && response.status < 300) {
            dispatch({
                type: "SUBREDDIT_INFO_SUCCESS",
                payload: subredditResponse,
            })
        } else if (response.status === 404) {
            dispatch({
                type: "SUBREDDIT_INFO_FAILED",
                errorCode: response.status,
                
            })
        } else if (response.status === 403) {
            dispatch({
                type: "SUBREDDIT_INFO_FAILED",
                errorCode: response.status,
            })
        }
        

    } catch (error) {
        dispatch({
            type: "SUBREDDIT_INFO_FAILED",
        })
    }
}