import { useAdminQuestions } from "../../hooks/AdminQuestion";
import { useAdminAnswer } from "../../hooks/useAdminAnswer";

function AdminContactList() {
  const { data, loading, error, refetch } = useAdminQuestions();
  const {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    loading: answerLoading,
  } = useAdminAnswer();

  const handleCreateAnswer = async (questionId: number) => {
    const content = prompt("답변 내용을 입력해주세요:");
    if (content) {
      try {
        await createAnswer(questionId, content);
        alert("답변이 성공적으로 작성되었습니다.");
        await refetch(0, 10);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("답변 작성 중 오류가 발생했습니다.");
      }
    }
  };

  const handleUpdateAnswer = async (questionId: number) => {
    const content = prompt("새로운 답변 내용을 입력해주세요:");
    if (content) {
      try {
        await updateAnswer(questionId, content);
        alert("답변이 성공적으로 수정되었습니다.");
        await refetch(0, 10);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("답변 수정 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeleteAnswer = async (questionId: number) => {
    if (confirm("정말로 답변을 삭제하시겠습니까?")) {
      try {
        await deleteAnswer(questionId);
        alert("답변이 성공적으로 삭제되었습니다.");
        await refetch(0, 10);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("답변 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <table className="hidden md:table min-w-full text-sm text-gray-800 border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 text-center">ID</th>
            <th className="px-2 py-2 text-center">제목</th>
            <th className="px-2 py-2 text-center">내용</th>
            <th className="px-2 py-2 text-center">작성일</th>
            <th className="px-2 py-2 text-center">상태</th>
            <th className="px-2 py-2 text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {data?.content.map((question) => (
            <tr key={question.id} className="border-b">
              <td className="py-2 px-2 text-center">{question.id}</td>
              <td className="py-2 px-2 text-center truncate max-w-xs">
                {question.title}
              </td>
              <td className="py-2 px-2 text-center truncate max-w-xs">
                {question.content}
              </td>
              <td className="py-2 px-2 text-center">{question.createDate}</td>
              <td className="py-2 px-2 text-center">{question.answerStatus}</td>
              <td className="py-2 px-2 text-center space-y-1">
                <button
                  onClick={() => handleCreateAnswer(question.id)}
                  disabled={answerLoading}
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 w-full"
                >
                  작성
                </button>
                <button
                  onClick={() => handleUpdateAnswer(question.id)}
                  disabled={answerLoading}
                  className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600 w-full"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteAnswer(question.id)}
                  disabled={answerLoading}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 w-full"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:hidden block space-y-4 test:sm">
        {data?.content.map((question) => (
          <div
            key={question.id}
            className="border p-4 rounded-lg shadow-md text-gray-800 space-y-2"
          >
            <p>ID: {question.id}</p>
            <p>제목: {question.title}</p>
            <p>내용: {question.content}</p>
            <p>작성일: {question.createDate}</p>
            <p>상태: {question.answerStatus}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleCreateAnswer(question.id)}
                disabled={answerLoading}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
              >
                작성
              </button>
              <button
                onClick={() => handleUpdateAnswer(question.id)}
                disabled={answerLoading}
                className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
              >
                수정
              </button>
              <button
                onClick={() => handleDeleteAnswer(question.id)}
                disabled={answerLoading}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContactList;
