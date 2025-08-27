'use client'; 
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 
const STUDENT_NUMBER = '21912969';    
const STUDENT_NAME   = 'Piyush';    
export default function Header() { 
  const pathname = usePathname(); 
 
  const items = [ 
    { href: '/', label: 'Home' }, 
    { href: '/about', label: 'About' }, 
    { href: '/tabs', label: 'Tabs' }, 
    { href: '/pre-labs', label: 'Pre-lab Questions' }, 
    { href: '/escape-room', label: 'Escape Room' }, 
    { href: '/coding-races', label: 'Coding Races' }, 
  ]; 
 
  return ( 
    <header className="border-bottom"> 
      <nav className="navbar navbar-expand-lg container"> 
        <div className="d-flex align-items-center gap-3"> 
          <span className="badge text-bg-primary">{STUDENT_NUMBER}</span> 
          <button className="navbar-toggler" type="button" data-bs
toggle="offcanvas" data-bs-target="#mainNav" aria-controls="mainNav"> 
            <span className="navbar-toggler-icon"></span> 
          </button> 
        </div> 
 
        <div className="offcanvas offcanvas-end" id="mainNav" tabIndex={
1}> 
          <div className="offcanvas-header"> 
            <h5 className="offcanvas-title">{STUDENT_NAME}</h5> 
            <button type="button" className="btn-close" data-bs
dismiss="offcanvas" /> 
          </div> 
          <div className="offcanvas-body"> 
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
              {items.map(it => ( 
                <li key={it.href} className="nav-item"> 
                  <Link className={`nav-link ${pathname === it.href ? 
'active fw-semibold' : ''}`} href={it.href}> 
                    {it.label} 
                  </Link> 
                </li> 
              ))} 
            </ul> 
          </div> 
        </div> 
      </nav> 
    </header> 
  ); 
}