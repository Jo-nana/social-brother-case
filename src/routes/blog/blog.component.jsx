import  PostItem from '../../components/post-item/post-item.component';
import { useState, useEffect } from 'react';

import'./blog.styles.scss';

const Blog = () => {

  // Use the useState hook to create a state variable for the posts
  const [posts, setPosts] = useState([]);

  // Use the useState hook to create a state variable for the page
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Range of pages


  // Fetch posts from API
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TOKEN;
    fetch(`https://frontend-case-api.sbdev.nl/api/posts?page=${page}&perPage=10&sortBy=title&sortDirection=asc&searchPhrase=&categoryId=1`, {
      headers: {
        'token': API_KEY
      }
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts.data);
        setTotalPages(posts.totalPages);
      });
  }, [page]);

  // Handle next and previous page
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return(
    <div className='blog-container'>
      <div className='card-grid'>
        {posts.map((post) => (
          <div className="card">
            <PostItem key={post.id} post={post}  />
          </div>
      ))}
      </div>
      <button onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
      <button onClick={handleNextPage} disabled={page === totalPages}>Next Page</button>
    </div>
  )
}

export default Blog;
