import React, { useEffect } from 'react'
import Category from './Category'
import Slider from './Slider'
import Post from './Post'
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div>
      <div><Slider /></div>
      <div><Category /></div>
      <div><Post /></div>
    </div>
  )
}
export default Home
