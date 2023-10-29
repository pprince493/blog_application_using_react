import '../App.css'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import BlogContext from '../context/blogs/BlogContext'

function NewPost() {

    const [data, setData] = useState({})
    const blog_context = useContext(BlogContext);


    function addPost() {
        setData({ ...data, "isLiked": false })
        blog_context.addPost(data);
        alert('new post added!')
    }

    return (
        <div className="NewPost my-2 mx-5">
            <br />
            <h3>Create new post</h3>

            <Form>

                Title
                <input type="text" className='form-control' onChange={(e) => setData({ ...data, "title": e.target.value })} required />

                Categories
                <input type="text" className='form-control' onChange={(e) => setData({ ...data, "category": e.target.value })} required />

                Content
                <textarea rows="4" className='form-control' onChange={(e) => setData({ ...data, "content": e.target.value })} required />
                {
                    (data.title !== undefined && data.category !== undefined && data.content !== undefined) ?
                        (data.title.length > 0 && data.content.length > 0 && data.category.length > 0) ?
                            <input type="submit" className="btn btn-success m-2 " onClick={() => addPost()} />
                            :
                            <input type="submit" className="btn btn-secondary m-2" style={{ cursor: 'default', backgroundColor: 'gray' }} />
                        :
                        <input type="submit" className="btn btn-secondary m-2" style={{ cursor: 'default', backgroundColor: 'gray' }} />
                }
                <Link to="/">
                    <Button variant="warning" className="mx-3" onClick={() => { window.location.href = "/" }}>Cancel</Button>
                </Link>

            </Form>
        </div>
    );
}

export default NewPost;

