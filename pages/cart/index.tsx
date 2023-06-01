import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/context";
import ImageCard from "../../components/ImageCard";
import { ethers } from "ethers";

const Cart = () => {
  const { cart, isConnected } = useContext(ThemeContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const checkout = () => {
    console.log("checkout");
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cart]);

  const calculateTotalAmount = () => {
    let sum = 0;
    cart.forEach((item) => {
      if (item.price) {
        const priceInEther = ethers.utils.formatEther(item.price.toString());
        const priceFloat = parseFloat(priceInEther);
        sum += priceFloat;
      }
    });
    setTotalPrice(sum);
  };

  return (
    <>
      {isConnected ? (
        <div className="ml-4">
          <div className="sm:flex sm:gap-5 md:flex md:gap-5 lg:flex lg:gap-5 xl:flex xl:gap-5 2xl:flex 2xl:gap-5">
            {cart.length === 0 ? (
              <div className="text-2xl text-center py-96">
                No items in the cart
              </div>
            ) : (
              cart.map((item, index) => {
                const { cid, imageId, price } = item;
                const priceInEther = price
                  ? ethers.utils.formatEther(price.toString())
                  : "0";
                return (
                  <div className="grid grid-cols-4 gap-4 m-4" key={index}>
                    <div>
                      <ImageCard cid={cid} id={0} />
                      <div className="m-4 text-xl font-bold">
                        Final price: {priceInEther}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="m-4 text-xl font-bold">
            Total amount: {totalPrice}
          </div>
          {cart && (
            <div
              className="bg-main text-white p-4 cursor-pointer w-fit m-10 rounded-lg"
              onClick={checkout}
            >
              Buy now
            </div>
          )}
        </div>
      ) : (
        <div>"Please connect your wallet to view cart"</div>
      )}
    </>
  );
};
export default Cart;
