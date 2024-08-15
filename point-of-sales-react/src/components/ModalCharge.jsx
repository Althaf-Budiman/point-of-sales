import { useEffect, useState } from "react"

export default function ModalCharge({ setIsModalChargeOpen, totalPrice }) {
    const [customerPayment, setCustomerPayment] = useState(0)
    const [changeDue, setChangeDue] = useState(0)

    useEffect(() => {
        if (customerPayment > totalPrice) {
            setChangeDue(customerPayment - totalPrice)
        } else {

            setChangeDue(0)
        }
    }, [customerPayment])


    return (
        <div className="fixed inset-0 flex items-center justify-center z-40">
            <div className="p-4 rounded-lg flex flex-col bg-white text-black z-50 relative w-full max-w-lg mx-auto shadow">

                <div className="flex justify-between items-center border-b my-2">
                    <h2 className="text-2xl font-semibold text-center mb-2">Total Charge: Rp {totalPrice.toLocaleString('id-ID')}</h2>
                    <button onClick={() => setIsModalChargeOpen(false)} className="text-gray-600 hover:text-gray-900 text-3xl">
                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                    </button>
                </div>

                <div className="flex lg:flex-row flex-col lg:gap-1 items-center">
                    <label htmlFor="customerPayment" className="text-xl">Customer Payment:</label>
                    <div className="flex items-center gap-2">
                        <span className="ms-5 text-xl text-green-600">Rp</span>
                        <input id="customerPayment" type="number" className="text-xl px-1 text-green-600 font-semibold focus:outline-none border" value={customerPayment} onChange={(e) => setCustomerPayment(e.target.value)} />
                    </div>
                </div>

                <h2 className="text-xl mb-2">Change Due: <span className="text-green-600">Rp {changeDue.toLocaleString('id-ID')}</span></h2>

                <button onClick={() => { setIsModalChargeOpen(false) }} className="w-full py-2 px-4 mt-2 bg-green-600 rounded-lg text-white block">OK</button>
            </div>
            <div onClick={() => setIsModalChargeOpen(false)} className="fixed inset-0 bg-black opacity-35"></div>
        </div>
    )
}