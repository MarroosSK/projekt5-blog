import React, {useState, useContext } from 'react'
import DataContext from './context/DataContext';
import { format } from 'date-fns';
import api from "./api/posts"
import {useNavigate} from "react-router-dom"

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const {posts, setPosts} = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
    // axios pre create (iba await riadok a response.data z 2)
    const response = await api.post("/posts", newPost);
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    //zresetuj nazov a body
    setPostTitle('');
    setPostBody('');
    navigate('/');
    } catch (err){
      console.log(`Error msg: ${err.message}`);
    }
  }

  return (
    <main className='newPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>Title:</label>
          <input
              id='postTitle'
              type="text"
              required
              value={postTitle}
              onChange={(e)=> setPostTitle(e.target.value)}
          />

          <label htmlFor='postBody'>Body:</label>
          <textarea
              id='postBody'
              type="text"
              required
              value={postBody}
              onChange={(e)=> setPostBody(e.target.value)}
          />
          <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost