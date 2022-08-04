import React, {useState, useEffect, useContext } from 'react'
import DataContext from './context/DataContext';
import { useParams, Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import { format } from 'date-fns';
import api from "./api/posts"

const EditPost = () => {
  const {posts, setPosts} = useContext(DataContext);
  // pre update crud operaciu
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
    
    const {id} = useParams();
    const post = posts.find((post) => (post.id).toString() === id);

    useEffect(()=>{
        // ak mame post
      if(post){
        setEditTitle(post.title)
        setEditBody(post.body)
      }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) =>{
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      try {
        const response = await api.put(`/posts/${id}`, updatedPost)
        setPosts(posts.map((post)=> post.id === id ? {...response.data } : post))
        setEditTitle('');
        setEditBody('');
        navigate('/');
      } catch (err) {
        console.log(`Error msg: ${err.message}`);
      }
  
    }

  return (
    <main className='newPost'>
    {/*  ak mame edit title */}
    {editTitle &&
        <>
            <h2>Edit Post</h2>
            <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
                <label htmlFor='postTitle'>Title:</label>
                <input
                    id='postTitle'
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e)=> setEditTitle(e.target.value)}
                />

                <label htmlFor='postBody'>Body:</label>
                <textarea
                    id='postBody'
                    type="text"
                    required
                    value={editBody}
                    onChange={(e)=> setEditBody(e.target.value)}
                />
                <button className="deleteButton" type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </>
    }        {/* ak  post nie je TRUE (ak neexistuje) */}
          {!editTitle && 
            <>
            <h2>Post not found</h2>
            <p>Well, it happens...</p>
            <p>
              <Link to="/">Visit our Homepage</Link>
            </p>
            </>}
    </main>
  )
}

export default EditPost