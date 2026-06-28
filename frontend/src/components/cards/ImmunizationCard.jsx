import Card from "../ui/Card";


function ImmunizationCard({

    child,

    vaccines,

    nextVaccine,

    nextDate,

    status,

    progress

}) {
    return (

        <Card
    id="immunization-card"
    className="max-w-5xl mx-auto bg-white border-2 border-green-700 rounded-3xl overflow-hidden shadow-xl"
        >

            {/* Header */}

<div className="bg-green-700 text-white text-center py-6">

    <h1 className="text-3xl font-bold">

        KAMPALA CAPITAL CITY AUTHORITY

    </h1>

    <h2 className="text-xl tracking-wide mt-2">

        INFANT IMMUNIZATION RECORD CARD

    </h2>

    <div className="flex justify-between items-center px-8 py-4 border-b">

    <div>

        <strong>Child ID:</strong> {child.unique_code}

    </div>

    <div>

        <strong>Status:</strong>

        <span className="ml-2 text-blue-700 font-bold">

            {status}

        </span>

    </div>

</div>

</div>

            {/* Child Information */}

            <div className="grid grid-cols-2 gap-10 p-8">

    <div>

        <h2 className="text-xl font-bold text-green-700 mb-4">
            Child Information
        </h2>

        <div className="space-y-3">

            <p><strong>Name:</strong> {child.first_name} {child.last_name}</p>

            <p><strong>Gender:</strong> {child.gender}</p>

            <p><strong>Date of Birth:</strong> {new Date(child.date_of_birth).toLocaleDateString()}</p>

            <p><strong>Child ID:</strong> {child.unique_code}</p>

        </div>

    </div>

    <div>

        <h2 className="text-xl font-bold text-green-700 mb-4">
            Caregiver Information
        </h2>

        <div className="space-y-3">

            <p><strong>Name:</strong> {child.caregiver_name}</p>

            <p><strong>Phone:</strong> {child.caregiver_phone}</p>

            <p><strong>Facility:</strong> {child.facility_name}</p>

        </div>

    </div>

</div>

        {/* IMMUNIZATION PROGRESS */}        
<div className="mx-8 mb-8">

    <div className="flex justify-between mb-2">

        <h2 className="text-xl font-bold">

            Immunization Progress

        </h2>

        <span className="font-bold text-green-700">

            {progress.completed} / {progress.total}

        </span>

    </div>

    <div className="w-full bg-gray-200 rounded-full h-5">

        <div

            className="bg-green-600 h-5 rounded-full transition-all"

            style={{

                width: `${progress.percentage}%`

            }}

        >

        </div>

    </div>

    <p className="mt-2 text-gray-600">

        {progress.percentage}% Complete

    </p>

</div>



{/* Next Appointment */}

<div className="mx-8 my-8 bg-green-50 border-2 border-green-600 rounded-3xl p-8 text-center">

    <h2 className="text-5xl font-bold text-blue-700">

        NEXT APPOINTMENT

    </h2>

    <div className="mt-6">

        <p className="text-gray-500">

            Next Vaccine

        </p>

        <h2 className="text-4xl font-bold">

            {nextVaccine || "Fully Immunized"}

        </h2>

    </div>

    <div className="mt-6">

        <p className="text-gray-500">

            Return Date

        </p>

        <h2 className="text-4xl font-bold text-red-600">

            {nextDate || "-"}

        </h2>

    </div>

</div>            


                {/* Vaccination History */}

            <div className="px-8 pb-8">

                <h2 className="text-2xl font-bold text-green-700 mb-5">

                    Vaccination Record

                </h2>

                <table className="w-full border rounded-xl overflow-hidden">

                    <thead className="bg-green-700 text-white">

<tr>

<th className="p-3">

Vaccine

</th>

<th>

Dose

</th>

<th>

Date Given

</th>

<th>

Status

</th>

</tr>

</thead>
                    <tbody>

{

vaccines.map((v,index)=>(

<tr

key={index}

className={

index%2===0

?

"bg-gray-50"

:

"bg-white"

}

>

<td className="p-3">

{v.vaccine_name}

</td>

<td className="text-center">

{v.dose_number}

</td>

<td className="text-center">

{

v.vaccination_date

?

new Date(

v.vaccination_date

).toLocaleDateString()

:

"-"

}

</td>

<td className="text-center font-semibold">

{

v.vaccination_date

?

<span className="text-green-600">

✓ Completed

</span>

:

<span className="text-red-500">

○ Pending

</span>

}

</td>

</tr>

))

}

</tbody>
                </table>

            </div>

            {/* Footer */}

            <div className="bg-gray-100 px-8 py-5">

    <h3 className="font-bold mb-3">

            REMINDER TO CAREGIVER

    </h3>

    <ul className="list-disc ml-6 space-y-1 text-gray-700">

        <li>Bring this card during every clinic visit.</li>

        <li>Follow the return appointment shown above.</li>

        <li>Keep this card safely.</li>

    </ul>

</div>

       
        </Card>

    );

}

export default ImmunizationCard;