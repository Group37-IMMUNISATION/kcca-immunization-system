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
                scale: 1.02
            }}

            whileTap={{
                scale: .98
            }}

            disabled={disabled}

            type={type}

            onClick={onClick}

            className={`
                bg-gradient-to-r
                from-blue-700
                to-blue-500
                hover:from-blue-800
                hover:to-blue-600

                text-white

                rounded-xl

                px-6

                py-3

                font-semibold

                shadow-lg

                disabled:opacity-50

                ${className}
            `}
        >

            {children}

        </motion.button>

    );

}

export default Button;