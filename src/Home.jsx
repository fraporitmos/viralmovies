import React, { useEffect, useState } from 'react'
import MovieScreen from './screens/MovieScreen'

const Home = () => {
    const authKey = 'icYEiGkfn&TshxBn9ogiiFa@$id9G@EyS#H3PR&p'
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authKeyStorage = localStorage.getItem('login')
        if (authKeyStorage != authKey) {
            window.location.href = '/'
            setLoading(true)
        } else {
          setLoading(false)
        }
    }, [])
  return (
    <>
    
    {
        loading ? <div className='text-2xl'>Loading...</div> :
        <MovieScreen />


    }
    </>
  )
}

export default Home