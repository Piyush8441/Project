import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link
              to="/"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none "
            ></Link>
            <div className="mb-3 mb-md-0 text-muted">
              © 2025 FoodDelivery Made By Piyush Kumar
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
