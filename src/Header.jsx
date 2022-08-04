
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowsSize from './hooks/useWindowsSize';

const Header = ({title}) => {
//vyberiem iba sirku
  const {width} = useWindowsSize();
  
  return (
    <header className='Header'>{title}
    {width < 768 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
    </header>
  )
}

export default Header

// nainstaluj react icons, aby sa dali pouzit: npm i react-icons