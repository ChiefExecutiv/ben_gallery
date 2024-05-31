import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/7d6745f0-1db8-40d9-bc98-7443ae3a2b6e-v2xgjn.webp",
  "https://utfs.io/f/70618054-df3e-4e7c-8751-f76b2cff5954-v1tvgd.webp",
  "https://utfs.io/f/fa821457-b4e0-4ad4-a5c0-4d8038d64a5c-v2xgn3.webp",
  "https://utfs.io/f/af877f3e-a1c1-431b-aa3e-3fd4aca49b5d-11wj.webp",
  "https://utfs.io/f/e8fb5819-2d5c-4b65-b9b7-e43bdbe725af-v1a2v0.webp"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}))

export default async function HomePage() {

  // Getting our posts from the database
  const posts = await db.query.posts.findMany();
  console.log(posts)

  return (
    <main className="">

      <div className="flex flex-wrap ">
        
        {posts.map((post) => (
          <div key={post.id}>
            {post.name}
          </div>
        ))
        }

        {
          [...mockImages, ...mockImages, ...mockImages].map((image, index) => (
            <div key={image.id + "-" + index} className="w-1/2 p-4">
              <img src={image.url} alt="image" />
            </div>
          ))}
      </div>
    </main>
  );
}
