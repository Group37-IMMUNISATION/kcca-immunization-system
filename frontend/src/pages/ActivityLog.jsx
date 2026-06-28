import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import ActivityStatCard from "../components/activity/ActivityStatCard";
import ActivityTimeline from "../components/activity/ActivityTimeline";
import { useEffect, useState } from "react";
import API from "../services/api";
import ActivityFilterBar from "../components/activity/ActivityFilterBar";

import {
    Activity,
    Search,
    Download,
    Syringe,
    Baby,
    Package
} from "lucide-react";


function ActivityLog() {

    const [activities, setActivities] = useState([]);

    const [search, setSearch] = useState("");

    const [activityType, setActivityType] = useState("");

    const [facility, setFacility] = useState("");

    const [date, setDate] = useState("");

    const facilities = [

    ...new Set(

        activities.map(

            (a) => a.facility_name

        )

    )

];

    const filteredActivities = activities.filter((activity) => {

    const matchesSearch =

        activity.description
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        activity.facility_name
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchesType =

        activityType === "" ||

        activity.activity_type === activityType;

    const matchesFacility =

        facility === "" ||

        activity.facility_name === facility;

    const matchesDate =

        date === "" ||

        new Date(activity.activity_time)
            .toISOString()
            .split("T")[0] === date;

    return (

        matchesSearch &&
        matchesType &&
        matchesFacility &&
        matchesDate

    );

});

    const fetchActivities = async () => {

    try {

        const res = await API.get("/activity/log");

        setActivities(res.data);

    } catch (err) {

        console.error(err);

    }

};

useEffect(() => {

    fetchActivities();

}, []);

    return (

        <MainLayout>

            <div className="min-h-screen bg-slate-50">

                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Header */}

                    <Card>

                        <div className="flex items-center justify-between">

                            <div>

                                <h1 className="text-4xl font-bold text-slate-800">

                                    📜 Activity Log

                                </h1>

                                <p className="text-gray-500 mt-2">

                                    Monitor all activities performed across KCCA health facilities.

                                </p>

                            </div>

                            <Activity
                                size={48}
                                className="text-blue-700"
                            />

                        </div>

                    </Card>

                    {/* Summary Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <ActivityStatCard
                            title="Today's Activities"
                            value="38"
                            icon={<Activity size={30} />}
                            color="bg-blue-600"
                        />

                        <ActivityStatCard
                            title="Immunizations"
                            value="24"
                            icon={<Syringe size={30} />}
                            color="bg-green-600"
                        />

                        <ActivityStatCard
                            title="Registrations"
                            value="8"
                            icon={<Baby size={30} />}
                            color="bg-purple-600"
                        />

                        <ActivityStatCard
                            title="Stock Updates"
                            value="6"
                            icon={<Package size={30} />}
                            color="bg-orange-500"
                        />

                    </div>

                    {/* Filter Bar */}

                    <ActivityFilterBar

    search={search}

    setSearch={setSearch}

    activityType={activityType}

    setActivityType={setActivityType}

    facility={facility}

    setFacility={setFacility}

    date={date}

    setDate={setDate}

     facilities={facilities}

/>
                    {/* Timeline */}

                    <ActivityTimeline
                        activities={filteredActivities}
                    />

                </div>

            </div>

        </MainLayout>

    );

}

export default ActivityLog;