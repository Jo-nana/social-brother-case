import  PostItem from '../../components/post-item/post-item.component';
import { useState, useEffect } from 'react';

import Pagination from '../../components/pagination/pagination.component';

import'./blog.styles.scss';

const Blog = () => {

  // Use the useState hook to create a state variable for the posts
  const [posts, setPosts] = useState([]);

  // State for page
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [totalPosts, setTotalPosts] = useState();

  // Fetch posts from API
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TOKEN;
    fetch(`https://frontend-case-api.sbdev.nl/api/posts?sortBy=title&sortDirection=asc&page=${currentPage}&perPage=8`, {
      headers: {
        'token': API_KEY
      }
    })
    .then((res) => res.json())
    .then((posts) => {
      setPosts(posts.data);
      setTotalPosts(posts.total);
    });
    }, [currentPage]);

    // Create a new array with the amount of pages
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
      pageNumbers.push(i);
    }

    // Change page
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

  return(
    <div className='blog-container'>
      <div className='card-grid'>
        {posts.map((post) => (
          <div className="card">
            <PostItem key={post.id} post={post} />
          </div>
      ))}
      </div>
      {/* Pagination */}
      <div className="pagination-container">
        <Pagination
          paginate={paginate}
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Blog;
