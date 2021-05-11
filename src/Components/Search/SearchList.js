import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {GetSearchResults} from '../../Actions/GetSearchResults';
import {SearchResult} from './SearchResult';

export const SearchList = (props) => {

    let searchTerm = props.match.params.searchTerm;
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchTerm !== null) {
            dispatch(GetSearchResults(searchTerm));
        }

        window.scroll({
            top: 0,
            bottom: 0,
            behavior: "smooth"
        });

    }, [searchTerm])
    
    const searchResults = useSelector(store => store.Search);

    const ShowResults = () => {
        if (!_.isEmpty(searchResults.data)) {
            return searchResults.data.map (result => {
                return (
                    <SearchResult 
                        key={result.data.id}
                        data={result.data}
                    />
                )
            })
        }
    }

    if (searchResults.loading) {
        return <div className="searching">Searching Reddit for <span id="search-term">{searchTerm}</span>...</div>
    }

    if (searchResults.errorMsg !== ``) {
        return <div className="error-message">{searchResults.errorMsg}</div>
    }

    if (!searchResults.loading && _.isEmpty(searchResults.data)) {
        return <div id="no-posts-found">Nothing found for <span id="search-term">{searchTerm}</span>.</div>
    }

    return(
        <div className="search-results">
            <h1>Search results for "{searchTerm}"</h1>
            {ShowResults()}
        </div>
    )
}