import AnswerForm from "./AnswerForm";

interface QuestionDetailModalProps {
  selectedQuestion: {
    id: number;
    title: string;
    content: string;
    createDate: string;
    answerResponse?: {
      id: number;
      title: string;
      content: string;
      createDate: string;
    };
  } | null;
  isEditing: boolean;
  answerTitle: string;
  answerContent: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDelete: (answerId: number) => void;
  onEdit: () => void;
  onClose: () => void;
}

const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  selectedQuestion,
  isEditing,
  answerTitle,
  answerContent,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancel,
  onDelete,
  onEdit,
  onClose,
}) => {
  return (
    <div className="p-6 mt-4 border rounded-lg bg-gray-50 shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 md:w-2/3 lg:w-1/2">
      <h3 className="text-lg font-bold mb-4">문의글 상세</h3>
      {selectedQuestion && (
        <>
          <div className="mb-4">
            <p>
              <strong>제목:</strong> {selectedQuestion.title}
            </p>
            <p>
              <strong>내용:</strong> {selectedQuestion.content}
            </p>
            <p>
              <strong>작성일:</strong> {selectedQuestion.createDate}
            </p>
          </div>

          {(!selectedQuestion.answerResponse || isEditing) && (
            <AnswerForm
              isEditing={isEditing}
              answerTitle={answerTitle}
              answerContent={answerContent}
              onTitleChange={onTitleChange}
              onContentChange={onContentChange}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}

          {selectedQuestion.answerResponse && !isEditing && (
            <div className="mb-4">
              <h4 className="text-md font-bold">기존 답변</h4>
              <p>
                <strong>제목:</strong> {selectedQuestion.answerResponse.title}
              </p>
              <p>
                <strong>내용:</strong> {selectedQuestion.answerResponse.content}
              </p>
              <p>
                <strong>작성일:</strong>{" "}
                {selectedQuestion.answerResponse.createDate}
              </p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={onEdit}
                  className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                  onClick={() => onDelete(selectedQuestion.answerResponse!.id)}
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-500 underline"
      >
        닫기
      </button>
    </div>
  );
};

export default QuestionDetailModal;
