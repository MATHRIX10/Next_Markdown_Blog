import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import path from 'path';
import matter from 'gray-matter'
import Post from '../components/Post';
import {sortByDate} from '../utils'




export default function Home({posts}) {

  
  return (
    <div >
      <Head>
        <title>Dev Blog</title>
      
      </Head>
      <div className="posts">
        {posts.map((post,index)=>(
        
        <Post post={post} key={index}/>

        ))}
      </div>
   
    </div>
  )
}

export async function getStaticProps(){
  // get files from the post directory 
  const files = fs.readdirSync(path.join('posts'));
// get slug and frontmatter from posts 
const posts = files.map(filename=>{
  //create slug 
  const slug = filename.replace('.md','')
  // get frontmatter 
  const markdownWithMeta = fs.readFileSync(path.join('posts',filename),'utf-8')
 
  const {data:frontmatter} = matter(markdownWithMeta);

 
  return {
    slug ,
    frontmatter
  }
})




  return {
    props :{
      posts:posts.sort(sortByDate),
    },
  }
}
