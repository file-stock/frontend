// import { FC, useEffect, useState } from "react";
// import ImageCardForSale from "../../components/ImageCardForSale";

// import { ethers } from "ethers";

// interface ForSaleProps {
//   cids: string;
//   price: number;
// }
// const ForSale: FC<ForSaleProps> = ({ cids, price }) => {
//   const [imagesForSale, setImagesForSale] = useState("");
//   const priceInEther = price ? ethers.utils.formatEther(price.toString()) : "0";

//   useEffect(() => {
//     async function fetchImageData() {
//       try {
//         const response = await fetch(`https://ipfs.io/ipfs/${cids}`);
//         const data = await response.text();
//         setImagesForSale(data);
//       } catch (error) {
//         console.log("Error fetching image data", error);
//       }
//     }
//     fetchImageData();
//   }, [cids, price]);
//   //console.log("cids", cids); //works fine
//   return (
//     <div>
//       <div className="mb-6">
//         {imagesForSale && (
//           <ImageCardForSale
//             img={imagesForSale}
//             title={""}
//             description={""}
//             price={priceInEther}
//             downloadButton={true}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForSale;
import { FC, useEffect, useState, useContext } from "react";
import ImageCardForSale from "../../../components/ImageCardForSale";
import { ethers, utils } from "ethers";
import { ThemeContext } from "../../../context/context";
import PopupMessage from "../../../components/PopupMessage";
import GenericModal from "../../../components/GenericModal";

interface ForSaleProps {
  cids: string;
  price: number;
  id: number;
}

const ForSale: FC<ForSaleProps> = ({ cids, price, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successfullDelete, setSuccessfullDelete] = useState(false);
  const [imagesForSale, setImagesForSale] = useState("");
  const priceInEther = price ? ethers.utils.formatEther(price.toString()) : "0";
  const {
    contract,
    popupMessage,
    setPopupMessage,
    setIsErrorPopupVisible,
    isErrorPopupVisible,
  } = useContext(ThemeContext);
  useEffect(() => {
    const fetchImageData = async () => {
      try {
        if (cids) {
          const response = await fetch(`https://ipfs.io/ipfs/${cids}`);
          const data = await response.text();
          setImagesForSale(data);
        }
      } catch (error) {
        console.log("Error fetching image data", error);
      }
    };
    fetchImageData();
  }, [cids, price]);

  const deleteImage = async (id: number) => {
    console.log("id", id);
    try {
      await contract.deleteFile(id);
      setShowModal(true);
      setDeleteModal(false);
      setSuccessfullDelete(true);
    } catch (error) {
      console.log("Error deleting file", error);
    } finally {
      setTimeout(() => {
        setShowModal(false);
        setSuccessfullDelete(false);
      }, 60000);
    }
  };
  return (
    <div>
      {deleteModal && (
        <GenericModal
          open={deleteModal}
          loader={false}
          label="Delete Confirmation"
          description="Are you sure you want to delete this image? This action cannot be undone."
          onCancel={() => setDeleteModal(false)}
          onConfirm={() => deleteImage(id)}
        />
      )}
      {showModal && (
        <GenericModal
          open={showModal}
          loader={successfullDelete}
          label="Successfully deleted!"
          description="Image deleted successfully. Wait a few seconds and then refresh the page."
        />
      )}
      <div className="mb-6">
        {imagesForSale && (
          <ImageCardForSale
            img={imagesForSale}
            title={""}
            description={""}
            price={priceInEther}
            downloadButton={true}
            deleteButton={true}
            onDelete={() => setDeleteModal(true)}
          />
        )}
      </div>
    </div>
  );
};

export default ForSale;
