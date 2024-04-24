import SmilePhotoSm from "../../../components/main/record/SmilePhotoSm";

const AllSmilePhoto = () => {
  const photos = [
    "더미1",
    "더미2",
    "더미3",
    "더미4",
    "더미5",
    "더미5",
    "더미5",
  ];

  //   const handleDelete = (index) => {
  //     setPhotos(prevPhotos => prevPhotos.filter((_, idx) => idx !== index));
  //   };
  return (
    <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
      {photos.map((photo, index) => (
        <div key={index} className="relative">
          <SmilePhotoSm src={photo} />
          <button
            className="absolute top-0 right-0 bg-gray-500 text-white  text-xs rounded-full"
            style={{ width: "15px", height: "15px" }}
            //   onClick={() => handleDelete(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllSmilePhoto;
