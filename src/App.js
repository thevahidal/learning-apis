import { useEffect, useState } from 'react';

import { createPostAPI, deletePostAPI, getPostsAPI, getSinglePostAPI, updatePostAPI } from './api/posts';


function App() {
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)

  const [singlePost, setSinglePost] = useState({})
  const [singlePostId, setSinglePostId] = useState(10)
  const [singlePostNotFound, setSinglePostNotFound] = useState(false)
  const [singlePostLoading, setSinglePostLoading] = useState(false)

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  })
  const [newPostLoading, setNewPostLoading] = useState(false)

  const [updatingPost, setUpdatingPost] = useState({})
  const [updatingPostLoading, setUpdatingPostLoading] = useState(false)

  const getSinglePost = async (id) => {
    setSinglePostLoading(true)
    try {
      const { data } = await getSinglePostAPI(id);
      setSinglePost(data)
      setSinglePostLoading(false)
    } catch (err) {
      console.log(err)
      if (err.response.status === 404) {
        setSinglePostNotFound(true)
      }
      setSinglePostLoading(false)
    }
  }

  const deletePost = async (id) => {
    try {
      await deletePostAPI(id);
      setPosts(posts.filter(post => post.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const updatePost = async (id) => {
    setUpdatingPostLoading(true)
    try {
      await updatePostAPI(id, updatingPost);
      alert('Post updated')

      setPosts(posts.map(post => {
        if (post.id === id) {
          post.title = updatingPost.title
        }

        return post
      }))

      setUpdatingPost({})
      setUpdatingPostLoading(false)
    } catch (err) {
      console.log(err)
      setUpdatingPostLoading(false)
    }
  }

  const getPosts = async () => {
    setPostsLoading(true)
    try {
      const { data } = await getPostsAPI();
      setPosts(data)
      setPostsLoading(false)
    } catch (err) {
      console.log(err)
      setPostsLoading(false)
    }
  }


  const createPost = async (e) => {
    e.preventDefault()
    setNewPostLoading(true)
    try {
      await createPostAPI(newPost);

      alert("Post Created")
      setNewPost({
        title: '',
        body: '',
      })
      setNewPostLoading(false)
    } catch (err) {
      console.log(err)
      setNewPostLoading(false)
    }
  }

  useEffect(() => {
    getSinglePost(singlePostId)
  }, [singlePostId])


  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div
      style={{
        padding: 20,
      }}
    >

      <div style={{
        marginBottom: 60,
      }}>
        <h1>Create a Post</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={e => createPost(e)}
        >
          <input
            placeholder='Enter title'
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            value={newPost.title}
          />
          <textarea
            placeholder='Enter body'
            onChange={e => setNewPost({ ...newPost, body: e.target.value })}
            value={newPost.body}

          />
          <button
            disabled={newPostLoading}
          >{!newPostLoading ? 'Submit' : "Loading..."}</button>
        </form>
      </div>

      <div style={{
        marginBottom: 60,
      }}>
        <h1>Single Post</h1>
        <input
          type="number"
          placeholder='Enter post id'
          onChange={e => setSinglePostId(e.target.value)}
          value={singlePostId}
        />
        {!singlePostLoading ? <div>
          {!singlePostNotFound ? <div>
            <h2>{singlePost.title}</h2>
            <p>{singlePost.body}</p>
          </div> : <div>
            <h2>Post not found</h2>
          </div>}
        </div> : <div>
          Loading...
        </div>}
      </div>

      <div>
        <h1>Posts</h1>
        {!postsLoading ? <div>
          {
            posts.map(post => (
              <div key={post.id}
                style={{
                  borderBottom: '1px solid #000',
                  padding: '20px 0',
                }}
              >
                {updatingPost.id === post.id
                  ? <input
                    value={updatingPost.title}
                    onChange={e => setUpdatingPost({ ...updatingPost, title: e.target.value })}
                  />
                  : <h4>{post.title}</h4>}
                <p>{post.body}</p>
                <div>
                  {updatingPost.id === post.id

                    ? <button
                      style={{
                        marginRight: 10,
                      }}
                      onClick={() => updatePost(post.id)}
                      disabled={updatingPostLoading}
                    >{!updatingPostLoading ? 'Submit Update' : 'Loading...'}</button>
                    : <button
                      style={{
                        marginRight: 10,
                      }}
                      onClick={() => setUpdatingPost(post)}
                    >Update</button>}
                  <button
                    onClick={() => deletePost(post.id)}
                  >Delete</button>
                </div>
              </div>
            ))
          }
        </div> : <div>
          Loading...
        </div>}
      </div>
    </div>
  );
}

export default App;
