import { useEffect, useState } from 'react';
import API from '../services/api';
import MainLayout from '../layouts/MainLayout';

function VaccineStock() {

    const [stock, setStock] = useState([]);

    const [facilities, setFacilities] = useState([]);

    const [selectedFacility, setSelectedFacility] = useState('');

    const [selectedStock, setSelectedStock] = useState(null);

    const [quantityToAdd, setQuantityToAdd] = useState('');

    useEffect(() => {

        fetchFacilities();

    }, []);

    useEffect(() => {

        if (selectedFacility) {

            fetchStock();
        }

    }, [selectedFacility]);

    const fetchFacilities = async () => {

        try {

            const response =
                await API.get('/facilities');

            setFacilities(response.data);

            if (response.data.length > 0) {

                setSelectedFacility(
                    response.data[0].facility_id
                );
            }

        } catch (error) {

            console.error(error);
        }
    };

    const fetchStock = async () => {

        try {

            const response = await API.get(
                `/stock?facility_id=${selectedFacility}`
            );

            setStock(response.data);

        } catch (error) {

            console.error(error);
        }
    };


    const addStock = async () => {

    try {

        await API.put(
            '/stock/add',
            {
                stock_id: selectedStock.stock_id,
                quantity: Number(quantityToAdd)
            }
        );

        alert('Stock updated successfully');

        setSelectedStock(null);

        setQuantityToAdd('');

        fetchStock();

    } catch (error) {

        console.error(error);

        alert('Failed to update stock');
    }
};



    return (


        
        <MainLayout>

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold mb-6">

                        Vaccine Stock Dashboard

                    </h2>

                    <div className="bg-white rounded-lg shadow overflow-hidden">

<select

    value={selectedFacility}

    onChange={(e) =>
        setSelectedFacility(e.target.value)
    }

    className="border p-3 rounded mb-6"
>

    {facilities.map((facility) => (

        <option
            key={facility.facility_id}
            value={facility.facility_id}
        >

            {facility.facility_name}

        </option>

    ))}

</select>

                        <table className="w-full">

                            <thead className="bg-blue-600 text-white">

                                <tr>

                                    <th className="p-4 text-left">
                                        Vaccine
                                    </th>

                                    <th className="p-4 text-left">
                                        Available Doses
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {stock.map((item) => (

                                    <tr
                                        key={item.stock_id}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {item.vaccine_name}
                                        </td>

                                        <td className="p-4">

                            {item.quantity_available}

                    <button

                            onClick={() => setSelectedStock(item)}

                            className="ml-4 bg-blue-600 text-white px-3 py-1 rounded"
                         >

                            Add Stock

                    </button>
                </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        {selectedStock && (

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                <div className="bg-white p-6 rounded-lg w-96">

                    <h3 className="text-xl font-bold mb-4">
                        Add Stock
                    </h3>

                    <p className="mb-4">
                        Vaccine: {selectedStock.vaccine_name}
                    </p>

                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantityToAdd}
                        onChange={(e) =>
                            setQuantityToAdd(e.target.value)
                        }
                        className="border p-3 w-full mb-4"
                    />

                    <div className="flex gap-3">

                        <button
                            onClick={addStock}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setSelectedStock(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        )}

    </MainLayout>

    );
}

export default VaccineStock;