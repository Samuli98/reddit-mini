import axios from 'axios';

export const GetSearchResults = (term) => async dispatch => {
    try{
        dispatch({
            type: "SEARCH_LOADING",
        })

        const response = await axios.get(`https://www.reddit.com/search.json?q=${term}`);
        let searchResponse = response.data.data.children;
        console.log(`Search data for ${term}:`);
        console.log(searchResponse);
        
        dispatch({
            type: "SEARCH_SUCCESS",
            payload: searchResponse,
        })

    } catch (error) {
        dispatch({
            type: "SEARCH_FAILED",
        })
    }
}