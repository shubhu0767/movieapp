import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, TextInput } from "flowbite-react";

const WelcomePopupModal = ({ onClose, showAlertFuc }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [inputFeild, setInputFeild] = useState("");
  const inputRef = useRef(null);
  
  // useEffect(() => {
  //   console.log("Component running", inputRef.current.focus());
  //   inputRef.current.focus();
  // }, [inputFeild]);
  const handlePopupClose = e => {
    if (e.target.innerHTML === "Subscribe") {
      showAlertFuc(e.target.innerHTML);
    }
    setShowPopup(false);
    onClose();
  };
  
  console.log(inputFeild);
  // console.log("Component running");
  
  return (
    <Modal
    show={showPopup}
    >
      <Modal.Header>Stay in the Loop!</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl mb-2 leading-relaxed text-gray-500 dark:text-gray-400">
            Be the first to know about our latest Movies, TV Shows, and
            exclusive content by susbscribing to our newsletter.
          </h3>
        </div>
        <div className="mb-2">
          <label className="font-bold">E-mail</label>
        </div>
        <input ref={inputRef} type="email" autoFocus className="border-solid border w-full" style={{border:"1px solid black"}} required placeholder="Email Address" id="" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handlePopupClose}>Subscribe</Button>
        <Button color="gray" onClick={handlePopupClose}>
          No, Thanks
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomePopupModal;
