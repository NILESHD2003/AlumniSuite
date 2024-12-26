
// Data to show within the cards
const plans = [
    // Basic card
    {
        title: "Basic",
        price: "$499/year",
        features: [
            "Unlimited active users",
            "Unlimited email sends",
            "Unlimited data storage",
            "Premium support",
            "Advanced reporting",
        ],
    },
    // Pro Card
    {
        title: "Pro",
        price: "$999/year",
        features: [
            "Everything in Essentials",
            "Customizable dashboards",
            "Data enrichment",
            "Advanced segmentation",
            "Salesforce integration",
        ],
    },
    // custom card
    {
        title: "Custom",
        price: "$1999/year",
        features: [
            "Everything in Plus",
            "Advanced personalization",
            "Dedicated IP address",
            "Professional services",
            "Service-level agreement (SLA)",
        ],
    },
];

// Logo Images for to show Trusted Institutes
const trustedLogos = [
    "https://res.cloudinary.com/dpktednrm/image/upload/v1733141087/Collge%20Logos/tf0j2byjofifbu91gbk6.png",
    "https://res.cloudinary.com/dpktednrm/image/upload/v1733141086/Collge%20Logos/vwm2snecj0qinjkfqcig.png",
    "https://res.cloudinary.com/dpktednrm/image/upload/v1733141086/Collge%20Logos/qobh2arkuxzpsrzvb5k3.jpg",
    "https://res.cloudinary.com/dpktednrm/image/upload/v1733141086/Collge%20Logos/dx0ccsipqjcsmld87wt0.jpg",
    "https://res.cloudinary.com/dpktednrm/image/upload/v1733141086/Collge%20Logos/t5jwlbm10n13zqe2y07e.jpg",
    "https://res.cloudinary.com/dpktednrm/image/upload/v1733141086/Collge%20Logos/pagfwhadjzw3s8dxjdun.jpg",
];

const PricingSection = () => {
    return (
        <div className="bg-white py-8 px-8 sm:px-8">
            {/* Pricing Section */}
            <div className="max-w-7xl mx-auto">
                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg shadow-md bg-white p-6"
                        >
                            {/* Plan Title */}
                            <h3 className="flex text-xl font-bold text-[#121417] mb-2">
                                {plan.title}
                            </h3>

                            {/* Plan Price */}
                            <p className="flex text-4xl font-bold text-[#121417] mb-6">
                                {plan.price}
                            </p>

                            {/* Trial Button */}
                            <button className="w-full bg-[#F0F2F5] text-[#121417] py-2 px-4 mb-4 rounded-lg font-medium hover:bg-gray-200 transition">
                                Start free trial
                            </button>

                            {/* Features */}
                            <ul className="mb-6">
                                {plan.features.map((feature, id) => (
                                    <li
                                        key={id}
                                        className="flex items-center mb-2 text-[#121417]"
                                    >
                                        <span className="text-[#121417] font-bold mr-2">&#10003;</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trusted by Top Colleges and Universities */}
            <div className="mt-16">
                <h2 className="flex justify-start text-2xl font-bold text-[#121417] text-center mb-8">
                    Trusted by top colleges and universities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
                    {trustedLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl flex items-center justify-center shadow-md"
                        >
                            <img
                                src={logo}
                                alt={`College logo ${index + 1}`}
                                className="h-32 w-32 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingSection;
