import { useEffect } from 'react';
import { withRouter,useHistory,useLocation } from 'react-router-dom';


const ScrollToTop = () =>{
 
  const {pathname} = useLocation();
  const dummy = () =>{
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth"
    });
  }
  
  useEffect(() => {
     dummy();
    }, [pathname]);

  return (null);
}

export default ScrollToTop;