import './App.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Forming from './form';
import { Link } from 'react-router-dom';

function Heading(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return(
        <>
        <div className='front'>
            <h1 id="head">The Life's  Gallery</h1>
            <video width={1060} height={400} className='video' controls>
                <source src="promo.mp4" type="video/mp4"/>
            </video>
        </div>
        <div className='slide'>
        <Slider {...settings}>
        <div>
            <img style={{width:'40%',height:'30%'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTmp-CfQ-albJX7ez9aZxkJ6Pbr-eZj3r5cA&usqp=CAU" alt="Image 1" />
        </div>
        <div>
            <img style={{width:'35%',height:'30%'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJz1R33TcZUFz-PqDaUjnBqNThcKNho1LVsA&usqp=CAU" alt="Image 2" />
        </div>
        <div>
            <img  style={{width:'35%',height:'30%'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1skDgjD6PC93Lm7IZolqGpZbzgT5karq_sQ&usqp=CAU" alt="Image 3" />
        </div>
        <div>
            <img style={{width:'43%',height:'30%'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3iwWluqpzhJW5V5zbuy6JufeHAe9uYE5_Dg&usqp=CAU" alt="Image 4" />
        </div>
      </Slider>
        </div>
         <div className="form">
            <ul>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                    <Link to="/viewmenu">See Detail</Link>
                </li>
            </ul>
            <br></br>

        </div>
        </>
    )
}
export default Heading;