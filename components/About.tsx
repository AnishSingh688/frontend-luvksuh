import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-20">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className="reveal">
                    <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue">
                        Our Mission
                    </h2>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                        We are a non-profit organization dedicated to advancing the social,
                        educational, and economic well-being of the Kushwaha community. We
                        run scholarships, skill-development, health camps, and cultural
                        initiatives that foster unity and pride.
                    </p>
                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                        <div className="rounded-xl p-4 bg-white/70 border border-amber-200 shadow">
                            <div className="font-semibold text-brand-ramblue">Education</div>
                            <div className="text-sm">Scholarships and coaching support</div>
                        </div>
                        <div className="rounded-xl p-4 bg-white/70 border border-amber-200 shadow">
                            <div className="font-semibold text-brand-ramblue">Health</div>
                            <div className="text-sm">Camps and awareness drives</div>
                        </div>
                        <div className="rounded-xl p-4 bg-white/70 border border-amber-200 shadow">
                            <div className="font-semibold text-brand-ramblue">Livelihood</div>
                            <div className="text-sm">Skills, finance, entrepreneurship</div>
                        </div>
                    </div>
                </div>
                <div className="reveal">
                    <div className="relative rounded-3xl overflow-hidden border border-amber-200 bg-white/70 shadow">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-saffron/15 via-transparent to-brand-gold/20"></div>
                        <Image src="/assets/logo.jpg" alt="Community" width={800} height={600} className="w-full h-80 object-contain bg-white" />
                        <div className="p-6">
                            <p className="text-slate-700">Head Office: Biratnagar, Nepal</p>
                            <p className="text-slate-700">
                                Registered charitable organization serving Kushwaha Samaj.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
