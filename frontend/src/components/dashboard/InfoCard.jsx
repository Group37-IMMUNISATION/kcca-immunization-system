import { motion } from "framer-motion";

function InfoCard({

    title,

    value,

    subtitle,

    icon,

    color = "blue"

}) {

    const colors = {

        blue: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            circle: "bg-blue-100"
        },

        green: {
            bg: "bg-green-50",
            text: "text-green-700",
            circle: "bg-green-100"
        },

        red: {
            bg: "bg-red-50",
            text: "text-red-700",
            circle: "bg-red-100"
        },

        orange: {
            bg: "bg-orange-50",
            text: "text-orange-700",
            circle: "bg-orange-100"
        }

    };

    const theme = colors[color];

    return (

        <motion.div

            whileHover={{
                y: -5,
                scale: 1.02
            }}

            transition={{
                duration: .2
            }}

            className={`

                ${theme.bg}

                rounded-3xl

                shadow-lg

                p-6

                border

                border-white

            `}
        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className={`

                        text-4xl

                        font-bold

                        mt-3

                        ${theme.text}

                    `}>

                        {value}

                    </h2>

                    <p className="text-gray-500 mt-4">

                        {subtitle}

                    </p>

                </div>

                <div className={`

                    h-16

                    w-16

                    rounded-full

                    flex

                    items-center

                    justify-center

                    ${theme.circle}

                `}>

                    {icon}

                </div>

            </div>

        </motion.div>

    );

}

export default InfoCard;