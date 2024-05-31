import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; // So that every time a change is made in our database, the page's content is updated

async function Images() {
    // Getting our images from the database
    const images = await db.query.images.findMany({
      orderBy:(model, { desc }) => desc(model.id) // Ordering them in descending order --newest first
    });
    
  return (
      <div className="flex flex-wrap">
                {[...images, ...images, ...images].map((image, index) => (
              <div key={image.id + "-" + index} className="w-1/2 p-4">
                <img src={image.url} alt="image" />
                <div>{image.name}</div>
              </div>
            ))}
      </div>
  )
}

export default async function HomePage() {


  return (
    <main className="">

      <div className="flex flex-wrap ">
        <SignedOut>
          <div className="h-full w-full text-2xl text-center">Please Sign in to continue</div>
        </SignedOut>

        <SignedIn>
          <Images />
        </SignedIn>

      </div>
    </main>
  );
}
