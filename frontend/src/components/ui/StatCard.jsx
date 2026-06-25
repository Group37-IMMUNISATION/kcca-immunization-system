import Card from "./Card";

function StatCard({

    title,

    value,

    icon,

    color = "text-blue-700"

}) {

    return (

        <Card>

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h2 className={`text-4xl font-bold mt-3 ${color}`}>

                        {value}

                    </h2>

                </div>

                <div className="text-5xl">

                    {icon}

                </div>

            </div>

        </Card>

    );

}

export default StatCard;