import React, { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer
} from "recharts";
import { useFirebase } from "../context/firebase";

// 🟢 Color for each status
const STATUS_COLORS = {
    pending: "#ff4b4b",
    inProgress: "rgb(74, 111, 165)",
    completed: "#3cb371"
};

const PieChart1 = () => {

    const firebase = useFirebase();



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



    function getStatusDistribution(projects) {
        const count = { pending: 0, inProgress: 0, completed: 0 };

        projects.forEach(p => {
            const status = p.status || "completed";
            if (count[status] !== undefined) {
                count[status]++;
            }
        });

        return Object.entries(count).map(([status, value]) => ({ status, value }));
    }

    const data = getStatusDistribution(projects);

    return (
        <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry) => (
                            <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart1;
