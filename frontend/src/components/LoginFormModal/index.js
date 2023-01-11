import React from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginFormModal.css'

function LoginFormModal({ showModalli, setShowModalli, setShowModalsp }) {
  // const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className='Login-button'
        onClick={() => setShowModalli(true) & setShowModalsp(false)}>Log In</button>
      {showModalli && (
        <Modal onClose={() => setShowModalli(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
