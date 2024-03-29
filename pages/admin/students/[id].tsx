import { useFetch } from "../../../lib/fetch";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loader from "../../../components/Loader";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import dynamic from "next/dynamic";

const ViewStudent = dynamic(
    () => import("../../../components/students/ViewStudent"),
    {
        suspense: true,
    }
);

const Student = () => {
    const router = useRouter();
    const { id } = router.query;
    const [student, setStudent] = useState<any>({});
    const [title, setTitle] = useState("Student");
    const { data, status } = useFetch(
        typeof id === "string" ? `/api/get/students/${id}` : ""
    );

    useEffect(() => {
        if (data?.student) {
            setStudent(data.student);
            setTitle(`Student | ${data.student.profile.name}`);
        }
    }, [data]);

    if (status === 400) {
        return (
            <AdminDashContainer>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <p>student not found</p>
                </div>
            </AdminDashContainer>
        );
    }

    if (!student.id) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <Suspense fallback={<Loader />}>
                    <ViewStudent {...student} />
                </Suspense>
            </div>
        </>
    );
};

Student.getLayout = (page: any) => (
    <AdminDashContainer>{page}</AdminDashContainer>
);

export default Student;
