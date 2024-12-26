



import { MagicCard } from "../ui/magic-card";
import PricingSection from "./PricingCards";

export function MagicCardDemo() {

    return (
        <div
            className={
                "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
            }
        >
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor="#262626"
            >
                Card
            </MagicCard>
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor="#262626"
            >
                Card
            </MagicCard>
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor="#262626"
            >
                Card
            </MagicCard>
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
                gradientColor="#262626"
            >
                Card
            </MagicCard>

        </div>
    );
}

const Features = () => {
    return (
        <div>
            <h1 className="my-10 flex justify-center text-4xl">Features</h1>
            <MagicCardDemo />
            <PricingSection />
        </div>
    )
}

export default Features
