import ReactMarkdown from 'react-markdown';

export const Comment = (props) => {

    const comment = props.data;

    return (
        <div className="comment">
            <h5>{comment.author}</h5>
            <div className="comment-body">
                <ReactMarkdown>{comment.body}</ReactMarkdown>
            </div>
        </div>
    )
}