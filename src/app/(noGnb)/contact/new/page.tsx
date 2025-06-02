import { TopBar } from "@/features/common/components/topbar";
import NewContact from "@/features/contact/ui/NewContact";

function NewContactRoutePage() {
  return (
    <div className="flex-1 flex">
      <TopBar message="문의하기" showCart={false} showShare={false} />
      <NewContact />
    </div>
  );
}

export default NewContactRoutePage;
