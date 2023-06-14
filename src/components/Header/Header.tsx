import logoImg from '../../../public/International_Pokémon_logo.svg'
import buttonImg from "../../../public/Poké_Ball_icon.svg"
import Image from 'next/image'
import styles from './header.module.scss'


export default function Header(){
    return(
       
        <header className={styles.container} >
           <button className={styles.button}>
            <Image src={buttonImg} alt='pokeball' className={styles.buttonIcon}/>
           </button>

            <Image src={logoImg} alt='Logo Pokemon' className={styles.img}/>
            <div className={styles.containerSearch}>
                <input type='text' placeholder='Procurar Pokémon'/>
            </div>

       </header>
        
    )
    
}