import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/context";
import ImageCard from "../../components/ImageCard";
import deleteIcon from "../../public/images/icons/delete.png";
import Image from "next/image";
import { ethers } from "ethers";

const Cart = () => {
  const { cart, setCart, savedForLater, setSavedForLater, isConnected } =
    useContext(ThemeContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const checkout = () => {
    console.log("checkout");
  };

  const calculateTotalAmount = (cartItems: any[]) => {
    let sum = 0;
    cartItems.forEach((item) => {
      console.log("item.price:", item.price);
      console.log("typeof item.price:", typeof item.price);

      if (item.price && item.quantity) {
        const priceInEther = ethers.utils.formatUnits(item.price, 18);
        const priceFloat = parseFloat(priceInEther);
        sum += priceFloat * item.quantity;
      }
    });
    setTotalPrice(sum);
  };

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

  return (
    <>
      {isConnected ? (
        <div className="">
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-6 w-fit mx-auto mt-20">
            {cart.length === 0 ? (
              <div className="text-2xl font-bold text-center ml-40 p-20">
                No items in the cart
              </div>
            ) : (
              cart.map((item, index) => {
                const { cid, imageId, price } = item;
                const priceInEther = ethers.utils.formatUnits(item.price, 18);
                return (
                  <div className="grid grid-row-4 gap-4 m-4" key={index}>
                    <div>
                      <ImageCard cid={cid} id={imageId} />
                      <div className="m-4 text-xl font-bold">
                        Final price: {priceInEther}
                      </div>
                      <div className="ml-4 font-bold mb-3">
                        Quantity
                        <input
                          type="number"
                          className="border w-12 h-5 ml-2"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item)}
                        />
                      </div>
                      {/* <Image
                        src={deleteIcon}
                        width={25}
                        height={25}
                        alt="delete"
                      /> */}

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
          <div className="m-4 text-xl font-bold border w-fit p-4 rounded-lg">
            Total amount: {totalPrice}
          </div>
          {cart && (
            <div
              className="bg-main text-white p-4 cursor-pointer w-fit m-10 rounded-lg hover:w-30 hover:font-bold hover:text-xl"
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
