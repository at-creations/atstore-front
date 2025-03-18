"use client";

import { Suspense } from "react";
import { Spinner } from "@/app/components/Spinner";
import { ContactUs } from "@/app/components/ContactUs";

export default function About() {
	return (
		<div className="container mx-auto px-4 py-8 mt-20">
			<Suspense fallback={<Spinner />}>
				<ContactUs />
			</Suspense>
		</div>
	);
}
