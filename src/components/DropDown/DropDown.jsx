import { useState } from "react"
import styles from './DropDown.module.css'

const DropDown = ({ selectedVal = 'All', onChange, options }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleDropDownClick = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionSelect = (value) => {
        onChange(value)
        setIsOpen(false)
    }

    const selectedOption = options.find((option) => option.value === selectedVal)

    return (
        <div className={styles.dropdown}>
            <h2 className={styles.selectedOption}
                onClick={handleDropDownClick}>
                <span>{selectedOption.label}</span>
                <span className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}>
                    ▼
                </span>
            </h2>
            <div className={`${styles.unselectedContainer} ${isOpen ? styles.open : ''}`}>
                {options.map((option) => (
                    <h2 className={styles.unselectedOption}
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}>
                        {option.label}
                    </h2>
                ))}
            </div>
        </div>
    )

}

export default DropDown