import useStats from "../../../providers/StatsContext";

export default function StatsMenuContent() {
    const { maxScore, maxScoreUser, maxTimeoutUser, maxTimeoutValue, numbersSubmited, numbersFailed, timeoutedUsers, activeUsers, getMaxValueOf } = useStats();

    const stats = [
        { name: "Numbers submitted", value: numbersSubmited },
        { name: "Numbers failed", value: numbersFailed },
        { name: "Most timeouted user", value: getMaxValueOf(timeoutedUsers) },
        { name: "Most active user", value: getMaxValueOf(activeUsers) },
        { name: "Max timeout", value: maxTimeoutValue },
        { name: "Max timeout by", value: maxTimeoutUser || "-" },
        { name: "Max score", value: maxScore },
        { name: "Max score by", value: maxScoreUser || "-" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-white text-center">Stats</h2>
            <table className="w-full">
                <tbody>
                    {stats.map((stat) => (
                        <tr key={stat.name} className="border-b border-primary/30">
                            <td className="py-2 px-4 text-slate-400">{stat.name}</td>
                            <td className="py-2 px-4 text-white text-right">{stat.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}