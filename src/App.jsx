import './App.css'
import {useEffect, useState} from "react";
import {FaArrowUp, FaRedo, FaUndo} from "react-icons/fa";
import {MdOutlineSaveAlt} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import DropDown from "./components/DropDown.jsx";
import Modal from "./components/Modal.jsx";
import {toast, Toaster} from "sonner";

const get = () => {
    const get = localStorage.getItem('saved')
    if (get) {
        return JSON.parse(get)
    } else {
        return []
    }
}

const App = () => {

    const [direction, setDirection] = useState('to right')
    const [colorCombination, setColorCombination] = useState(2)
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')
    const [color3, setColor3] = useState('')
    const [previous, setPrevious] = useState([])
    const [previousCount, setPreviousCount] = useState(0)
    const [animationModal, setAnimationModal] = useState(false)
    const [title, setTitle] = useState('')
    const [saved, setSaved] = useState(get())

    const allDirection = ['to top', 'to top right', 'to right', 'to bottom right', 'to bottom', 'to bottom left', 'to left', 'to top left']
    const allColorCombination = [2, 3]

    const randomize = () => {
        const key = '0123456789abcdef'
        let random = '#'
        while (random.length <= 6) {
            random += key.charAt(Math.floor(Math.random() * (key.length)))
        }
        return random
    }

    /* const showDirection = (e) => {
         setDirection(e)
     }*/

    const backgroundColor = (colorCombination, direction, color1, color2, color3) => {
        if (colorCombination === 2) {
            return `linear-gradient(${direction}, ${color1}, ${color2})`
        }
        if (colorCombination === 3) {
            return `linear-gradient(${direction}, ${color1}, ${color2}, ${color3})`
        }
    }

    const setButton1 = () => {
        setColor1(randomize())
    }
    const setButton2 = () => {
        setColor2(randomize())
    }
    const setButton3 = () => {
        setColor3(randomize())
    }

    const copyToClipboard = () => {
        const css = document.querySelector('.css')
        navigator.clipboard.writeText(css.innerHTML)
        toast.success(`Copied to clipboard`)
    }

    const setSavedCombination = (combination) => {
        setDirection(combination.direction)
        setColorCombination(combination.colorCombination)
        setColor1(combination.color1)
        setColor2(combination.color2)
        setColor3(combination.color3)
    }

    const previousCombination = () => {
        const previousCombination = {
            direction: direction,
            colorCombination: colorCombination,
            color1: color1,
            color2: color2,
            color3: color3,
        }
        if (color1 && color2 && color3) {

            if (previous.filter(e => e.color1 === color1 && e.color2 === color2 && e.color3 === color3 && e.colorCombination === colorCombination && e.direction === direction).length > 0) {

            } else {
                setPrevious(previous => [...previous, previousCombination])
            }

        }
    }

    const setPreviousCombination = () => {

        const combination = previous[previousCount]
        setDirection(combination.direction)
        setColorCombination(combination.colorCombination)
        setColor1(combination.color1)
        setColor2(combination.color2)
        setColor3(combination.color3)

    }

    const undo = () => {
        if (previousCount <= 0) {

        } else {
            setPreviousCount(count => count - 1)
        }
    }

    const redo = () => {
        if (previousCount === previous.length - 1) {

        } else {
            setPreviousCount(count => count + 1)
        }
    }

    const save = () => {
        const combination = {
            title: title,
            direction: direction,
            colorCombination: colorCombination,
            color1: color1,
            color2: color2,
            color3: color3,
        }
        if (saved.filter(e => e.color1 === color1 && e.color2 === color2 && e.color3 === color3 && e.colorCombination === colorCombination && e.direction === direction).length > 0) {
            toast.error('already saved')
        }
        else {
            setSaved(saved => [...saved, combination])
            toast.success('saved')
        }

    }

    const deleteColor = (key) => {
        setSaved(saved => saved.filter(save => save.title !== key.title))
        toast.success('deleted')
    }

    useEffect(() => {
        setButton1()
        setButton2()
        setButton3()
    }, []);

    useEffect(() => {
        previousCombination()
    }, [color1, color2, color3, direction, colorCombination]);

    useEffect(() => {
        if (previous.length > 0) {
            setPreviousCount(previous.length - 1)
        }
    }, [previous]);

    useEffect(() => {
        if (previous.length > 0) {
            if (previousCount >= 0) {
                setPreviousCombination()
            }

        }

    }, [previousCount]);

    useEffect(() => {
        localStorage.setItem('saved', JSON.stringify(saved))
    }, [saved]);

    const log = (e) => {
        console.log(e)
    }

    return (
        <>
            <Toaster position={'top-right'} expand={true} richColors={true} duration={1500} gap={16}/>
            <Modal animationModal={animationModal} setAnimationModal={setAnimationModal} title={title} setTitle={setTitle}  save={save}/>
            <div className={'w-dvw h-dvh flex items-center justify-center'}
                 style={{backgroundImage: `${backgroundColor(colorCombination, direction, color1, color2, color3)}`}}>

                {/*<div className={'fixed left-0 top-6 right-0 text-center text-white text-3xl'}>CSS Gradient</div>*/}

                <div className={'fixed z-[99999] w-fit top-6 right-6'}>
                    <DropDown saved={saved} setSavedCombination={setSavedCombination} deleteColor={deleteColor}/>
                </div>

                <div className={'w-[90%] m-auto sm:w-fit'}>
                    <div className={'text-center text-white'}>Combination Of Color</div>
                    <div className={'mt-3 flex justify-center gap-6'}>
                        {
                            allColorCombination.map((e, i) => (
                                <button key={i}
                                        className={`w-8 h-8 text-white rounded-full bg-white bg-opacity-30 ${colorCombination === e ? 'border-opacity-90 opacity-90' : 'opacity-30 border-opacity-30'} border-white border-2`}
                                        onClick={() => setColorCombination(e)}>{e}</button>
                            ))
                        }
                    </div>

                    <div className={'mt-6 text-center text-white'}>change direction</div>
                    <div className={'mt-3 flex justify-center gap-6 flex-wrap relative'}>
                        {
                            allDirection.map((e, i) => (
                                <button key={i}
                                        className={`p-1.5 text-white rounded-full bg-white bg-opacity-30 ${direction === e ? 'border-opacity-90' : 'border-opacity-30'} border-white border-2`}
                                        style={{rotate: `${(i) * 45}deg`}} onClick={() => setDirection(e)}><FaArrowUp
                                    className={`${direction === e ? 'opacity-90' : 'opacity-30'}`}/></button>
                            ))
                        }
                    </div>
                    <div className={'mt-6 text-center text-white'}>change color to click button</div>
                    <div className={'mt-3 w-full flex justify-center gap-6 sm:gap-9 flex-wrap'}>
                        <button
                            className={'px-6 py-1.5 text-white rounded-full bg-white bg-opacity-30 border-white border-2 border-opacity-30'}
                            onClick={setButton1}>{color1}</button>
                        <button
                            className={'px-6 py-1.5 text-white rounded-full bg-white bg-opacity-30 border-white border-2 border-opacity-30'}
                            onClick={setButton2}>{color2}</button>
                        {colorCombination === 3 && <button
                            className={'px-6 py-1.5 text-white rounded-full bg-white bg-opacity-30 border-white border-2 border-opacity-30'}
                            onClick={setButton3}>{color3}</button>}
                    </div>
                    <div className={'text-center text-white mt-6'}> copy your css here</div>
                    <div className={'mt-3'}>
                        <button
                            className={'css w-full px-6 py-1.5 text-white rounded-md bg-white bg-opacity-30 border-white border-2 border-opacity-30'}
                            onClick={copyToClipboard}>
                            background-image:
                            linear-gradient({direction}, {color1}, {color2}, {colorCombination === 3 && color3})
                        </button>
                    </div>

                    <div className={'text-center text-white mt-6'}> save</div>
                    <div className={'mt-3 text-center'}>
                        <button
                            className={`p-1.5 text-white rounded-full bg-white bg-opacity-30 border-opacity-90 border-white border-2`}
                            onClick={() => setAnimationModal(true)}>
                            <MdOutlineSaveAlt/></button>
                    </div>

                    {/*<div className={'text-center text-white mt-6'}> undo &nbsp; &nbsp; redo</div>
                    <div className={'mt-3 flex justify-center gap-6'}>
                        <button
                            className={`p-1.5 text-white rounded-full bg-white bg-opacity-30 ${previousCount !== 0 ? 'border-opacity-90' : 'border-opacity-30'} border-white border-2`}
                            onClick={undo}>
                            <FaUndo className={`${previousCount !== 0 ? 'opacity-90' : 'opacity-30'}`}/></button>
                        <button
                            className={`p-1.5 text-white rounded-full bg-white bg-opacity-30 ${previous.length - 1 !== previousCount ? 'border-opacity-90' : 'border-opacity-30'} border-white border-2`}
                            onClick={redo}>
                            <FaRedo
                                className={`${previous.length - 1 !== previousCount ? 'opacity-90' : 'opacity-30'}`}/>
                        </button>
                    </div>*/}
                    <div className={'text-center text-white mt-6'}>history</div>

                    <div className={'mt-3 w-[90%] max-w-[36rem] m-auto flex gap-3 overflow-auto'}>
                        {
                            previous?.map((e, i) => (
                                <button key={i} className={'p-6 bg-white border-2 border-white'}
                                        style={{backgroundImage: `${backgroundColor(e.colorCombination, e.direction, e.color1, e.color2, e.color3)}`}}
                                        onClick={() => log(e)}>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
