import React, { useContext, useState, useEffect, use } from "react";
import { ThemeContext } from "../../context/context";
import ImageCard from "../../components/ImageCard";
import deleteIcon from "../../public/images/icons/delete.png";
import Image from "next/image";
import { ethers } from "ethers";
import { filecoinIcon } from "../../public";
import GenericModal from "../../components/GenericModal";
import PopupMessage from "../../components/PopupMessage";

const Cart = () => {
  const {
    cart,
    setCart,
    savedForLater,
    setSavedForLater,
    isConnected,
    setPopupMessage,
    setIsErrorPopupVisible,
    isErrorPopupVisible,
    popupMessage,
    contract,
  } = useContext(ThemeContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [activeBtn, setActiveBtn] = useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTotalAmount = (cartItems: any[]) => {
    let sum = 0;
    cartItems.forEach((item) => {
      //console.log("item.price:", item.price);
      //console.log("typeof item.price:", typeof item.price);

      if (item.price && item.quantity) {
        const priceInEther = ethers.utils.formatUnits(item.price, 18);
        const priceFloat = parseFloat(priceInEther.toString());
        sum += priceFloat * item.quantity;
      }
    });
    sum = parseFloat(sum.toFixed(2));
    setTotalPrice(sum);
  };
  console.log("totalPrice:", totalPrice);
  useEffect(() => {
    calculateTotalAmount(cart);
  }, [cart, calculateTotalAmount]);

  const handleSavedForLater = (item: any) => {
    const updatedCart = cart.filter((cartItem) => cartItem.cid !== item.cid);
    const isItemSaved = savedForLater.some(
      (savedItem) => savedItem.cid === item.cid
    );

    if (isItemSaved) {
      const updatedSavedForLater = savedForLater.filter(
        (savedItem) => savedItem.cid !== item.cid
      );
      setSavedForLater(updatedSavedForLater);
    } else {
      setSavedForLater([...savedForLater, item]);
    }

    setCart(updatedCart);
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    let quantity = parseInt(e.target.value);
    if (quantity < 0) quantity = 0;
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.cid === item.cid) {
        return {
          ...cartItem,
          quantity: isNaN(quantity) ? 0 : quantity,
        };
      }
      return cartItem;
    });
    setCart(updatedCart);
    calculateTotalAmount(updatedCart);
  };

  const handleMoveToCart = (item: any) => {
    const updatedSavedForLater = savedForLater.filter(
      (savedItem) => savedItem.cid !== item.cid
    );
    const updatedCart = [...cart, item];
    setSavedForLater(updatedSavedForLater);
    setCart(updatedCart);
  };

  const handleDeleteItem = (item: any) => {
    const updatedCart = cart.filter((cartItem) => cartItem.cid !== item.cid);
    setCart(updatedCart);
    calculateTotalAmount(updatedCart);
  };

  const checkout = async () => {
    setIsPopUpOpen(true);
    try {
      const selectedIds = cart.map((item) => {
        return ethers.BigNumber.from(item.imageId.hex);
      });
      // console.log("selectedIds:", selectedIds);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contractAddress = "0xd99bAbF3F4b310e9D80ac396518112e552016608";

      // const contract = new ethers.Contract(
      //   contractAddress,
      //   ContractAbi,
      //   signer
      // );
      console.log(
        "value of transaction:",
        ethers.utils.parseEther(totalPrice.toString())
      );
      const tx = await contract.buyBatch(selectedIds, {
        value: ethers.utils.parseEther(totalPrice.toString()),
      });

      await tx.wait();
      setIsPopUpOpen(false);
      setCart([]);
      setPopupMessage("Checkout successful!");
      setIsSuccessPopupVisible(true);
    } catch (err: any) {
      if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
        setPopupMessage("You don't have enough funds");
      } else if (err.code === "INVALID_ARGUMENT") {
        setPopupMessage("Image not found");
      } else if (err.code === -32603) {
        setPopupMessage("Can't load image");
      } else if (err.code === "ACTION_REJECTED") {
        setPopupMessage("User denied transaction");
      } else {
        setPopupMessage("Error");
      }
      setIsPopUpOpen(false);
      setIsErrorPopupVisible(true);
      console.error("ERROR inside checkout:", err);
    } finally {
      setTimeout(() => {
        setIsErrorPopupVisible(false);
      }, 2500);
    }
  };
  useEffect(() => {
    if (cart.length === 0) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [cart]);
  console.log("cart:", cart);
  return (
    <>
      {isConnected ? (
        <div className="">
          <PopupMessage
            isVisible={isSuccessPopupVisible || isErrorPopupVisible}
            message={popupMessage}
            onClose={() => setIsErrorPopupVisible(false)}
          />
          <GenericModal
            open={isPopUpOpen}
            loader={true}
            label="Loading..."
            description="the operation may take a few seconds"
          />
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-6 w-fit mx-auto mt-20">
            {cart.length === 0 ? (
              <div className="text-2xl font-bold text-center ml-40 mb-20">
                No items in the cart
              </div>
            ) : (
              cart.map((item, index) => {
                const { cid, imageId, price } = item;
                const priceInEther = ethers.utils.formatUnits(price);
                console.log("priceInEther:", priceInEther);
                return (
                  <div className="grid grid-row-4 gap-4 m-4" key={index}>
                    <div>
                      <ImageCard cid={cid} id={imageId} />
                      <div className="m-4 text-xl font-bold flex">
                        Final price:
                        <div className="flex items-center  text-3xl font-semibold gap-3 ml-2">
                          <Image
                            src={filecoinIcon}
                            width={15}
                            height={15}
                            alt="filecoin"
                          />
                        </div>
                        {priceInEther}
                      </div>
                      <div className="ml-4 font-bold mb-3 flex">
                        <div className="mt-1 text-lg">Quantity</div>
                        <input
                          type="number"
                          className="border w-12 h-5 ml-2 mt-2"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item)}
                        />
                        <button
                          className="ml-4"
                          onClick={() => handleDeleteItem(item)}
                        >
                          <Image
                            src={deleteIcon}
                            width={25}
                            height={25}
                            alt="delete"
                          />
                        </button>
                      </div>

                      <div className="ml-4">
                        <input
                          key={item.cid}
                          type="checkbox"
                          className=""
                          onClick={() => handleSavedForLater(item)}
                        />
                        <label className="ml-2 font-bold">Buy later</label>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="ml-10 mt-20 text-xl font-bold border w-fit p-4 rounded-lg flex">
            Total amount:{" "}
            <div className="flex items-center  text-3xl font-semibold gap-3 ml-2">
              <Image src={filecoinIcon} width={15} height={15} alt="filecoin" />
            </div>
            {totalPrice}
          </div>
          {cart && activeBtn && (
            <div
              className="text-white p-4 cursor-pointer w-fit m-10 rounded-lg ml-10 mt-20 bg-main hover:font-bold hover:text-xl hover:w-30"
              onClick={checkout}
            >
              Buy now
            </div>
          )}
          <div className="border-t border-dashed mt-10">
            <div className="font-bold text-xl p-10">Saved for later</div>
            {savedForLater.map((item, index) => {
              return (
                <div className="grid grid-row-4 gap-4 m-4" key={index}>
                  <ImageCard cid={item.cid} id={item.imageId} />
                  <div className="m-4 text-xl font-bold">
                    <input
                      type="checkbox"
                      className=""
                      onClick={() => handleMoveToCart(item)}
                    />
                    <label className="ml-2">Move to cart</label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-2xl font-bold text-center py-96">
          Please connect your wallet to view cart
        </div>
      )}
    </>
  );
};
export default Cart;
