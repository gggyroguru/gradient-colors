import {useEffect, useState} from "react"
import {CgProfile} from "react-icons/cg";

const DropDown = ({saved, setSavedCombination, deleteColor}) => {

    const [toggle, setToggle] = useState(false)
    const [show, setShow] = useState(false)

    const active = () => {
        if (show) {
            setTimeout(() => {
                setShow(false)
            }, 0)
        } else {
            if (!toggle) {
                setToggle(true)
            }
        }
    }

    useEffect(() => {
        if (toggle) {
            setTimeout(() => {
                setShow(true)
            }, 0)
        }
    }, [toggle])

    useEffect(() => {
        if (!show) {
            if (toggle) {
                setTimeout(() => {
                    setToggle(false)
                }, 300)
            }
        }
    }, [show])

    return (

        <>
            <div className="w-fit flex justify-end relative z-[99999]">
                <button className={'fixed w-fit top-6 right-6 text-neutral-900'} onClick={active}><CgProfile size={35}
                                                                                                             className={'cursor-pointer'}/>
                </button>
                {toggle &&
                    <div className='absolute z-[99999] mt-12'>
                        <div
                            className={`w-64 text-white border-4 border-neutral-900 relative z-[99999] bg-neutral-800 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'} rounded-3xl`}>
                            <div className={'w-full p-3 flex flex-col gap-3 relative z-[99999] items-start'}>
                                {
                                    saved.map((e, i) => (
                                        <span key={i} className={'w-full flex justify-between'}>
                                            <button onClick={() => setSavedCombination(e)}>{e.title}</button>
                                            <button onClick={() => deleteColor(e)}>
                                                <img className={'w-5 h-5 invert'} src={'https://cdn-icons-png.flaticon.com/512/3405/3405244.png'}/>
                                            </button>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default DropDown