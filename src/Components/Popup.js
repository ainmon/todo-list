
import './popup.css'

function Popup({ editState, setEditState, todo, onChangeForm }){

    const {task, task_id, id} = todo

    function handleClose(){
        setEditState(false)
    }

    function handleInputChange(event) {
        console.log(event.target.value)
        onChangeForm(event.target.name, event.target.value);
    }

    // function handleCategoryEdit(event) {
    //     console.log(event.target.value)
    //     handleCategoryChange(event.target.id, event.target.value)
    // }

    return (editState) ? (

        <div className="popup">
            <h1 className='popup-title'>Edit your Todo!</h1>
            <div className="popup-inner">
                <div className='task-header'>
                    <header>Task:</header>
                    <input type="text" onChange={handleInputChange} value={task} className="task-input" />
                </div>
                <div className='category-header'>
                    <input type="option" value='seomtub'></input>
                </div>
                <button className="close-btn" onClick={handleClose}>Close</button>
                <h2>CHUNGUS!!!!</h2>
            </div>
        </div>

    ) : "";


}

export default Popup;