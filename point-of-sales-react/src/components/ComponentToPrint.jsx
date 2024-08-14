import React from "react";

export const ComponentToPrint =  React.forwardRef(({selectedItems, totalPrice}, ref) => {
    return (
        <div ref={ref} className="flex flex-col p-4">
            <h1 className="text-4xl font-semibold text-center mb-4 mt-16">Bill</h1>

            {/* Menampilkan setiap item */}
            {selectedItems.map(item => (
                <div className="text-3xl flex justify-between mb-4 mx-8" key={item.id}>
                    <p>{item.name}</p>
                    <p>
                        {item.quantity > 1 && `x${item.quantity} `}
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                </div>
            ))}

            {/* Menampilkan total harga */}
            <div className="text-3xl font-semibold flex justify-between mt-8 mx-8 border-t pt-4">
                <p>Total</p>
                <p>Rp {totalPrice.toLocaleString('id-ID')}</p>
            </div>
        </div>
    );

})