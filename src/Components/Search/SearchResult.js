import {Link} from 'react-router-dom';

export const SearchResult = (props) => {

    const post = props.data;

    return (
        <div className="search-post">
            <Link to={`/discussion/${post.id}`} >{post.title}</Link> {post.subreddit_name_prefixed}
        </div>
    )
}