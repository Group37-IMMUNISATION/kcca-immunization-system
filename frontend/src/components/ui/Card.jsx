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
                    ? {
                        y: -6,
                        scale: 1.01
                    }
                    : {}
            }

            transition={{
                duration: 0.25
            }}

            className={`
                relative

                overflow-hidden

                rounded-3xl

                bg-white/90

                backdrop-blur-md

                border

                border-white/70

                shadow-xl

                hover:shadow-2xl

                transition-all

                duration-300

                ${className}
            `}
        >

            {/* Decorative Top Border */}

            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 via-cyan-500 to-green-500"></div>

            <div className="p-6">

                {children}

            </div>

        </motion.div>

    );

}

export default Card;