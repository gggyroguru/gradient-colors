import {useEffect} from 'react'

const Modal = ({animationModal, setAnimationModal, title, setTitle, save}) => {

    const remove = () => {
        setAnimationModal(false)
    }

    const combination = () => {
        save()
        remove()
    }

    useEffect(() => {
        if (animationModal) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [animationModal])

    return (
        <>
            <div
                className={`w-screen h-screen fixed z-[100] ${animationModal ? 'top-0' : '-top-[100vh]'} left-0 right-0 transition-all`}>
                <div className={'w-80 p-3.5 m-auto mt-10 bg-indigo-600 rounded-2xl relative z-[1000]'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'text-white'}>
                            Gradient Colors
                        </div>
                        <div className="w-5 flex flex-col items-end gap-[.35rem] cursor-pointer" onClick={remove}>
                            <div className={`w-full h-[.1rem] bg-white translate-y-[.45rem] -rotate-45`}></div>
                            <div className={`h-[.1rem] w-0`}></div>
                            <div className={`h-[.1rem] bg-white w-full -translate-y-[.45rem] rotate-45`}></div>
                        </div>
                    </div>
                    <div className={'mt-3 text-white'}>
                        <div>Title</div>
                        <input className={'mt-3 w-full px-3 py-1 rounded-lg outline-0 bg-indigo-500'} type={'text'} value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className={'mt-3 flex items-center justify-end gap-3'}>
                        <button className={'px-3 py-1.5 text-white bg-indigo-900 rounded-lg'} onClick={combination}>save
                        </button>
                        <button className={'px-3 py-1.5 text-white bg-indigo-900 rounded-lg'} onClick={remove}>Cancel
                        </button>
                    </div>
                </div>
                <div
                    className={`w-screen h-screen fixed  ${animationModal ? 'top-0' : '-top-[100vh]'} left-0 right-0 backdrop-blur-sm backdrop-brightness-60 transition-all`}
                    onClick={remove}></div>
            </div>

        </>
    )
}

export default Modal