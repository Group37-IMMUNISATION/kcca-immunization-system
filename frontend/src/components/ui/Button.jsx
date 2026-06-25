import { motion } from "framer-motion";

function Button({

    children,

    onClick,

    type = "button",

    className = "",

    disabled = false

}) {

    return (

        <motion.button

            whileHover={{

                scale: 1.03

            }}

            whileTap={{

                scale: .97

            }}

            disabled={disabled}

            type={type}

            onClick={onClick}

            className={`

                bg-gradient-to-r

                from-blue-700

                via-blue-600

                to-cyan-600

                hover:from-blue-800

                hover:to-cyan-700

                text-white

                rounded-2xl

                px-6

                py-3

                font-semibold

                shadow-lg

                hover:shadow-xl

                transition-all

                duration-300

                disabled:opacity-50

                ${className}

            `}

        >

            {children}

        </motion.button>

    );

}

export default Button;