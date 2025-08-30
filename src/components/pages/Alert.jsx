const Alert = (props) => {
    return (
        <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
            <strong>{props.type === 'success' ? 'Success' : 'Error'}: </strong> {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
export default Alert;
