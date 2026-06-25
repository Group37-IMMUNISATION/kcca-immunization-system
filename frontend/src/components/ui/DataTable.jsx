import { Search } from "lucide-react";
import { useState } from "react";

function DataTable({

    columns,

    data,

    actions

}) {

    const [search,setSearch]=useState("");

    const filtered=data.filter(row=>

        JSON.stringify(row)

        .toLowerCase()

        .includes(search.toLowerCase())

    );

    return(

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Header */}

            <div className="flex justify-between items-center p-6 border-b">

                <h2 className="text-2xl font-bold">

                    Records

                </h2>

                <div className="relative">

                    <Search

                        className="absolute left-3 top-3 text-gray-400"

                        size={18}

                    />

                    <input

                        placeholder="Search..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                        className="pl-10 pr-4 py-3 rounded-xl border w-72"

                    />

                </div>

            </div>

            {/* Table */}

            <table className="w-full">

                <thead className="bg-blue-700 text-white">

                    <tr>

                        {

                            columns.map(col=>(

                                <th

                                    key={col.accessor}

                                    className="text-left p-4"

                                >

                                    {col.label}

                                </th>

                            ))

                        }

                        {

                            actions &&

                            <th className="p-4">

                                Actions

                            </th>

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        filtered.map((row,index)=>(

                            <tr

                                key={index}

                                className="border-b hover:bg-blue-50"

                            >

                                {

                                    columns.map(col=>(

                                        <td

                                            key={col.accessor}

                                            className="p-4"

                                        >

                                            {

                                                row[col.accessor]

                                            }

                                        </td>

                                    ))

                                }

                                {

                                    actions &&

                                    <td className="p-4">

                                        {

                                            actions(row)

                                        }

                                    </td>

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;