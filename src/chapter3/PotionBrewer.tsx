import React from "react";

interface Potion {
    id: number;
    name: string;
    effect: string;
}

interface Props {
    potions: Potion[];
}

const potionList: Potion[] = [
    { id: 1, name: "隐身药水", effect: "隐藏身形" },
    { id: 2, name: "治愈药剂", effect: "恢复生命" }
];

const PotionBrewer: React.FC<Props> = ({ potions }) => {
    // 如果传入的 potions 为空，使用默认 potionList
    const potionsToRender = potions.length > 0 ? potions : potionList;

    return (
        <div>
            <h2>药水酿造台</h2>
            <ul>
                {potionsToRender.map((potion) => (
                    <li key={potion.id}>
                        <strong>{potion.name}</strong>: {potion.effect}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PotionBrewer;