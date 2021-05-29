import './Modal.scss';

type modalP = {
    close: () => void,
    children: React.ReactNode
}

export const Modal = ({close, children} : modalP) => {
    return <div className={'modal'} onClick={close} data-testid={'modal'}>
        <div className="modal__inside" onClick={e => {e.stopPropagation()}} data-testid={'modal-inside'}>
            <button className="modal__close-btn btn btn_small" onClick={close}>✕</button>
            {children}
        </div>
    </div>
}