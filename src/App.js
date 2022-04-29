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
      console.log(data)

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

                }}
              >
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
