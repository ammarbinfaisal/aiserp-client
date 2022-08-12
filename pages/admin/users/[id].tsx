import { useFetch } from "../../../lib/fetch";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Space from "../../../components/Space";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loader from "../../../components/Loader";
import { AnimatePresence } from "framer-motion";

const ViewUser = dynamic(() => import("../../../components/users/ViewUser"), {
    suspense: true,
});

const DeleteUser = dynamic(
    () => import("../../../components/users/DeleteUser"),
    {
        suspense: true,
    }
);

const EditUser = dynamic(() => import("../../../components/users/EditUser"), {
    suspense: true,
});

const User = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<any>({});
    const [title, setTitle] = useState("User");
    const { data } = useFetch(id ? `/api/get/user/${id}` : "");

    useEffect(() => {
        if (data.user) {
            setUser(data.user);
            setTitle(`User | ${data.user.name}`);
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminDashContainer>
                <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
                    {user.id ? (
                        <>
                            <AnimatePresence exitBeforeEnter>
                                <Suspense fallback={<Loader />}>
                                    <ViewUser user={user} />
                                </Suspense>
                            </AnimatePresence>
                            <Space size={1} />
                            <hr />
                            <Space size={1} />
                            <AnimatePresence exitBeforeEnter>
                                <Suspense fallback={<Loader />}>
                                    <EditUser user={user} />
                                </Suspense>
                            </AnimatePresence>
                            <Space size={1} />
                            <hr />
                            <Space size={1} />
                            <AnimatePresence exitBeforeEnter>
                                <Suspense fallback={<Loader />}>
                                    <DeleteUser user={user} />
                                </Suspense>
                            </AnimatePresence>
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            </AdminDashContainer>
        </>
    );
};

export default User;
