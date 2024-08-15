import { useState, useEffect, useRef } from "react";
import ContainerItemMenu from "../components/ContainerItemMenu";
import { getMenus, } from "../services/MenuService";
import { Link } from "react-router-dom";
import ModalCharge from "../components/ModalCharge";
import ToastBillSaved from "../components/ToastBillSaved";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print"

export default function Home() {
    const [menus, setMenus] = useState([])

    // selected items state
    const [selectedItems, setSelectedItems] = useState([])

    // total price state
    const [totalPrice, setTotalPrice] = useState(0)

    // modal charge state
    const [isModalChargeOpen, setIsModalChargeOpen] = useState(false)

    useEffect(() => {
        const loadMenus = async () => {
            try {
                const menus = await getMenus()
                setMenus(menus)
            } catch (error) {
                console.log(error)
            }
        }

        loadMenus()
    }, [])

    const handleHomeItemClick = (item) => {
        const existingItem = selectedItems.find(i => i.name === item.name)

        if (existingItem) {
            setSelectedItems(selectedItems.map(i =>
                i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
            ))
        } else {
            setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
        }
    }

    const handleClearItemClick = () => {
        setSelectedItems([])
    }

    // calculate total price
    useEffect(() => {
        let total = 0
        selectedItems.forEach(item => total += item.price * item.quantity)
        setTotalPrice(total)
    }, [selectedItems])

    const [showToastBill, setShowToastBill] = useState(false)
    const handleSaveBillClick = () => {
        setShowToastBill(true)

        setTimeout(() => {
            setShowToastBill(false)
        }, 3000)
    }

    const billRef = useRef()
    const handleBillPrint = useReactToPrint({
        content: () => billRef.current
    })

    return (
        <div className="flex flex-col flex-col-reverse lg:flex-row">
            <div className="hidden">
                <ComponentToPrint selectedItems={selectedItems} totalPrice={totalPrice} ref={billRef} />
            </div>

            <Link className="fixed top-0 p-2 px-3 bg-[#495DA7] text-white" to={'/menu'}>Menu</Link>
            {/* Menu Items */}
            <div className="lg:w-[57vw]">
                <ContainerItemMenu menus={menus} handleHomeItemClick={handleHomeItemClick} />
            </div>

            {/* Bill */}
            <div className="lg:w-[40vw] flex flex-col m-3 lg:m-0">
                <h2 className="text-4xl text-center font-semibold mt-6">New Customer</h2>

                {/* items bill */}
                <div className="bg-white py-3 mt-5 me-2 min-h-[50vh]">

                    <div className="px-4 mb-5 min-h-[38vh]">
                        {selectedItems.map(item => (
                            <div className="text-xl flex justify-between mb-4" key={item.id}>
                                <p>{item.name}</p>
                                <p>{item.quantity > 1 && `x${item.quantity}`} Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 py-2 text-xl flex justify-between mb-5 border-y">
                        <p>Total:</p>
                        <p>Rp {totalPrice.toLocaleString('id-ID')}</p>
                    </div>

                    {/* clear items */}
                    <div onClick={handleClearItemClick} className="border-y-2 hover:cursor-pointer hover:opacity-75 py-3">
                        <p className="font-semibold text-lg text-gray-400 text-center">Clear</p>
                    </div>
                </div>

                <div className="flex  justify-center gap-5 my-2">
                    <div onClick={handleSaveBillClick} className="hover:cursor-pointer px-4 w-full py-3 hover:bg-gray-600 hover:text-white transition">
                        <h2 className="text-2xl  text-center font-semibold ">Save Bill</h2>
                    </div>
                    <div onClick={handleBillPrint} className="hover:cursor-pointer px-4 w-full py-3 hover:bg-gray-600 hover:text-white transition">
                        <h2 className="text-2xl  text-center font-semibold ">Print Bill</h2>
                    </div>
                </div>

                <div onClick={() => setIsModalChargeOpen(true)} className="hover:cursor-pointer hover:opacity-75 text-2xl bg-[#495DA7] text-white text-center font-semibold py-4">
                    <h2>Charge Rp {totalPrice.toLocaleString('id-ID')}</h2>
                </div>
            </div>
            {
                isModalChargeOpen && (
                    <ModalCharge setIsModalChargeOpen={setIsModalChargeOpen} totalPrice={totalPrice} />
                )
            }
            {
                showToastBill && <ToastBillSaved />
            }
        </div>
    )
}