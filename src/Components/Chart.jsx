import { useFirebase } from '../context/firebase'
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

const Chart = () => {

    const firebase = useFirebase();
    const [data, setData] = useState(null)

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (firebase.user) {

            firebase.getUserProjects().then((userProjects) => {
                const matchedProjects = userProjects.docs
                    .filter((doc) => doc.data().userId === firebase.user.uid)
                    .map((doc) => ({ id: doc.id, ...doc.data() }));


                setProjects(matchedProjects);
            })
        }
    }, [firebase.user])


    function formatProjectsForChart(projects) {
        const countByMonth = {};

        projects.forEach(project => {
            const rawDate = project.startDate || project.createdAt?.toDate?.();
            const date = new Date(rawDate);
            if (!date || isNaN(date)) return;

            const month = date.toLocaleString("default", { month: "short" });
            const status = project.status || "completed"; // assume completed if missing

            if (!countByMonth[month]) {
                countByMonth[month] = { month, pending: 0, inProgress: 0, completed: 0 };
            }

            if (status === "pending" || status === "inProgress" || status === "completed") {
                countByMonth[month][status] += 1;
            }
        });

        return Object.values(countByMonth);
    }

    useEffect(() => {
        if (projects) {

            const data = formatProjectsForChart(projects);
            setData(data)
        }
    }, [projects])


    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="pending" stackId="a" fill="#ff4b4b" />
                <Bar dataKey="inProgress" stackId="a" fill="rgb(74, 111, 165)" />
                <Bar dataKey="completed" stackId="a" fill="#3cb371" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
