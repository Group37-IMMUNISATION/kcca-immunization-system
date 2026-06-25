function PageContainer({

    title,

    subtitle,

    children

}) {

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    {title}

                </h1>

                <p className="text-gray-500 mt-2">

                    {subtitle}

                </p>

            </div>

            {children}

        </div>

    );

}

export default PageContainer;