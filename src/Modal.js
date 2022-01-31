import './Modal.css';

export default ({ handleClose, show, children }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button type="button" onClick={handleClose}>
            x
          </button>
          {children}
        </section>
      </div>
    );
  };