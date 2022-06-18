
import { useState } from 'react'

function CategoryMenu(){

    const [visible, setVisible] = useState(true);

    function toggleMenu(){

        setVisible(!visible)
    };

    let chungus = ["Personal", "Work"]

    const categoryList = chungus.map((c) => {
        <div className="list-item-container">
            <p>{c}</p>
        </div>
    })

    return (

        <div className="accordion-container">
            <div className="accordion">
                <button type="button" className="accordion-btn" onClick={() => toggleMenu}>
                    
                </button>
            </div>
            <div className={visible ? "show-content" : ""}>
                <div className='list-item-container'>
                    <p>Work</p>
                </div>
            </div>
        </div>

    )


}

export default CategoryMenu;