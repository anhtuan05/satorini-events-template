import SocialButtons from "@/components/button/flatButton/socialButtons";
import ContactInformation from "@/containers/contactPage/contactInformation";
import UserForm from "@/containers/contactPage/userForm";

export default function Contact() {
    return (
        <div className="flex flex-col md:flex-row px-4 md:px-16 py-6">
            <UserForm />
            <ContactInformation />
            <SocialButtons />
        </div>
    );
}
