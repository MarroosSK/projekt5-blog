import React, { useContext } from 'react'
import DataContext from './context/DataContext';
import { useParams, Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import api from "./api/posts"

const PostPage = () => {
  const {posts, setPosts} = useContext(DataContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const post = posts.find((post)=> (post.id).toString() === id);

  const handleDelete = async (id) => {
    try{
    // axios pre delete (iba await riadok)
    await api.delete(`/posts/${id}`)  
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  } catch (err){
    console.log(`Error msg: ${err.message}`);
  }
  }

  return (
    <main className='PostPage'>
      <article className='post'>
        {/* ak je post TRUE (ak existuje) */}
          {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>}
        {/* ak  post nie je TRUE (ak neexistuje) */}
          {!post && 
            <>
            <h2>Post not found</h2>
            <p>Well, it happens...</p>
            <p>
              <Link to="/">Visit our Homepage</Link>
            </p>
            </>}
      </article>
    </main>
  )
}

export default PostPage