import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteGuardian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guardianList"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteClick = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center justify-center w-full">
          <p>{name}(을)를 삭제하시겠습니까?</p>
          <hr />
          <div className="mt-4 flex w-full justify-end text-white">
            <button
              className="bg-gray-1 py-2 px-4 rounded mr-[0.4rem]"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              취소
            </button>
            <button
              className="bg-primary py-2 px-4 rounded mr-2"
              onClick={() => {
                mutate(id);
                toast.dismiss(t.id);
              }}
            >
              확인
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
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
