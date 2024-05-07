import TopBar from "../../components/common/Navigator/TopBar";
import DateInp from "../../components/common/Input/DateInput";
import { useState } from "react";
import LabelTextInput from "../../components/common/Input/LabelTextInput";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/main/record/FileUploadInput";

const RegisterPage = () => {
  const [contentValue, setContentValue] = useState("");
  const navigate = useNavigate();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
    console.log(e.target.value);
  };

  const createDiary = () => {
    navigate("/record");
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen gap-[2rem]">
      <TopBar text="일지 등록" />
      <div className="mt-[1rem]">
        <DateInp />
      </div>
      <div>
        <LabelTextInput
          label="내용"
          placeholder="내용 입력.."
          value={contentValue}
          onChange={handleContentChange}
        />
      </div>
      <div>
        <FileUploadInput />
        <div className="fixed bottom-[4rem]">
          <PostButton label="등록하기" onClick={createDiary} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
