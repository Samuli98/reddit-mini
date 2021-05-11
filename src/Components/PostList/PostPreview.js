import {Link, useLocation} from 'react-router-dom';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import {intToString, scrollToTop} from '../../App';
import './PostPreview.css';

const PostPreview = (props) => {

    const post = props.postData;
    let image, video, thumbnail, domain, nsfw = post.over_18;

    if (post.media) {
        if (post.media.reddit_video) {
            video = <video controls width="100%"><source src={post.media.reddit_video.fallback_url} /></video>
            thumbnail = null;
        } else if (post.domain.match(/yout/)) {
            video = <ReactPlayer url={post.url} controls width="100%" />
            thumbnail = null;
        } else if (post.domain.match(/vimeo/)) {
            video = <ReactPlayer url={post.url} controls width="100%" />
            thumbnail = null;
        }
    }

    switch (post.thumbnail) {
        case "self":
            thumbnail = null;
            break;
        case "default":
            thumbnail = null;
            break;
        case "spoiler":
            thumbnail = null;
            break;
        case "":
            thumbnail = null;
            break;
        case "nsfw":
            thumbnail = null;
            nsfw = true;
            break;
        default:
            thumbnail = <span className="post-preview-thumbnail"><a href={post.url}><img src={post.thumbnail} alt="" /></a></span>;
    }

    if (post.url.match(/.png|.jpg|.jpeg|v.redd/)) {
        image = <img src={post.url} alt="" />
        thumbnail = null;
    }

    if (nsfw) {
        image = <div className="nsfw-image"><img src={post.url} alt={post.title} /></div>
        
        if (thumbnail) {
            thumbnail = <span className="post-preview-thumbnail nsfw-image"><a href={post.url}><img src={post.thumbnail} alt="" /></a></span>;
        }
        
    }

    if (post.domain.match(/i.red|v.redd/) || post.is_self) {
        domain = null;
    } else {
        domain = <div className="domain">➥ {post.domain}</div>;
    }

    const bodyTextPreview = <span><ReactMarkdown>{post.selftext.substr(0, 275) + "..."}</ReactMarkdown></span>;

    return (
        
        <div className="post-preview">
            <div className="media">
                {image ? image : null}
                {video ? video : null}
            </div>
            
            { post.stickied ? <div className="sticky">sticky</div> : null }
            
            <div className="post-title">
                {thumbnail}
                <div className="title-text">
                    { post.is_self ? <h2><ReactMarkdown>{post.title}</ReactMarkdown></h2> : <a href={post.url}><h2><ReactMarkdown>{post.title}</ReactMarkdown></h2></a> }
                    <div className="url-info">
                        <Link to={`/r/${post.subreddit}/`} onClick={scrollToTop} >r/{post.subreddit}</Link>
                        {domain}
                    </div>
                </div>
            </div>

            <div className="post-body-preview">
                { post.selftext ? <div className="body">{bodyTextPreview}</div> : null }
                <div className="comments-score">
                    <Link to={`/discussion/${post.id}`}>
                        <span>{intToString(post.num_comments)} comments</span>
                    </Link>
                    <span className="score">❤ {intToString(post.score)}</span>
                </div>
            </div>
            
        </div>
    )
    
}

export default PostPreview;