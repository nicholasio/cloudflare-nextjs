async function getPost(slug) {
  const post = await fetch(
    `https://js1.10up.com/wp-json/wp/v2/posts?slug=${slug}`
    /* { next: { revalidate: 60 * 5 } } */
  ).then((res) => res.json());

  return post[0];
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <h4>Post Modified at: {post.modified}</h4>

      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await fetch("https://js1.10up.com/wp-json/wp/v2/posts").then(
    (res) => res.json()
  );

  return posts.map((post) => ({ slug: post.slug }));
}

export const runtime = "edge";
