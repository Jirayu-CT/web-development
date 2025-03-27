function Panel(props){
    return (
        <div>
            <h1>Panel</h1>
            {props.children}
        </div>
    );
}

export default Panel;