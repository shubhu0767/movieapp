import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RequireModal = () => {
  const { setWishlistData, wishlistData } = useContext(Context);
  const navigate = useNavigate();
  // console.log(setWishlistData);
  const onClick = (e) => {
    setWishlistData(false);
    if (e.target.innerHTML === "Login") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Modal show={wishlistData} onClose={() => setWishlistData(false)} size="lg">
      <Modal.Header className="text-center">Login Required</Modal.Header>
      <Modal.Body>
        <h1 className="text-center text-black text-2xl">
          Please login to continue
        </h1>
        <Button onClick={onClick} className="mx-auto mt-4">
          Login
        </Button>
        <div className="divider"></div>
        <h1 className="text-center text-black text-2xl">New to MovieAPP?</h1>
        <Button className="mx-auto mt-4" onClick={onClick}>
          Register Now
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RequireModal;
