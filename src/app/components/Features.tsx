import {
  CloudLightning,
  Code,
  Eye,
  FileCode2,
  Hammer,
  Library,
  ListMinus,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Manage Popups with one Script",
      description:
        "Seamless integration with popular platforms and customizable affiliate portal for brand alignment and leveraging existing infrastructure.",
      icon: <FileCode2 className="text-brand" size={30} />,
    },
    {
      title: "Access to Template Library",
      description:
        " Explore a wide range of professionally designed popup templates in Popwola's template library. Choose from various styles and themes to find the perfect fit for your website.",
      icon: <Library className="text-brand" size={30} />,
    },
    {
      title: "No-Code Editor",
      description:
        "Say goodbye to coding complexities. Popwola provides a user-friendly, no-code editor that allows you to customize and personalize your popups effortlessly. Create visually stunning designs without writing a single line of code.",
      icon: <Hammer className="text-brand" size={30} />,
    },
    {
      title: "Preview Option before Publishing",
      description:
        "Ensure your popups look perfect before going live. With Popwola's preview option, you can see exactly how your popups will appear on your website, making it easy to fine-tune and optimize them for maximum impact.",
      icon: <Eye className="text-brand" size={30} />,
    },
    {
      title: "Timeline Management",
      description:
        "Popwola allows you to manage the display duration of your popups with ease. With the timeline management feature, you can specify the start date and end date for each popup, controlling when it appears and when it should be hidden.",
      icon: <ListMinus className="text-brand" size={30} />,
    },
    {
      title: "Blazing Fast Performance",
      description:
        "Experience lightning-fast performance with Popwola, the ultimate no-code popup builder. We understand the importance of speed in today's digital landscape, which is why we have optimized Popwola to deliver an exceptional user experience with unparalleled speed.",
      icon: <CloudLightning className="text-brand" size={30} />,
    },
  ];
  return (
    <div id="features" className="px-[5%] py-20 pt-10 relative">
      <h1 className="text-4xl font-semibold text-center">
        Features of Popwola
      </h1>
      <p className="text-base text-center mt-2 text-secondary">
        Explore the features of Popwola that make it the ultimate no-code popup
        builder
      </p>

      <div className="flex items-center py-7 pt-6 gap-6 flex-wrap justify-center">
        <div className="py-20 flex flex-wrap justify-center items-center w-11/12 gap-14">
          {features.map((offering: any) => (
            <div
              key={offering.id}
              className="md:w-[330px] w-full flex flex-col gap-4"
            >
              {offering.icon}
              <h3 className="text-xl font-semibold">{offering.title}</h3>
              <p className="text-sm text-secondary/60">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
