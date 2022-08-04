import { useState, useEffect } from "react";

const useWindowsSize = () =>{
    const [windowsSize, setWindowsSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(()=>{

        const handleResize = () =>{
            setWindowsSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize();
        // stale po zmenseni obrazovky sa tento useEffect spusti
        window.addEventListener("resize", handleResize)

        // cleanUp funkcia - zmaze effect, proti memory Leak
        const cleanUp = () =>{
            window.removeEventListener("resize", handleResize)
        }

        return cleanUp;
    }, [])

    // vrati cele to okno
    return windowsSize;
}

export default useWindowsSize;