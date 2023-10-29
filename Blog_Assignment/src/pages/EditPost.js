import '../App.css'
import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useParams, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import BlogContext from '../context/blogs/BlogContext'

function EditPost({ blogData, fetchBlog }) {
    const params = useParams();
    const { id } = params;
    const [indexPage, setIndexPage] = useState(false);
    const [data, setData] = useState({
        "id": id,
        "title": blogData.blogs.title,
        "category": blogData.blogs.category,
        "content": blogData.blogs.content,
        "isLiked": blogData.blogs.isLiked,
    })
    const blog_context = useContext(BlogContext);

    function updatePost() {
        setData({ ...data, "id": id })
        setData({ ...data, "isLiked": blogData.blogs.isLiked })
        blog_context.updatePost(data);
        alert('edit post done');
        setIndexPage(true);
    }

    return blogData.loading ? (
        <h2>Loading</h2>
    ) : blogData.error ? (
        <h2>{blogData.error}</h2>
    ) : (
        <div className="EditPost my-2 mx-5">
            {
                (indexPage === true) ?
                    <Navigate to={"/post-details/" + id} />
                    : null
            }
            <br />
            <h3>Edit post</h3>
            <Form>
                Title
                <input type="text" className='form-control' onChange={(e) => setData({ ...data, "title": e.target.value })} defaultValue={blogData.blogs.title} required />

                Categories
                <input type="text" className='form-control' onChange={(e) => setData({ ...data, "category": e.target.value })} defaultValue={blogData.blogs.category} required />

                Content
                <textarea rows="4" className='form-control' onChange={(e) => setData({ ...data, "content": e.target.value })} defaultValue={blogData.blogs.content} required />

                {
                    (data.title !== undefined && data.category !== undefined && data.content !== undefined) ?
                        (data.title.length > 0 && data.content.length > 0 && data.category.length > 0) ?
                            <input type="submit" className="btn btn-success m-2 " onClick={() => updatePost()} />
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

const mapStateToProps = state => {
    return {
        blogData: state.blog
    }
}

export default connect(
    mapStateToProps
)(EditPost)

// export default EditPost;
