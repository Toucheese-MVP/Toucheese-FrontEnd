import { TopBar } from "@/features/common/components/topbar";
import ContactList from "@/features/contact/ui/ContactList";

function ContactRoutePage() {
  return (
    <div className="-mx-4 p-4 pb-20 flex-1">
      <TopBar
        message="문의하기"
        showBack={false}
        showCart={false}
        showShare={false}
      />
      <ContactList />
    </div>
  );
}

export default ContactRoutePage;
