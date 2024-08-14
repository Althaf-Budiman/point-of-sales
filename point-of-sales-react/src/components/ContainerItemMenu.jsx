import ItemMenu from "./ItemMenu"

export default function ContainerItemMenu({ menus, handleHomeItemClick }) {
    return (
        <div className="flex justify-center flex-wrap m-10 gap-5">
            {
                menus.map(menu => (
                    <ItemMenu key={menu.id} id={menu.id} name={menu.name} price={menu.price} image={menu.image} handleHomeItemClick={handleHomeItemClick} />
                ))
            }
        </div>
    )
}