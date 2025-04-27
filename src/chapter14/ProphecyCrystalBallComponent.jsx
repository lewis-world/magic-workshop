import { useState, useEffect } from 'react';
import ProphecyCrystalBall from './ProphecyCrystalBall';

export function ProphecyCrystalBallComponent({seekerName = "未知求知者"}){
    const [prophecy, setProphecy] = useState("水晶球一片模糊...");

    useEffect(() => {
        const fetchProphecy = async () => {
            try{
                const result = await ProphecyCrystalBall(seekerName);
                setProphecy(result);
            } catch (error) {
                console.error("Error fetching prophecy:", error);
                setProphecy("无法获取预言...");
            }
        };

        fetchProphecy();
    }, [seekerName]);

    return (
        <div className="crystal-ball">
        <h3>🧙♀️ {seekerName}的今日预言</h3>
        <div className="prophecy-content">
            {prophecy}
        </div>
        <footer>预言生成时间: {new Date().toLocaleString()}</footer>
        </div>
    );
}