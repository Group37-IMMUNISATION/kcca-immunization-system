import Card from "../ui/Card";
import {
    Syringe,
    UserPlus,
    Package,
    Clock,
    MapPin
} from "lucide-react";

const formatActivityDate = (date) => {

    const activityDate = new Date(date);

    const today = new Date();

    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (
        activityDate.toDateString() ===
        today.toDateString()
    ) {

        return `Today • ${activityDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}`;

    }

    if (
        activityDate.toDateString() ===
        yesterday.toDateString()
    ) {

        return `Yesterday • ${activityDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}`;

    }

    return activityDate.toLocaleDateString("en-GB", {

        day: "numeric",

        month: "short",

        year: "numeric"

    }) +

    " • " +

    activityDate.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

};

function ActivityTimeline({ activities = [] }) {

    const getIcon = (type) => {

        switch (type) {

            case "Immunization":
                return (
                    <Syringe
                        size={20}
                        className="text-green-600"
                    />
                );

            case "Registration":
                return (
                    <UserPlus
                        size={20}
                        className="text-blue-600"
                    />
                );

            case "Stock":
                return (
                    <Package
                        size={20}
                        className="text-orange-600"
                    />
                );

            default:
                return (
                    <Clock
                        size={20}
                        className="text-gray-600"
                    />
                );

        }

    };

    const getBadge = (type) => {

        switch (type) {

            case "Immunization":
                return "bg-green-100 text-green-700";

            case "Registration":
                return "bg-blue-100 text-blue-700";

            case "Stock":
                return "bg-orange-100 text-orange-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    if (activities.length === 0) {

        return (

            <Card>

                <div className="text-center py-20">

                    <Clock
                        size={60}
                        className="mx-auto text-gray-300"
                    />

                    <h2 className="text-2xl font-bold mt-4">

                        No Activity Found

                    </h2>

                    <p className="text-gray-500 mt-2">

                        System activities will appear here automatically.

                    </p>

                </div>

            </Card>

        );

    }

    return (

        <Card>

            <h2 className="text-2xl font-bold mb-8">

                System Timeline

            </h2>

            <div className="space-y-6">

                {

                    activities.map((activity, index) => (

                        <div

                            key={index}

                            className="flex gap-5 border rounded-2xl p-5 hover:shadow-lg transition"

                        >

                            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">

                                {

                                    getIcon(
                                        activity.activity_type
                                    )

                                }

                            </div>

                            <div className="flex-1">

                                <div className="flex items-center justify-between">

                                    <h3 className="font-semibold text-lg">

                                        {

                                            activity.description

                                        }

                                    </h3>

                                    <span

                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadge(activity.activity_type)}`}

                                    >

                                        {

                                            activity.activity_type

                                        }

                                    </span>

                                </div>

                                <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">

                                    <div className="flex items-center gap-2">

                                        <MapPin size={15}/>

                                        {

                                            activity.facility_name

                                        }

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <Clock size={15}/>

                                        {formatActivityDate(
                                            activity.activity_time
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}

export default ActivityTimeline;