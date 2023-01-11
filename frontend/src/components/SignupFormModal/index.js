import React from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './SignupFormModal.css'

function SignupFormModal({ showModalli, setShowModalli, showModalsp, setShowModalsp }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='signup-button'
        onClick={() => setShowModalsp(true) & setShowModalli(false)}>Sign Up</button>
      {showModalsp && (
        <Modal onClose={() => setShowModalsp(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
