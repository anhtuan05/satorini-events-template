import BackToTopButton from "@/components/button/flatButton/backToTopButton";
import SocialButtons from "@/components/button/flatButton/socialButtons";
import Banner from "@/containers/homePage/banner/banner";
import Events from "@/containers/homePage/s-events/events";
import Guest from "@/containers/homePage/s-events/guests";


export default function Home() {
    return (
        <div>
            <Banner
                title="Welcome to Santorini Media & Entertainment"
                content="Discover amazing content and services with us!" />
            <Events />
            <Guest />
            <SocialButtons />
            <BackToTopButton />
        </div>
    );
}
