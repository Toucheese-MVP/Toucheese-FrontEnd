import { TopBar } from "@/features/common/components/topbar";
import ContactList from "@/features/contact/ui/ContactList";
import { getQuestionsList } from "@/features/contact/hooks/getQuestionList";

async function Page() {
  const response = await getQuestionsList(1);
  return (
    <div className="-mx-4 p-4 pb-20 flex-1">
      <TopBar
        message="문의하기"
        showBack={false}
        showCart={false}
        showShare={false}
      />
      <ContactList initialData={response} />
    </div>
  );
}

export default Page;
