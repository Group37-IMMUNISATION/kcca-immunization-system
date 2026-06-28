import Card from "../ui/Card";
import { Activity } from "lucide-react";

function RecentActivity({ activities = [] }) {

    return (

        <Card>

            <div className="flex items-center gap-3 mb-6">

                <Activity className="text-blue-700" />

                <h2 className="text-2xl font-bold">

                    Recent Activity

                </h2>

            </div>

            <div className="space-y-4">

                {activities.length === 0 ? (

                    <p className="text-gray-500">

                        No recent activity.

                    </p>

                ) : (

                    activities.map((item, index) => (

                        <div
                            key={index}
                            className="border-l-4 border-blue-600 pl-4 py-2"
                        >

                            <p className="font-semibold">

                                {item.first_name} {item.last_name} received {item.vaccine_name}

                            </p>

                            <p className="text-gray-500 text-sm">

                                {item.facility_name}

                            </p>

                            <p className="text-xs text-gray-400">

                                {new Date(item.vaccination_date).toLocaleString()}

                            </p>

                        </div>

                    ))

                )}

            </div>

        </Card>

    );

}

export default RecentActivity;