type PopupMessageProps = {
  isVisible: boolean;
  message: string;
  onClose: () => void;
};

const PopupMessage: React.FC<PopupMessageProps> = ({
  isVisible,
  message,
  onClose,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-5 left-5 z-50 border rounded-lg w-[300px] h-[100px] flex justify-center items-center bg-main text-white animate-fadeIn">
      <span>{message}</span>
      <button onClick={onClose} className="absolute top-0 right-2">
        X
      </button>
    </div>
  );
};

export default PopupMessage;
