import Card from "../ui/Card";
import { Search, Download } from "lucide-react";

function ActivityFilterBar({

    search,
    setSearch,

    activityType,
    setActivityType,

    facility,
    setFacility,

    date,
    setDate,

    facilities

}) {

    return (

        <Card>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        className="absolute left-4 top-4 text-gray-400"
                        size={18}
                    />

                    <input

                        value={search}

                        onChange={(e)=>
                            setSearch(e.target.value)
                        }

                        placeholder="Search activity..."

                        className="w-full pl-11 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"

                    />

                </div>

                {/* Facility */}

                <select

    value={facility}

    onChange={(e)=>setFacility(e.target.value)}

    className="border rounded-2xl px-4 py-3"

>

    <option value="">

        All Facilities

    </option>

    {

        facilities.map((facilityName)=>(

            <option

                key={facilityName}

                value={facilityName}

            >

                {facilityName}

            </option>

        ))

    }

</select>

                {/* Activity */}

                <select

                    value={activityType}

                    onChange={(e)=>
                        setActivityType(e.target.value)
                    }

                    className="border rounded-2xl px-4 py-3"

                >

                    <option value="">

                        All Activities

                    </option>

                    <option value="Registration">

                        Registration

                    </option>

                    <option value="Immunization">

                        Immunization

                    </option>

                    <option value="Stock">

                        Stock

                    </option>

                </select>

                {/* Date */}

                <input

                    type="date"

                    value={date}

                    onChange={(e)=>
                        setDate(e.target.value)
                    }

                    className="border rounded-2xl px-4 py-3"

                />

                {/* Export */}

                <button

                    className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl flex items-center justify-center gap-2"

                >

                    <Download size={18}/>

                    Export

                </button>

            </div>

        </Card>

    );

}

export default ActivityFilterBar;