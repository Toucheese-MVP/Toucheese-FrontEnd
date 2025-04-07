interface AnswerFormProps {
  isEditing: boolean;
  answerTitle: string;
  answerContent: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  isEditing,
  answerTitle,
  answerContent,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancel,
}) => (
  <div className="mb-4">
    <h4 className="text-md font-bold">
      {isEditing ? "답변 수정" : "답변 작성"}
    </h4>
    <input
      type="text"
      placeholder="제목을 입력하세요"
      className="w-full p-2 border rounded mb-2"
      value={answerTitle}
      onChange={(e) => onTitleChange(e.target.value)}
    />
    <textarea
      placeholder="내용을 입력하세요"
      className="w-full p-2 border rounded mb-2 resize-none"
      rows={4}
      value={answerContent}
      onChange={(e) => onContentChange(e.target.value)}
    />
    <div className="flex space-x-2 mt-4">
      <button
        onClick={onSubmit}
        className={`${
          isEditing ? "bg-yellow-500" : "bg-blue-500"
        } text-white text-sm px-4 py-2 rounded hover:opacity-80`}
      >
        {isEditing ? "수정" : "작성"}
      </button>
      {isEditing && (
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-600"
        >
          취소
        </button>
      )}
    </div>
  </div>
);

export default AnswerForm;
