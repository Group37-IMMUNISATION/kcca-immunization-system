function Badge({

    color = "blue",

    children

}) {

    const colors = {

        blue: "bg-blue-100 text-blue-700",

        green: "bg-green-100 text-green-700",

        red: "bg-red-100 text-red-700",

        orange: "bg-orange-100 text-orange-700",

        gray: "bg-gray-100 text-gray-700"

    };

    return (

        <span

            className={`
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold

                ${colors[color]}
            `}
        >

            {children}

        </span>

    );

}

export default Badge;