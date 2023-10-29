import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost';
import PostDetails from './pages/PostDetails';
import Page404 from './pages/Page404';
import BlogState from './context/blogs/BlogState';


function App() {
  return (
    <BlogState>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/post-details/:id" element={<PostDetails />} />
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </BlogState>
  );
}

export default App;
