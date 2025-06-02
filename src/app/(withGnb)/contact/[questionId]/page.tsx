import { TopBar } from "@/features/common/components/topbar";
import ContactItem from "@/features/contact/components/ContactItem";
import { getQuestionDetail } from "@/features/contact/hooks/getQuestionDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  const questionDetail = await getQuestionDetail(parseInt(questionId, 10));

  if (!questionDetail) {
    return <div>문의 내용을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <TopBar message="문의 상세보기" showCart={false} showShare={false} />
      <ContactItem
        contact={{
          id: questionDetail.id,
          title: questionDetail.title,
          content: questionDetail.content,
          status: questionDetail.answerStatus,
          author: "작성자",
          date: questionDetail.createDate,
          photos: questionDetail.imageUrls,
        }}
      />
      <div className="border rounded-lg p-4 bg-primary-1">
        {questionDetail.answerResponse ? (
          <>
            <h2 className="text-md font-bold mb-2">
              제목 : {questionDetail.answerResponse.title}
            </h2>
            <p>{questionDetail.answerResponse.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              작성일:{" "}
              {new Date(
                questionDetail.answerResponse.createDate
              ).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">답변이 아직 없습니다.</p>
        )}
      </div>
    </div>
  );
}
