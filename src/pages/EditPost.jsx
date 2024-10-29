import React from 'react'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import PostForm from '../components/PostForm'
import { useState , useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom'

function EditPost() {

    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }
        else{
            navigate('/')
        }

    },[slug,navigate])

    return post ? (
        <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
        </div>
    ) : null
}

export default EditPost
