import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ImmunizationCard from "../components/cards/ImmunizationCard";

function PrintVaccinationCard() {

    const { child_id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchCard = async () => {

            try {

                const res = await API.get(`/immunizations/card/${child_id}`);

                setData(res.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchCard();

    }, [child_id]);

    useEffect(() => {

        if (data) {

            const timer = setTimeout(() => {

                window.print();

            }, 500);

            return () => clearTimeout(timer);

        }

    }, [data]);

    if (!data) {

        return (

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }

    return (

        <div className="bg-white p-8">

            <ImmunizationCard
    child={data.child}
    vaccines={[
        ...data.completed,
        ...data.pending
    ]}
    nextVaccine={
        data.nextVaccine
            ? `${data.nextVaccine.vaccine_name} Dose ${data.nextVaccine.dose_number}`
            : null
    }
    nextDate={data.nextDate}
    status={data.status}
    progress={data.progress}
/>

        </div>

    );

}

export default PrintVaccinationCard;