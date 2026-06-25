import { motion } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="flex">

                {/* Sidebar */}

                <Sidebar />

                {/* Right Side */}

                <div className="flex-1 flex flex-col min-h-screen">

                    {/* Top Navigation */}

                    <div className="sticky top-0 z-40 p-6 pb-0">

                        <Topbar />

                    </div>

                    {/* Main Page */}

                    <motion.main

                        initial={{
                            opacity:0,
                            y:15
                        }}

                        animate={{
                            opacity:1,
                            y:0
                        }}

                        transition={{
                            duration:.35
                        }}

                        className="flex-1 p-6"
                    >

                        <div className="max-w-[1700px] mx-auto">

                        <div className="space-y-6">

    {children}

</div>

</div>

</motion.main>

<footer className="px-6 pb-6">

    <div className="bg-white rounded-3xl shadow-md border border-slate-200 px-8 py-5 flex flex-col md:flex-row items-center justify-between">

        <div>

            <h3 className="font-semibold text-slate-700">

                KCCA Infant Immunization Record Management System

            </h3>

            <p className="text-sm text-slate-500">

                Version 2.0 • Kampala Capital City Authority

            </p>

        </div>

        <div className="text-sm text-slate-500 mt-3 md:mt-0">

            © 2026 All Rights Reserved

        </div>

    </div>

</footer>

</div>

</div>

</div>

);

}

export default MainLayout;