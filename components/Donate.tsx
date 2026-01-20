"use client";

import { useState, useEffect } from "react";

declare global {
    interface Window {
        KhaltiCheckout: any;
    }
}

export default function Donate() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("");

    useEffect(() => {
        // Initialize Khalti only on client side
        if (typeof window !== "undefined" && window.KhaltiCheckout) {
            const khaltiKey = "test_public_key_xxx"; // TODO: replace with live public key
            (window as any).checkout = new window.KhaltiCheckout({
                publicKey: khaltiKey,
                productIdentity: "donation-001",
                productName: "Luv Kush Pratisthan Donation",
                productUrl: "https://your-domain.com/donation",
                eventHandler: {
                    onSuccess(payload: any) {
                        console.log("Khalti success", payload);
                        alert("Thank you. Payment received via Khalti.");
                    },
                    onError(error: any) {
                        console.error(error);
                        alert("Khalti payment failed.");
                    },
                    onClose() { },
                },
            });
        }
    }, []);

    const handlePresetClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount(amount.toString());
    };

    const getAmount = () => {
        const val = parseInt(customAmount || selectedAmount?.toString() || "0", 10);
        if (!val || val < 100) {
            alert("Enter at least NPR 100");
            return null;
        }
        return val;
    };

    const handleKhaltiPay = () => {
        const amt = getAmount();
        if (!amt) return;
        // Khalti expects amount in paisa
        if ((window as any).checkout) {
            (window as any).checkout.show({ amount: amt * 100 });
        }
    };

    const handleEsewaPay = () => {
        const amt = getAmount();
        if (!amt) return;
        const pid = "LKPDON-" + Date.now();
        const tAmt = amt; // if txAmt/psc/pdc are 0

        const form = document.getElementById("esewaForm") as HTMLFormElement;
        (document.getElementById("esewa_amt") as HTMLInputElement).value = amt.toString();
        (document.getElementById("esewa_tAmt") as HTMLInputElement).value = tAmt.toString();
        (document.getElementById("esewa_pid") as HTMLInputElement).value = pid;
        (document.getElementById("esewa_txAmt") as HTMLInputElement).value = "0";
        form.submit();
    };

    return (
        <div id="donate" className="reveal rounded-3xl p-6 border border-amber-200 bg-white/70 shadow relative">
            <div className="absolute -top-6 right-6 rounded-full px-4 py-1 bg-brand-gold text-brand-ramblue text-xs font-semibold shadow">
                Support
            </div>
            <h3 className="font-display text-2xl text-brand-ramblue">Donate</h3>
            <p className="mt-2 text-slate-700">
                Your contribution powers scholarships, health camps, and community
                programs.
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {[1000, 5000, 10000].map((amount) => (
                    <button
                        key={amount}
                        onClick={() => handlePresetClick(amount)}
                        className={`rounded-xl border border-amber-200 px-4 py-3 bg-amber-50 hover:shadow ${selectedAmount === amount ? "ring ring-amber-400 bg-amber-100" : ""
                            }`}
                    >
                        NPR {amount.toLocaleString()}
                    </button>
                ))}
            </div>
            <div className="mt-6">
                <label className="text-sm">Other amount</label>
                <div className="mt-1 flex flex-wrap gap-3 items-center">
                    <input
                        type="number"
                        min="100"
                        placeholder="NPR"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="rounded-xl border border-amber-200 px-4 py-3 bg-white/80 w-40"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleKhaltiPay}
                            className="rounded-full px-5 py-3 bg-[#5D2E8E] text-white hover:shadow"
                            type="button"
                        >
                            Pay with Khalti
                        </button>
                        <button
                            onClick={handleEsewaPay}
                            className="rounded-full px-5 py-3 bg-[#1BA548] text-white hover:shadow"
                            type="button"
                        >
                            Pay with eSewa
                        </button>
                    </div>
                </div>
            </div>
            <form id="esewaForm" method="POST" action="https://uat.esewa.com.np/epay/main" className="hidden">
                <input name="amt" id="esewa_amt" readOnly />
                <input name="pdc" defaultValue="0" readOnly />
                <input name="psc" defaultValue="0" readOnly />
                <input name="txAmt" id="esewa_txAmt" defaultValue="0" readOnly />
                <input name="tAmt" id="esewa_tAmt" readOnly />
                <input name="pid" id="esewa_pid" readOnly />
                <input name="scd" defaultValue="EPAYTEST" readOnly />
                <input name="su" defaultValue="https://your-domain.com/esewa/success" readOnly />
                <input name="fu" defaultValue="https://your-domain.com/esewa/failure" readOnly />
            </form>
            <p className="mt-4 text-xs text-slate-600">

            </p>
        </div>
    );
}
