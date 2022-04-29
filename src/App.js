import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState([])

  const [singlePost, setSinglePost] = useState({})
  const [singlePostId, setSinglePostId] = useState(10)
  const [singlePostNotFound, setSinglePostNotFound] = useState(false)

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  })

  const [updatingPost, setUpdatingPost] = useState({})

  const getSinglePost = async (id) => {
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      setSinglePost(data)
    } catch (err) {
      console.log(err)
      if (err.response.status === 404) {
        setSinglePostNotFound(true)
      }
    }
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      setPosts(posts.filter(post => post.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const updatePost = async (id) => {
    console.log(id)
    try {
      await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatingPost)
      alert('Post updated!')

      setPosts(posts.map(post => {
        if (post.id === id) {
          post.title = updatingPost.title
          console.log(post)
        }

        return post
      }))
      setUpdatingPost({})

    } catch (err) {
      console.log(err)
    }
  }

  const getPosts = async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(data)
    } catch (err) {
      console.log(err)
    }
  }


  const createPost = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost)

      alert("Post Created")
      setNewPost({
        title: '',
        body: '',
      })

    } catch (err) {
      console.log(err)
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
          <button>Submit</button>
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
        {!singlePostNotFound ? <div>
          <h2>{singlePost.title}</h2>
          <p>{singlePost.body}</p>
        </div> : <div>
          <h2>Post not found</h2>
        </div>}
      </div>

      <div>
        <h1>Posts</h1>
        <div>
          {
            posts.map(post => (
              <div key={post.id}
                style={{
                  borderBottom: '1px solid #000',
                  paddingBottom: 20,
                }}
              >
                {updatingPost.id === post.id
                  ? <input
                    value={updatingPost.title}
                    onChange={e => setUpdatingPost({ ...updatingPost, title: e.target.value })}
                  />
                  : <h4>{post.title}</h4>
                }
                <p>{post.body}</p>
                <div>
                  {
                    (updatingPost.id === post.id)
                      ? <button style={{
                        marginRight: 10,
                      }}
                        onClick={() => updatePost(post.id)}
                      >
                        Submit Updating
                      </button>
                      : <button style={{
                        marginRight: 10,
                      }}
                        onClick={() => setUpdatingPost(post)}
                      >
                        Update
                      </button>
                  }
                  <button
                    onClick={() => deletePost(post.id)}
                  >Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
