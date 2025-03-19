import React from "react";
import styles from "./roundedButton.module.css";

interface RoundedButtonProps {
    label: string | React.ReactNode;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    effect?: "glow" | "pulse" | "rotate" | "scale";
    disabled?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ label, href, onClick, effect = "glow", disabled }) => {
    return (
        <button className={`${styles.roundedBtn} ${styles[effect]}`} onClick={onClick} disabled={disabled}>
            <a href={href}>{label}</a>
        </button>
    );
};

export default RoundedButton;
