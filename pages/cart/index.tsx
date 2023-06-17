import React, { useContext, useState, useEffect, use } from "react";
import { ThemeContext } from "../../context/context";
import ImageCard from "../../components/ImageCard";
import deleteIcon from "../../public/images/icons/delete.png";
import Image from "next/image";
import { ethers } from "ethers";
import { filecoinIcon } from "../../public";

const Cart = () => {
  const {
    cart,
    setCart,
    savedForLater,
    setSavedForLater,
    isConnected,
    ContractAbi,
  } = useContext(ThemeContext);
  const [totalPrice, setTotalPrice] = useState(0);

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
    const quantity = parseInt(e.target.value);
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

  async function checkout() {
    try {
      const selectedIds = cart.map((item) => {
        return ethers.BigNumber.from(item.imageId.hex).toNumber();
      });
      console.log("selectedIds:", selectedIds);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x9E6d38507EC0A19DFA0F4dd246084738c1406E80";

      const contract = new ethers.Contract(
        contractAddress,
        ContractAbi,
        signer
      );
      console.log(
        "ethers.utils.parseEther(totalPrice.toString()):",
        ethers.utils.parseEther(totalPrice.toString())
      );
      const tx = await contract.buyBatch(selectedIds, {
        value: ethers.utils.parseEther(totalPrice.toString()),
      });

      const receipt = await tx.wait();
      console.log(receipt);
    } catch (err) {
      console.error("ERROR inside checkout:", err);
    }
  }

  console.log("cart:", cart);
  return (
    <>
      {isConnected ? (
        <div className="">
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-6 w-fit mx-auto mt-20">
            {cart.length === 0 ? (
              <div className="text-2xl font-bold text-center ml-40 mb-20">
                No items in the cart
              </div>
            ) : (
              cart.map((item, index) => {
                const { cid, imageId, price } = item;
                console.log("price:", price);
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
          {cart && (
            <div
              className={`text-white p-4 cursor-pointer w-fit m-10 rounded-lg ml-10 mt-20 
              ${
                cart.length === 0
                  ? "bg-[#622774] cursor-not-allowed"
                  : "bg-main hover:font-bold hover:text-xl hover:w-30"
              }`}
              onClick={checkout}
            >
              Buy now
            </div>
          )}
          <div className="border-t border-dashed">
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
