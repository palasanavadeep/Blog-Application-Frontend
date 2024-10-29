import React ,{useCallback , useEffect} from 'react'
import RTE from './RTE'
import service from '../appwrite/config'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


function PostForm({post}) {
    const {register , handleSubmit , setValue , getValues , watch , control } = useForm({
        defaultValues : {
            title : post?.title || '',
            slug : post?.$id || '',
            content : post?.content || '',
            status : post?.status || 'active',

        },
        
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);

    const submit = async(data) => {
        if(post){
            const file = data.image[0] ?  await service.uploadFile(data.image[0]) : null ;

            if(file){
                service.deleteFile(post.featuredImage)
            }

            const postUpdate = await service.updatePost(post.$id ,
                {
                    ...data ,
                    featuredImage : file ? file.$id : undefined,
                }
            )
            if(postUpdate)
                navigate(`/post/${postUpdate.$id}`)

        }else{
            const file = await service.uploadFile(data.image[0])
             
            if(file){
                data.featuredImage = file.$id
                const postUpload = await service.createPost(
                    {
                        ...data,
                        userId : userData.$id,
                    }
                )
                if(postUpload)
                    navigate(`/post/${postUpload.$id}`)
            }

        }
    }

    const slugTransform = useCallback((value)=> {
        if(value && typeof value === 'string')
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-");
            
            return '';
    },[])

    useEffect(()=>{
        const subscription = watch((value , {name}) => {
            if ( name == 'title'){
                setValue('slug',slugTransform(value.title), {shouldValidate : true})
            }
        })

        return ()=> subscription.unsubscribe();

    },[watch , setValue , slugTransform])


    return (
       <form 
       className='flex flex-wrap'
       onSubmit={handleSubmit(submit)}>
            <div className='w-2/3 px-2'>
                <Input 
                label='Title : '
                placeholder='Enter Post Title Here'
                className='mb-4'
                {...register('title', {
                    required : true,
                })}
                />

                <Input 
                label='Slug'
                placeholder='Post Slug'
                className='mb-4'
                {...register('slug',{
                    required : true,
                })}
                onInput={(e)=>{
                    setValue('slug',slugTransform(e.currentTarget.value),{shouldValidate : true})
                }}
                />
                <RTE 
                label="content"
                name='content'
                control={control}
                defaultValue={getValues('content')}

                />

            </div>
            <div className='w-1/3 px-2'>
                <Input 
                type='file'
                label='Featured Image'
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register('image',{
                    required : !post,
                })}
                />
                {
                    post && (
                        <div className="w-full mb-4">
                            <img src={service.getFilePreview(post.featuredImage)} 
                            alt={post.title}
                            className="rounded-lg" />
                        </div>
                    )
                }
                <Select 
                options ={['active','inactive']}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
                />
                <Button type="submit"
                 bgColor={post ? "bg-green-500" : undefined} 
                 className="w-full">
                    {post? 'Update' : 'Post'}
                </Button>
            </div>
       </form>
    )
}

export default PostForm
