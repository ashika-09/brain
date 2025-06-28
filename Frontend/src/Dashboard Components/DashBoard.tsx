import { useState } from 'react';
import Background from './Background';
import CreateContent from './CreateContent';
import Sidebar from './sidebar';
import Unauthorized from './Unauthorize';

interface FuncProps {
  data?: Card[];
  shared?: boolean;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  linkType: string;
  link: string;
  description: string;
  tags: string[];
}

const DashBoard: React.FC<FuncProps> = ({ data, shared }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCardUpdated, setCardUpdated] = useState(false);
  const token = localStorage.getItem('token');

  const handleModalClose = () => {
    setModalOpen(false);
    setCardUpdated((prev) => !prev);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };


  if (!token && !shared) {
    return (
      <Unauthorized/>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen font-janeLight text-white flex overflow-hidden transition-all duration-500">
      <CreateContent shared={shared} open={isModalOpen} onClose={handleModalClose} />
      <Sidebar shared={shared}/>
      <Background
        cardRender={isCardUpdated}
        shared={shared}
        data={data}
        onClickopen={handleModalOpen}
      />
    </div>
  );
};

export default DashBoard;
