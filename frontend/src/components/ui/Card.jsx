import { motion } from "framer-motion";

function Card({
    children,
    className = "",
    hover = true
}) {

    return (

        <motion.div

            whileHover={
                hover
                    ? { y: -4, scale: 1.01 }
                    : {}
            }

            transition={{
                duration: .2
            }}

            className={`
                bg-white
                rounded-3xl
                shadow-lg
                border
                border-gray-100
                p-6
                ${className}
            `}
        >

            {children}

        </motion.div>

    );

}

export default Card;