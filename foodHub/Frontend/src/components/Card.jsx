import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContexReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddtoCart = async () => {
    let food = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
      console.log("Size different so simply ADD one more to the list");
    }
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top "
          src={props.foodItem.img}
          alt="Card image cap"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
        </div>
        <div className="container w-100">
          <select
            className="m-2 h-100  bg-info rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(10), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select
            className="m-2 h-100  bg-info rounded"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-primary justify-center ms-2 m-2"
          onClick={handleAddtoCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
