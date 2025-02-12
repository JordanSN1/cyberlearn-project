// app/page.tsx
import Hero from "./components/Hero/Hero";
import LessonsSection from "./components/LessonsSection/LessonsSection";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <LessonsSection />
        </>
    );
};

export default HomePage;