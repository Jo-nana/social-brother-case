import PostItem from '../../components/post-item/post-item.component';
import FormPost from '../../components/form-post/form-post.component';
import Button from '../../components/button/button.component';

import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';


import './home.styles.scss';

const Home = () => {
  // Use the useState hook to create a state variable for the posts
  const [posts, setPosts] = useState([]);

  // state for the load more button
  const [startIndex, setStartIndex] = useState(0);

  // Fetch posts from API
  useEffect(() => {
    fetch('https://frontend-case-api.sbdev.nl/api/posts?page=&perPage=1000&sortBy=created_at&sortDirection=desc&searchPhrase=&', {
      headers: {
      'token': 'pj11daaQRz7zUIH56B9Z'}
    })
       .then((res) => res.json())
       .then((posts) => {
         setPosts(posts.data);
      })
  }, []);

  return (
    <div>
      <Outlet />
      <div className="home-container">
        <div className="home-form-container">
          <FormPost />
        </div>
        <div className='home-post-container'>
          <div className="home-post-box">
            {posts.slice(0, startIndex + 4).map((post) => {
              console.log(startIndex);
              return (<PostItem key={post.id} post={post} />)
            })}
          </div>
          <div className="home-post-button">
            <button onClick={() => { setStartIndex(startIndex + 4) }}>Meer laden</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home;
