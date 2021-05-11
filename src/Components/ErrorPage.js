import {Link} from 'react-router-dom';

export const FourZeroFour = () => {
    return (
        <div className="error-page">
            <h1>Error <span className="error-code">404</span>: page not found</h1>
            <div><Link to="/">Find something that exists?</Link></div>
        </div>
    )
}