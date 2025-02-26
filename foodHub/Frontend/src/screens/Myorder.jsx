import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Myorder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

    const response = await fetch("http://localhost:5000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await response.json();
    setOrderData(data);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData?.orderData?.order_data?.length > 0 ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((items, index) => (
                <div key={index}>
                  {items.map((arrayData, idx) => (
                    <div key={idx}>
                      {arrayData.Order_date ? (
                        <div className="m-auto mt-5">
                          <strong>{arrayData.Order_date}</strong>
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            {/* <img
                              src={arrayData.img}
                              className="card-img-top"
                              alt="..."
                              style={{ height: "120px", objectFit: "fill" }}
                            /> */}
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <h5 className="text-center mt-5">No orders found</h5>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
