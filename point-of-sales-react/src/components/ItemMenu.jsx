import { useState } from "react";
import { deleteMenu, editMenu } from "../services/MenuService"
import { useLocation } from 'react-router-dom'

export default function ItemMenu({ id, name, price, handleHomeItemClick }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const location = useLocation()

    // form create
    const [nameValue, setNameValue] = useState(name)
    const [priceValue, setPriceValue] = useState(price)

    const handleEditMenu = async () => {
        try {
            await editMenu(id, nameValue, priceValue)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteMenu = async () => {
        try {
            await deleteMenu(id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = () => {
        setNameValue(name);
        setPriceValue(price);
        setIsModalOpen(false);
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleItemClick = () => {
        if (location.pathname === '/') {
            const item = { id, name, price }
            handleHomeItemClick(item)
        } else if (location.pathname === '/menu') {
            openModal()
        }
    }

    return (
        <>
            <div onClick={handleItemClick} className="flex hover:opacity-75 bg-white transition hover:cursor-pointer flex-col text-center w-44 border">
                <div className=" h-44 object-cover border">
                    <img src="../src/assets/placeholder-food.jpg" />
                </div>
                <p className="font-semibold text-2xl p-3">{name}</p>
            </div>
            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-40">
                        <div className="p-4 rounded-lg flex flex-col bg-white text-black z-50 relative">

                            <div className="flex justify-between items-center border-b my-2">
                                <h2 className="text-2xl font-semibold text-center mb-2">Edit "{name}"</h2>
                                <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 text-3xl">
                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                </button>
                            </div>

                            <img src="../src/assets/placeholder-food.jpg" className="w-full mx-auto my-2 max-w-56"></img>
                            <input type="text" className="text-2xl font-semibold" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />

                            <div className="mt-2 flex text-2xl font-semibold text-green-600">
                                <p className="me-2">Rp</p>
                                <input type="number" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} />
                            </div>

                            <div className="justify-end flex gap-3 mt-6">
                                <button onClick={handleDeleteMenu} className=" w-full py-2 px-4 bg-red-600 rounded-lg text-white">Delete</button>
                                <button onClick={handleEditMenu} className=" w-full py-2 px-4 bg-green-600 rounded-lg text-white">Save</button>
                            </div>
                        </div>
                        <div onClick={closeModal} className="fixed inset-0 bg-black opacity-35"></div>
                    </div>
                )
            }
        </>
    )
}