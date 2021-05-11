import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import './App.css';
import {PostList} from './Components/PostList/PostList.js';
import {FullPost} from './Components/FullPost'
import {SearchList} from './Components/Search/SearchList';
import {SearchBar} from './Components/SearchBar';
import {FourZeroFour} from './Components/ErrorPage';
import headerImg from './reddit.png';

export const intToString = (num) => {
  if (num < 1000) {
      return num;
  }
  var si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
    ];
  var i;
  for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].v) {
          break;
      }
  }
  return (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].s;
}

export const scrollToTop = () => {
  window.scroll({
    top: 0,
    bottom: 0,
    behavior: "smooth"
  });
}

function App() {

  return (
    <div className="App">

      <header>
        <NavLink to={`/`}>
          <img src={headerImg} alt=""></img>
          <h1>Reddit<span>Mini</span></h1>
        </NavLink>
      </header>

      <SearchBar />

      <main>
        <Switch>
          <Route exact path="/404" component={FourZeroFour} />
          <Route exact path="/:sort" component={PostList} />
          <Route exact path="/discussion/:post" component={FullPost} />
          <Route exact path="/r/:subreddit/" component={PostList} />
          <Route exact path="/search/:searchTerm" component={SearchList} />
          <Redirect from="/" to="/best" component={PostList} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
