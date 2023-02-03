import Image from "next/image";
import { guys, tree, forest, flowers, lady, meccanic } from "../../public";

const Gallery = () => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
          <div className="flex flex-wrap -m-1 md:-m-2">
            <div className="flex flex-wrap w-1/2">
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={guys}
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={forest}
                />
              </div>
              <div className="w-full p-1 md:p-2">
                <Image
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={flowers}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="w-full p-1 md:p-2">
                <Image
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={tree}
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={meccanic}
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={lady}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
