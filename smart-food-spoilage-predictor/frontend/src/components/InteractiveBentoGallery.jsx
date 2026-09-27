import React, { useState } from "react";

const bentoItems = [
    {
        id: "freshness",
        title: "Real-time Spoilage Risk",
        subtitle: "Multi-sensor analysis",
        tag: "Accuracy 94%",
        icon: "🧀",
        badgeColor: "#108b61",
        accent: "from-emerald-500/20 to-teal-500/10",
        stats: "0.2s inference",
        description: "Evaluates temperature, moisture, and shelf conditions instantly."
    },
    {
        id: "temperature",
        title: "Thermal Monitoring",
        subtitle: "Safe cold-chain zones",
        tag: "0°C - 8°C",
        icon: "❄️",
        badgeColor: "#0284c7",
        accent: "from-sky-500/20 to-blue-500/10",
        stats: "Live tracking",
        description: "Detects breaks in dairy and perishable temperature thresholds."
    },
    {
        id: "eco",
        title: "Eco Impact & Waste Saved",
        subtitle: "Zero-waste kitchen",
        tag: "-38% Waste",
        icon: "🌿",
        badgeColor: "#15803d",
        accent: "from-green-500/20 to-emerald-500/10",
        stats: "12.4 kg saved",
        description: "Empowers proactive meal planning before safety windows expire."
    },
    {
        id: "safety",
        title: "Safety Shield",
        subtitle: "Microbial risk scoring",
        tag: "Grade A",
        icon: "🛡️",
        badgeColor: "#d97706",
        accent: "from-amber-500/20 to-orange-500/10",
        stats: "Smart alerts",
        description: "Early hazard alerts to protect family and consumers."
    }
];

export default function InteractiveBentoGallery() {
    const [activeId, setActiveId] = useState("freshness");
    const [hoveredId, setHoveredId] = useState(null);

    const activeItem = bentoItems.find((item) => item.id === (hoveredId || activeId)) || bentoItems[0];

    return (
        <div className="bento-gallery-container">
            {/* Interactive Grid */}
            <div className="bento-gallery-grid">
                {bentoItems.map((item, index) => {
                    const isSelected = activeItem.id === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`bento-card bento-card-${index + 1} ${
                                isSelected ? "bento-card-active" : ""
                            }`}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setActiveId(item.id)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="bento-card-glow" />
                            <div className="bento-card-top">
                                <span className="bento-icon-wrapper">{item.icon}</span>
                                <span
                                    className="bento-tag"
                                    style={{
                                        backgroundColor: `${item.badgeColor}18`,
                                        color: item.badgeColor,
                                        borderColor: `${item.badgeColor}33`
                                    }}
                                >
                                    {item.tag}
                                </span>
                            </div>

                            <div className="bento-card-body">
                                <h4 className="bento-title">{item.title}</h4>
                                <p className="bento-subtitle">{item.subtitle}</p>
                            </div>

                            {isSelected && (
                                <div className="bento-active-indicator">
                                    <span>{item.stats}</span>
                                    <span className="bento-sparkle">✦</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Expanded Highlight / Showcase Banner */}
            <div className="bento-active-spotlight">
                <div className="bento-spotlight-left">
                    <span className="bento-spotlight-icon">{activeItem.icon}</span>
                    <div>
                        <div className="bento-spotlight-header">
                            <span className="bento-spotlight-title">{activeItem.title}</span>
                            <span className="bento-spotlight-stat">{activeItem.stats}</span>
                        </div>
                        <p className="bento-spotlight-desc">{activeItem.description}</p>
                    </div>
                </div>
                <div className="bento-spotlight-badge" style={{ color: activeItem.badgeColor }}>
                    Interactive AI
                </div>
            </div>
        </div>
    );
}
