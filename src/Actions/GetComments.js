import axios from 'axios';

export const GetComments = (postID) => async dispatch => {
    try {
        dispatch({
            type: "COMMENTS_LOADING",
        });

        const response = await axios.get(`https://www.reddit.com/comments/${postID}.json`);
        
        // console.log(`GetComments() response for post ID ${postID}:`);
        // console.log(response.data[0].data.children[0].data)
        // console.log(response.data[1].data.children);

        dispatch({
            type: "COMMENTS_SUCCESS",
            payload: response.data,
        })

    } catch (error) {
        dispatch({
            type: "COMMENTS_FAILED",
        })
    }
}