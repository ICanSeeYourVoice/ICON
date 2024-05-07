import TopBar from "../../components/common/Navigator/TopBar";
import DateInp from "../../components/common/Input/DateInput";
import LabelInput from "../../components/common/Input/LabelInput";
import { useState } from "react";
import LabelTextInput from "../../components/common/Input/LabelTextInput";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/main/record/FileUploadInput";

const RegisterPage = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    console.log(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
    console.log(e.target.value);
  };

  const createDiary = () => {
    navigate("/record");
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen gap-[1rem]">
      <TopBar text="일지 등록" />
      <DateInp />
      <LabelInput
        label="제목"
        placeholder="제목 입력.."
        value={titleValue}
        onChange={handleTitleChange}
      />
      <LabelTextInput
        label="내용"
        placeholder="내용 입력.."
        value={contentValue}
        onChange={handleContentChange}
      />

      <FileUploadInput />
      <div>
        <PostButton label="등록하기" onClick={createDiary} />
      </div>
    </div>
  );
};

export default RegisterPage;
