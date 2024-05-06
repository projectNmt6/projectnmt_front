/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

export default function ShareModal() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  return (
    <View>
      <Text>ShareModal</Text>
    </View>
  )
}
