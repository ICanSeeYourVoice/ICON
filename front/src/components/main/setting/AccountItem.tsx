import { useMutation } from "@tanstack/react-query";
import deleteIcon from "../../../assets/svgs/setting/delete.svg";
import { deleteGuardian } from "../../../apis/Notification";
import toast from "react-hot-toast";

const AccountItem = ({
  id,
  name,
  userId,
}: {
  id: number;
  name: string;
  userId: string;
}) => {
  const { mutate } = useMutation({
    mutationFn: deleteGuardian,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteClick = () => {
    mutate(id);
  };

  return (
    <div className="flex justify-between items-center w-[15.25rem] h-[3.5625rem] p-[0.7rem] bg-white rounded-[0.625rem] shadow mb-[0.4rem] mt-[0.4rem]">
      <div className="flex flex-col justify-center items-start">
        <span className="text-[0.875rem]">{name}</span>
        <span className="text-[0.625rem] text-gray-0">{userId}</span>
      </div>
      <button onClick={handleDeleteClick}>
        <img src={deleteIcon} alt="" />
      </button>
    </div>
  );
};

export default AccountItem;
