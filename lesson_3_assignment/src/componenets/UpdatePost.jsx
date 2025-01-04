// Task 3
import { Col, Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {useState} from 'react'
import { useNavigate} from "react-router-dom";

const UpdatePost = async (post) => {
    const resopnse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!resopnse.ok) {
        throw new Error('Failed to update post');
    }
    return resopnse.json();
}

const UpdatePostMutation = ({ post }) => {
   const [title, setTitle] = useState(post.title);
   const [body, setBody] = useState(post.body);
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const mutation = useMutation(UpdatePost, {
    onSuccess: (updatedPost) => {
        queryClient.invalidateQueries('posts');
        queryClient.setQueryData('posts', (oldPosts) =>
            oldPosts.map((item) =>
                item.id === updatedPost.id ? updatedPost : item
                )
            );
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = { id: post.id, title, body };
        mutation.mutate(updatedPost);
    };

    return (
        <div>
             {isError && <Alert variant="danger">An error occurred: {error.message}</Alert>}
             {showSuccessAlert && <Alert variant="success">Post created successfully</Alert>}
             <h3>Edit Post {id}</h3>
             <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                         type="text" 
                         value={title} 
                         name="title" 
                         onChange={(e) => setTitle(e.target.value)}
                         disabled={mutation.isLoading}
                          />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="body">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                         name="body"
                         as='textarea'
                         rows={3}
                         value={body}
                         onChange={(e) => setBody(e.target.value)}
                         disabled={mutation.isLoading}
                         />
                    </Form.Group>
                    <Button variant="success" type="submit" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Updating...' : 'Update Post'}
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/')}>View Posts</Button>
                </Form>
            </Col>
        </div>
    )
}

export default UpdatePostMutation;