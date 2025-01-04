import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Spinner, Alert, Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const ViewPosts = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const fetchPosts = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json()
        return posts;
    }



    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });


    if (isLoading) return <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>
    if (error) return <Alert variant='danger'>{error.message}</Alert>

    return (
        <div>
            <h2>Posts</h2>
            <Button variant='primary' onClick={() => navigate('/new-post')} className='mb-2'>Create Post</Button>
            <Row xs={1} md={4}>
                {posts.map(post => (
                    <Col key={post.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Post {post.id} - {post.title}</Card.Title>
                                <Card.Text> {post.body} <br />-User ID {post.userId}</Card.Text>
                                <Button variant='primary' onClick={() => navigate(`/update-post`)}>Edit</Button>
                                <Button variant='danger'>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ViewPosts;