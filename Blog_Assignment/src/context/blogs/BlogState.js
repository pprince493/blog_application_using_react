import React, { useState } from "react";
import BlogContext from "./BlogContext";

const BlogState = (props) => {

    const s1 = {
        "name": "Rahul",
        "class": "5B"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Akash",
                "class": "10A"
            })
        }, 2000)
    }

    const addPost = async (props) => {
        console.log(props)
        const url_api = `http://localhost:3004/posts/`
        await fetch(url_api, {
            method: 'POST',
            body: JSON.stringify(props),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
    
    const updatePost = async (props) => {
        console.log(props)
        const url_api = `http://localhost:3004/posts/${props.id}`
        await fetch(url_api, {
            method: 'PUT',
            body: JSON.stringify(props),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
    }

    const deleteBlog = async (id) => {

        const url_api = `http://localhost:3004/posts/${id}`
        await fetch(url_api, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        // navigate(`/post-details/${props.id}`);
    }

    return (
        <BlogContext.Provider value={{state, addPost, update, updatePost, deleteBlog}}>
            {props.children}
        </BlogContext.Provider>
    )

}

export default BlogState;

