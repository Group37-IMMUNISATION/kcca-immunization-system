import { CalendarDays, Building2, ShieldCheck } from "lucide-react";
import { getRoleName } from "../../utils/roles";

function HeroBanner({

    user,

    background

}) {

    return (

        <div

            className="relative rounded-3xl overflow-hidden shadow-xl"

            style={{

                backgroundImage: `url(${background})`,

                backgroundSize: "cover",

                backgroundPosition: "center"

            }}

        >

            <div className="absolute inset-0 bg-blue-900/75"></div>

            <div className="relative z-10 p-10 text-white">

                <h2 className="text-2xl font-semibold">

                    👋 Welcome Back,

                </h2>

                <h1 className="text-5xl font-bold mt-2">

                    {user?.full_name}

                </h1>

                <p className="text-blue-100 mt-2 text-lg">

                    KCCA Infant Immunization Record Management System

                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">

                        <Building2 />

                        <div>

                            <p className="text-sm text-blue-100">

                                Facility

                            </p>

                            <h3 className="font-semibold">

                                {user?.facility_name || "All Facilities"}

                            </h3>

                        </div>

                    </div>

                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">

                        <ShieldCheck />

                        <div>

                            <p className="text-sm text-blue-100">

                                Role

                            </p>

                            <h3 className="font-semibold">
                            
                            {getRoleName(user?.role_id)}

                            </h3>

                        </div>

                    </div>

                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">

                        <CalendarDays />

                        <div>

                            <p className="text-sm text-blue-100">

                                Today

                            </p>

                            <h3 className="font-semibold">

                                {

                                    new Date().toLocaleDateString(

                                        "en-GB",

                                        {

                                            weekday:"long",

                                            day:"numeric",

                                            month:"long",

                                            year:"numeric"

                                        }

                                    )

                                }

                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HeroBanner;