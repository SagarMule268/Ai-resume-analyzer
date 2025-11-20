import React from "react";

interface ScoreBadgeProps {
    score: number;
}

const getBadgeProps = (score: number) => {
    if (score > 70) {
        return { label: "Strong", classes: "bg-badge-green text-green-600" };
    }else if (score > 49) {
        return { label: "Good start", classes: "bg-badge-yellow text-yellow-600" };
    }
    return { label: "Needs work", classes: "bg-badge-red text-red-600" };
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    const { label, classes } = getBadgeProps(score);
    const className = [ classes].join(" ").trim();

    return (
        <div className={`${className} px-3 py-1 rounded-full`} role="status" aria-label={`Score ${score}`}>
            <p className="text-sm font-medium">{label}</p>
        </div>
    );
};

export default ScoreBadge;