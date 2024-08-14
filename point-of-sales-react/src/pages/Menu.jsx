import { useEffect, useState } from "react";
import ContainerItemMenu from "../components/ContainerItemMenu";
import { getMenus, addMenu } from '../services/MenuService'
import { Link } from "react-router-dom";

export default function Menu() {

    const [menus, setMenus] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    // form create
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

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

    const handleAddMenu = async () => {
        try {
            await addMenu(name, price)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Link className="fixed top-0 p-2 px-3 bg-[#495DA7] text-white" to={'/'}>Back</Link>

            <h1 className="text-center mt-8 text-5xl font-semibold mb-5">Menu</h1>
            <ContainerItemMenu menus={menus} />

            <div onClick={() => setIsModalOpen(true)} className="hover:cursor-pointer fixed z-50 bottom-10 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 active:scale-95">
                Add Menu
                <svg className="h-6 w-6 inline-block ml-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
            </div>

            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-40">
                        <div className="p-4 rounded-lg flex flex-col bg-white text-black z-50 relative">

                            <div className="flex justify-between items-center border-b my-2">
                                <h2 className="text-2xl font-semibold text-center mb-2">Add Menu</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900 text-3xl">
                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                </button>
                            </div>

                            <input type="text" placeholder="Menu name.." className="text-2xl font-semibold focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                            <div className="mt-2 mb-4 flex text-2xl font-semibold text-green-600">
                                <p className="me-2">Rp</p>
                                <input type="number" className="focus:outline-none" value={price.toLocaleString('id-ID')} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <button onClick={handleAddMenu} className="w-full py-2 px-4 mt-2 bg-green-600 rounded-lg text-white block">Add Menu</button>
                        </div>
                        <div onClick={() => setIsModalOpen(!isModalOpen)} className="fixed inset-0 bg-black opacity-35"></div>
                    </div>
                )
            }
        </>
    )
}