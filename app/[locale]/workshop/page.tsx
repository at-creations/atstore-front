import { Suspense } from "react";
import { SectionTitle } from "@/app/components/ui/SectionTitle";
import { WorkshopCards } from "@/app/components/WorkshopCards";
import { useTranslations } from "next-intl";
import { Spinner } from "@/app/components/Spinner";

export const metadata = {
  title: {
    en: "Creative Workshops | AT Creations",
    vi: "Các Xưởng Sáng Tạo | AT Creations",
  },
  description: {
    en: "Explore our range of creative workshops including plaster painting, canvas art, and more. Perfect for all ages and skill levels.",
    vi: "Khám phá các xưởng sáng tạo của chúng tôi bao gồm tô tượng, vẽ tranh canvas và nhiều hơn nữa. Phù hợp với mọi lứa tuổi và trình độ.",
  },
};

export default function WorkshopsPage() {
  const t = useTranslations("common");

  return (
    <div className="py-8 mt-20">
      <SectionTitle title={t("workshops")} />
      <Suspense fallback={<Spinner />}>
        <WorkshopCards />
      </Suspense>
    </div>
  );
}
