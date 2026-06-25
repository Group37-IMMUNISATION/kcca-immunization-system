import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

import Card from "../components/ui/Card";
import StatusBadge from "../components/ui/StatusBadge";

import {
    Search,
    Users,
    Pencil,
    Syringe,
    Printer,
    UserRound
} from "lucide-react";


function SearchChild() {

    const navigate = useNavigate();

const token = localStorage.getItem("token");

const currentUser =
    token
        ? jwtDecode(token)
        : null;

const [query, setQuery] = useState("");

const [results, setResults] = useState([]);

const [editingChild, setEditingChild] = useState(null);

const [immunizationChild, setImmunizationChild] = useState(null);

const [selectedVaccine, setSelectedVaccine] = useState("");

const [remarks, setRemarks] = useState("");

const [editForm, setEditForm] = useState({

    caregiver_name: "",

    phone_number: "",

    address: "",

    birth_facility: ""

});

    const handleSearch = async () => {

        try {

            const response = await API.get(
                `/children/search?query=${query}`
            );

            setResults(response.data);

        } catch (error) {

            console.error(error);

            alert('Search failed');
        }
    };

        const handleEdit = (child) => {

    setEditingChild(child);

    setEditForm({

        caregiver_name: child.caregiver_name,

        phone_number: child.phone_number,

        address: child.address || '',

        birth_facility: child.birth_facility
    });
};


const saveChanges = async () => {

    try {

        await API.put(

            `/children/${editingChild.child_id}`,

            editForm
        );

        alert('Child updated successfully');

        setEditingChild(null);

        handleSearch();

    } catch (error) {

        console.error(error);

        alert('Update failed');
    }
};

const handleImmunization = (child) => {

    setImmunizationChild(child);

    if (child.dueVaccines?.length > 0) {

        setSelectedVaccine(
            child.dueVaccines[0].vaccine_id
        );
    }
};

const saveImmunization = async () => {

    try {

        await API.post(
    '/immunizations/record',
    {
        child_id:
            immunizationChild.child_id,

        vaccine_id:
            selectedVaccine,

        vaccination_date:
            new Date()
                .toISOString()
                .split('T')[0],

        remarks
    }
);
        alert(
            'Immunization recorded successfully'
        );

        setImmunizationChild(null);

        handleSearch();

    } catch (error) {

        console.error(error);

        alert(
            'Failed to record immunization'
        );
    }
};

return (

<MainLayout>

<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">

<div className="max-w-7xl mx-auto">

{/* ================= HERO ================= */}

<Card className="mb-8">

<div className="flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold text-slate-800">

👶 Child Management

</h1>

<p className="text-gray-500 mt-2">

Search, update and manage registered children across KCCA health facilities.

</p>

</div>

<div className="hidden md:flex h-20 w-20 rounded-full bg-blue-100 items-center justify-center">

<Users

size={42}

className="text-blue-700"

/>

</div>

</div>

</Card>

{/* ================= SEARCH ================= */}

<Card className="mb-8">

<div className="flex flex-col md:flex-row gap-4">

<div className="relative flex-1">

<Search

size={20}

className="absolute left-4 top-4 text-gray-400"

/>

<input

type="text"

placeholder="Search by child name, code or caregiver phone..."

value={query}

onChange={(e)=>setQuery(e.target.value)}

className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"

/>

</div>

<button

onClick={handleSearch}

className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl"

>

Search

</button>

</div>

</Card>

{/* ================= RESULTS ================= */}

<div className="space-y-6">

{results.map(child=>(

<Card

key={child.child_id}

>

<div className="flex flex-col lg:flex-row justify-between gap-6">

<div className="flex-1">

<div className="flex justify-between items-start">

<div>

<h2 className="text-3xl font-bold">

👶 {child.first_name} {child.last_name}

</h2>

<p className="text-gray-500 mt-1">

Code:

<span className="text-blue-700 font-semibold">

{" "}

{child.unique_code}

</span>

</p>

</div>

<StatusBadge

status={child.immunization_status}

/>

</div>

<div className="grid md:grid-cols-2 gap-5 mt-6">

<div>

<p className="text-gray-500">

Gender

</p>

<h4 className="font-semibold">

{child.gender}

</h4>

</div>

<div>

<p className="text-gray-500">

Caregiver

</p>

<h4 className="font-semibold">

{child.caregiver_name}

</h4>

</div>

<div>

<p className="text-gray-500">

Phone

</p>

<h4 className="font-semibold">

{child.phone_number}

</h4>

</div>

<div>

<p className="text-gray-500">

Birth Facility

</p>

<h4 className="font-semibold">

{child.birth_facility}

</h4>

</div>

</div>

<h4 className="font-bold mt-8">

Due Vaccines

</h4>

<div className="flex flex-wrap gap-2 mt-3">

{child.dueVaccines?.map(v=>(

<span

key={v.vaccine_id}

className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold"

>

{v.vaccine_name}

{" "}

Dose {v.dose_number}

</span>

))}

</div>

<h4 className="font-bold mt-8">

Immunization History

</h4>

<div className="mt-3 space-y-3">

{

child.history?.length>0

?

child.history.map(record=>(

<div

key={record.immunization_id}

className="relative border-l-4 border-green-500 pl-5 py-2 ml-2"

>

<span className="absolute -left-2 top-3 h-4 w-4 rounded-full bg-green-500"></span>

<div className="font-semibold">

{record.vaccine_name}

{" "}

Dose {record.dose_number}

</div>

<div className="text-gray-500">

{record.vaccination_date}

</div>

</div>

))

:

<p className="text-gray-500">

No immunizations recorded.

</p>

}

</div>

<div className="flex flex-wrap gap-3 mt-8">

<button

onClick={()=>handleEdit(child)}

className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl shadow"

>

<Pencil size={18}/>

Edit

</button>

{[2,3].includes(currentUser?.role_id)&&(

<button

onClick={()=>handleImmunization(child)}

className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"

>

<Syringe size={18}/>

Immunize

</button>

)}

<button

onClick={()=>window.open(`/vaccination-card?child_id=${child.child_id}`,"_blank")}

className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"

>

<Printer size={18}/>

Print Card

</button>

<button

onClick={()=>navigate(`/child-profile/${child.child_id}`)}

className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl shadow"

>

<UserRound size={18}/>

Profile

</button>

</div>

</div>

</div>

</Card>

))}

</div>

{/* ================= EDIT CHILD MODAL ================= */}

{editingChild && (

<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

<Card className="w-full max-w-2xl">

<h2 className="text-3xl font-bold text-slate-800">

✏ Edit Child Record

</h2>

<p className="text-gray-500 mt-2 mb-8">

Update the child's and caregiver's information.

</p>

<div className="grid md:grid-cols-2 gap-5">

<div>

<label className="block text-sm font-medium mb-2">

Caregiver Name

</label>

<input

type="text"

value={editForm.caregiver_name}

onChange={(e)=>

setEditForm({

...editForm,

caregiver_name:e.target.value

})

}

className="w-full rounded-2xl border border-gray-300 px-4 py-3"

/>

</div>

<div>

<label className="block text-sm font-medium mb-2">

Phone Number

</label>

<input

type="text"

value={editForm.phone_number}

onChange={(e)=>

setEditForm({

...editForm,

phone_number:e.target.value

})

}

className="w-full rounded-2xl border border-gray-300 px-4 py-3"

/>

</div>

<div className="md:col-span-2">

<label className="block text-sm font-medium mb-2">

Address

</label>

<input

type="text"

value={editForm.address}

onChange={(e)=>

setEditForm({

...editForm,

address:e.target.value

})

}

className="w-full rounded-2xl border border-gray-300 px-4 py-3"

/>

</div>

<div className="md:col-span-2">

<label className="block text-sm font-medium mb-2">

Birth Facility

</label>

<input

type="text"

value={editForm.birth_facility}

onChange={(e)=>

setEditForm({

...editForm,

birth_facility:e.target.value

})

}

className="w-full rounded-2xl border border-gray-300 px-4 py-3"

/>

</div>

</div>

<div className="flex justify-end gap-4 mt-8">

<button

onClick={()=>

setEditingChild(null)

}

className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl"

>

Cancel

</button>

<button

onClick={saveChanges}

className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl"

>

Save Changes

</button>

</div>

</Card>

</div>

)}

{/* ================= IMMUNIZATION MODAL ================= */}

{immunizationChild && (

<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

<Card className="w-full max-w-lg">

<h2 className="text-3xl font-bold text-slate-800">

💉 Record Immunization

</h2>

<p className="text-gray-500 mt-2 mb-6">

Record today's vaccine administration.

</p>

<select

value={selectedVaccine}

onChange={(e)=>setSelectedVaccine(e.target.value)}

className="w-full rounded-2xl border border-gray-300 px-4 py-3 mb-4"

>

{immunizationChild.dueVaccines?.map(v=>(

<option

key={v.vaccine_id}

value={v.vaccine_id}

>

{v.vaccine_name} Dose {v.dose_number}

</option>

))}

</select>

<textarea

placeholder="Remarks"

value={remarks}

onChange={(e)=>setRemarks(e.target.value)}

className="w-full rounded-2xl border border-gray-300 px-4 py-3 min-h-[120px] mb-6"

/>

<div className="flex justify-end gap-4">

<button

onClick={()=>setImmunizationChild(null)}

className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl"

>

Cancel

</button>

<button

onClick={saveImmunization}

className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl"

>

Save Immunization

</button>

</div>

</Card>

</div>

)}

</div>

</div>

</MainLayout>

);
}

export default SearchChild;