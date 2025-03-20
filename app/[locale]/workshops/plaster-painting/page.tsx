import { Suspense } from "react";
import { PlasterContent } from "@/app/components/PlasterContent";
import { Spinner } from "@/app/components/Spinner";

export const metadata = {
  title: {
    en: "Creative Plaster Painting Workshop | AT Creations",
    vi: "Tô Tượng Sáng Tạo | AT Creations",
  },
  description: {
    en: "Join our plaster painting workshop to relax, unleash creativity, and create unique handmade art pieces. Perfect for all ages and skill levels.",
    vi: "Tham gia xưởng tô tượng của chúng tôi để thư giãn, giải phóng sự sáng tạo và tạo ra những tác phẩm nghệ thuật độc đáo. Phù hợp với mọi lứa tuổi và trình độ.",
  },
};

export default function PlasterPaintingPage() {
  return (
    <div className="py-8 mt-20">
      <Suspense fallback={<Spinner />}>
        <PlasterContent />
      </Suspense>
    </div>
  );
}
