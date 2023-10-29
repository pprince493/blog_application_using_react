import React, { useContext, useEffect, useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import { connect } from 'react-redux'
import { fetchBlog } from '../redux'
import BlogContext from '../context/blogs/BlogContext'


function PostDetails({ blogData, fetchBlog }) {
    const params = useParams();
    const { id } = params;
    const [ like, setLike] = useState(blogData.blogs.isLiked)
    const blog_context = useContext(BlogContext);

    function updateLike(props) {
        blogData.blogs.isLiked = props
        const body = {
            "id": blogData.blogs.id,
            "title": blogData.blogs.title,
            "content": blogData.blogs.content,
            "category": blogData.blogs.category,
            "isLiked": props
        }
        blog_context.updatePost(body);
        setLike(props);
    }

    function deleteBlog() {
        blog_context.deleteBlog(id);
        alert('blog is deleted')
        window.location.href="/"
    }

    useEffect(() => {
        fetchBlog(id)
        // eslint-disable-next-line
    }, [])
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} >
            click for unlike
        </Tooltip>
    );

    return blogData.loading ? (
        <h2>Loading</h2>
    ) : blogData.error ? (
        <h2>{blogData.error}</h2>
    ) : (
        <div>
            {/* {
                    (reload === true)? 
                     <Navigate to={`/post-details/${blogData.blogs.id}`} />
                    :null
            } */}
            <div className="PostDetails mx-5">

                <div style={{ float: 'right' }}>
                    {
                        (blogData.blogs.isLiked === true || like === true) ?
                            <OverlayTrigger placement='bottom' delay={{ show: 200, hide: 1000 }} overlay={renderTooltip}>
                                <Button className='mx-1' onClick={() => { updateLike(false) }}>👍Liked</Button>
                            </OverlayTrigger>
                            : <Button variant="light" onClick={() => { updateLike(true) }} className='mx-1'>👍Like</Button>
                    }

                    <Link to={`/edit-post/${blogData.blogs.id}`}>
                        <Button variant="secondary" className='mx-1'>Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => { deleteBlog() }} className='mx-1'>Delete</Button>
                </div>
                <br />
                <div className="posts">
                    <h4>{blogData.blogs.title}</h4>
                    <h6>{blogData.blogs.category}</h6>
                    <p>{blogData.blogs.content}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        blogData: state.blog
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBlog: (id) => dispatch(fetchBlog(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails)