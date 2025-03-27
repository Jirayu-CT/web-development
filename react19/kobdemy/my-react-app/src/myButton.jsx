function MyButton({ text, clickHandler }) {
    return (
        <button onClick={clickHandler}>
            {text}
        </button>
    );
}

export default MyButton;