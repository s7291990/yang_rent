import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  isOpen?: boolean;
}

export default function Modal({
  title = '',
  children,
  onClose,
  onOpen,
  isOpen = false,
}: ModalProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen);

  // 외부 isOpen prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    setModalOpen(isOpen);
    if (isOpen && onOpen) onOpen();
    if (!isOpen && onClose) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {modalOpen && (
        <div className={styles.modalPopup}>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>{title}</div>
            <button type="button" className={styles.modalCloseButton} onClick={handleClose}>
              <img src="/image/ico/ico-modal-close.svg" />
            </button>
            <div className={styles.modalScrolls}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
