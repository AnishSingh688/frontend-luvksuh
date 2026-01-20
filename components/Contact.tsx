export default function Contact() {
    return (
        <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-3xl md:text-4xl text-brand-ramblue text-center">
                    Contact
                </h2>
                <p className="text-center mt-3 text-slate-600">
                    We welcome collaboration and volunteer interest.
                </p>

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    <div className="reveal rounded-2xl p-6 border border-amber-200 bg-white/70">
                        <div className="text-sm text-slate-600">Head Office</div>
                        <div className="font-semibold text-brand-ramblue">
                            Biratnagar-12, Nepal
                        </div>
                    </div>
                    <div className="reveal rounded-2xl p-6 border border-amber-200 bg-white/70">
                        <div className="text-sm text-slate-600">Email</div>
                        <div className="font-semibold text-brand-ramblue">
                            pratisthan.luvkush@gmail.com
                        </div>
                    </div>
                    <div className="reveal rounded-2xl p-6 border border-amber-200 bg-white/70">
                        <div className="text-sm text-slate-600">Phone</div>
                        <div className="font-semibold text-brand-ramblue">+977-9842049515</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
