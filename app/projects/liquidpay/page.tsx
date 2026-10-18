import Link from "next/link"

export const metadata = { title: "LiquidPay — Shreyash Srivastava" }

export default function LiquidPayPage() {
  return (
    <main className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-menu px-4 py-16">
      <div className="journal-paper torn w-full max-w-xl px-8 py-12 text-center">
        <p className="font-rocks text-[22px] uppercase tracking-[0.08em] text-pencil/70">Notice</p>
        <h1 className="mt-1 font-redemption text-[64px] leading-none text-pencil">LIQUIDPAY</h1>
        <p className="mt-6 font-slab text-[17px] leading-relaxed text-pencil">
          A banking and finance dashboard with TensorFlow and Gemini features. The live demo is still being built.
        </p>
        <p className="mt-3 font-hand text-[22px] text-pencil/80">Until then, the source is open to read.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="https://github.com/ShreyashSri/liquidPay" target="_blank" rel="noopener noreferrer" className="btn-rdr">
            Read the source
          </a>
          <Link href="/" className="btn-rdr">
            Back to the map
          </Link>
        </div>
      </div>
    </main>
  )
}
