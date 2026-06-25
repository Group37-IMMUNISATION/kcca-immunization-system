import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ModuleCard({

    title,

    description,

    icon,

    color = "blue",

    link

}) {

    const colors = {

        blue: {
            bg: "from-blue-500 to-blue-700",
            light: "bg-blue-100",
            text: "text-blue-700"
        },

        green: {
            bg: "from-green-500 to-green-700",
            light: "bg-green-100",
            text: "text-green-700"
        },

        purple: {
            bg: "from-purple-500 to-purple-700",
            light: "bg-purple-100",
            text: "text-purple-700"
        },

        orange: {
            bg: "from-orange-500 to-orange-700",
            light: "bg-orange-100",
            text: "text-orange-700"
        },

        red: {
            bg: "from-red-500 to-red-700",
            light: "bg-red-100",
            text: "text-red-700"
        },

        indigo: {
            bg: "from-indigo-500 to-indigo-700",
            light: "bg-indigo-100",
            text: "text-indigo-700"
        }

    };

    const theme = colors[color];

    return (

        <motion.div

            whileHover={{

                y:-6,

                scale:1.02

            }}

            transition={{

                duration:.25

            }}

        >

            <Link to={link}>

                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden">

                    <div className={`h-2 bg-gradient-to-r ${theme.bg}`}></div>

                    <div className="p-6">

                        <div className={`${theme.light} h-16 w-16 rounded-2xl flex items-center justify-center mb-5`}>

                            <div className={theme.text}>

                                {icon}

                            </div>

                        </div>

                        <h2 className="text-xl font-bold text-slate-800">

                            {title}

                        </h2>

                        <p className="text-gray-500 mt-3 leading-relaxed">

                            {description}

                        </p>

                        <div className={`mt-6 flex items-center gap-2 font-semibold ${theme.text}`}>

                            Open Module

                            <ArrowRight size={18}/>

                        </div>

                    </div>

                </div>

            </Link>

        </motion.div>

    );

}

export default ModuleCard;