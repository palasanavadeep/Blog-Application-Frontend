import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'

function AuthLayout({
    children,
    authentication = true
}) {

    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()

    const authStatus = useSelector((state)=> state.auth.status)


    useEffect(()=>{
        if(authentication && authStatus !== authentication)
            navigate('/login')
        else if (!authentication && authStatus != authentication)
            navigate('/')
        setLoading(false)
    },[navigate,authentication,authStatus])

    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout
