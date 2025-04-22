// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.

// products/[id]/page.js

export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  const resp = await fetch("https://test.com/api/products")
  const products = await resp.json()
  return products.map((p) => ({
      id: p.id.toString() 
    }))
    }
  
  /* const posts = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: String(post.id),
  }))
} */
 
export default async function Page({ params }) {
  const { id } = await params
  const response = await fetch(`https://test.com/api/products/${id}`)
  const product = await response.json()
  return (<div>{product.id} - {product.name}</div>)
}