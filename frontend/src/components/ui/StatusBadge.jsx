function StatusBadge({

    status

}) {

    const badges = {

        "Fully Immunized": {
            bg: "bg-green-100",
            text: "text-green-700",
            dot: "bg-green-500"
        },

        "Partially Immunized": {
            bg: "bg-yellow-100",
            text: "text-yellow-700",
            dot: "bg-yellow-500"
        },

        "Not Started": {
            bg: "bg-red-100",
            text: "text-red-700",
            dot: "bg-red-500"
        },

        "Low Stock": {
            bg: "bg-orange-100",
            text: "text-orange-700",
            dot: "bg-orange-500"
        },

        "Out of Stock": {
            bg: "bg-red-100",
            text: "text-red-700",
            dot: "bg-red-500"
        },

        "In Stock": {
            bg: "bg-green-100",
            text: "text-green-700",
            dot: "bg-green-500"
        }

    };

    const badge = badges[status] || {

        bg: "bg-gray-100",

        text: "text-gray-700",

        dot: "bg-gray-500"

    };

    return (

        <span className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            ${badge.bg}
            ${badge.text}
        `}>

            <span
                className={`
                    h-2.5
                    w-2.5
                    rounded-full
                    ${badge.dot}
                `}
            ></span>

            {status}

        </span>

    );

}

export default StatusBadge;