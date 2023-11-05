import { useEffect, useState } from "react";
import gallery from "../assets/images/gallery.png";
import { ReactSortable } from "react-sortablejs";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load json data from public folder
  useEffect(() => {
    fetch("gallery.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  // Click handler for select image from gallery
  const handleClick = (imageId) => {
    if (selected.includes(imageId)) {
      setSelected(selected.filter((id) => id !== imageId));
    } else {
      setSelected([...selected, imageId]);
    }
  };
  
  // Click handler for delete multiple selected images
  const handleDeleteImage = () => {
    const remaining = images.filter((image) => !selected.includes(image.id));
    setImages(remaining);
    setSelected([]);
  };
  
  // Function for sort by drag and drop
  const handleSort = (sortableImages) => {
    const newList = sortableImages.map((image) => {
      console.log(image)
      return { ...image };
    });
    setImages(newList);
  };


  return (
    <div>
      <div className="card w-7/12 mt-12 bg-base-100 shadow-sm mx-auto border">
        <div className="flex items-center mx-10 mt-5">
          <div
            className={`form-control ${
              selected.length > 0 ? "block" : "hidden"
            }`}
          >
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                checked="checked"
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {selected.length > 0
                ? `${selected.length} ${
                    selected.length === 1 ? "File" : "Files"
                  } Selected`
                : "Gallery"}
            </h1>
          </div>
          <button onClick={handleDeleteImage} className="text-rose-500 ml-auto">
            Delete File
          </button>
        </div>
        <div className="card-body">
          <div className="mt-5">
            <ReactSortable
              list={images}
              setList={handleSort}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`${
                    index === 0
                      ? "card rounded-lg row-span-2 col-span-2"
                      : "card rounded-lg row-span-1 col-span-1"
                  }`}
                >
                  <img
                    className="rounded-lg border"
                    src={image.picture}
                    alt=""
                  />
                  <div className="form-control hover:bg-gray-800 hover:bg-opacity-30 hover: rounded-lg transition-all hover:duration-500 absolute top-0 w-full h-full">
                    <label className="label cursor-pointer w-full h-full">
                      <input
                        onClick={() => handleClick(image.id)}
                        type="checkbox"
                        value=""
                        className={`checkbox checkbox-dark  bg-white rounded-sm hidden hover:block top-4 left-3 absolute`}
                      />
                    </label>
                  </div>
                </div>
              ))}
              <div className="card rounded-lg">
                <label className="card-body flex items-center justify-center border-2 p-0 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <img className="w-12 md:w-14 2xl:w-20 mt-3" src={gallery} alt="" />
                  <p className="text-gray-500 text-center">Add Image</p>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </ReactSortable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
