import Card from "../ui/Card";

import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell

} from "recharts";

const COLORS = [

    "#0056A6",
    "#009688",
    "#F59E0B",
    "#22C55E",
    "#7C3AED"

];

function DashboardCharts({

    monthlyImmunizations,

    vaccineCoverage

}) {

    return (

        <div className="grid lg:grid-cols-2 gap-8">

            <Card>

                <h2 className="text-2xl font-bold mb-6">

                    📈 Monthly Immunizations

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <BarChart
                        data={monthlyImmunizations}
                    >

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Bar

                            dataKey="total"

                            radius={[8,8,0,0]}

                            fill="#0056A6"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </Card>

            <Card>

                <h2 className="text-2xl font-bold mb-6">

                    💉 Vaccine Coverage

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <PieChart>

                        <Pie

                            data={vaccineCoverage}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={110}

                            label

                        >

                            {

                                vaccineCoverage.map(

                                    (entry,index)=>(

                                        <Cell

                                            key={index}

                                            fill={

                                                COLORS[
                                                    index %
                                                    COLORS.length
                                                ]

                                            }

                                        />

                                    )

                                )

                            }

                        </Pie>

                        <Tooltip/>

                    </PieChart>

                </ResponsiveContainer>

            </Card>

        </div>

    );

}

export default DashboardCharts;