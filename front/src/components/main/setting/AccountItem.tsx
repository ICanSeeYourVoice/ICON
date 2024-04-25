import deleteIcon from "../../../assets/svgs/setting/delete.svg";

const AccountItem = ({ name, userId }: { name: string; userId: string }) => {
  return (
    <div className="flex justify-between items-center w-[15.25rem] h-[3.5625rem] p-[0.7rem] bg-white rounded-[0.625rem] shadow mb-[0.4rem] mt-[0.4rem]">
      <div className="flex flex-col justify-center items-start">
        <span className="text-[0.875rem]">{name}</span>
        <span className="text-[0.625rem] text-gray-0">{userId}</span>
      </div>
      <img src={deleteIcon} alt="" />
    </div>
  );
};

export default AccountItem;
