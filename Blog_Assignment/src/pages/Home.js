import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import '../App.css'
import { connect } from 'react-redux'
import { fetchBlogs } from '../redux'
import { Link } from 'react-router-dom'

function Home({ blogData, fetchBlogs }) {

    useEffect(() => {
        fetchBlogs()
        // eslint-disable-next-line
    }, [])
    return blogData.loading ? (
        <h2>Loading</h2>
    ) : blogData.error ? (
        <h2>{blogData.error}</h2>
    ) : (
        <div>
            <br />
            <h2>All blogs</h2>
            <div>
                <div className="Home my-2 mx-5">
                    {blogData &&
                        blogData.blogs &&
                        blogData.blogs.map(blog =>
                            <Link to={`/post-details/${blog.id}`} style={{ textDecoration: 'none' }} key={blog.id}>
                                <Card className="Card m-2">
                                    <Card.Body>
                                        <Card.Title> {blog.title} </Card.Title>
                                        <Card.Text className="extra-text"> {blog.content} </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        )}
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
        fetchBlogs: () => dispatch(fetchBlogs())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
