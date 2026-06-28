import Card from "../ui/Card";

function ActivityStatCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <Card className="hover:shadow-xl transition">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div
                    className={`h-16 w-16 rounded-2xl flex items-center justify-center text-white ${color}`}
                >

                    {icon}

                </div>

            </div>

        </Card>

    );

}

export default ActivityStatCard;